"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import L, { type LatLng, type Marker as MarkerType } from "leaflet";
import { MapPin, Undo2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, Polyline, useMapEvent } from "react-leaflet";

import { useQueryString } from "@/hooks/useQueryString";
import { useRouter } from "@/navigation";
import {
  encodeLocation,
  getDistance,
  locationToPostGISPoint,
} from "@/utils/helperFunctions";
import useSupabaseBrowser from "@/utils/supabase/client";

export const LocationPicker = ({
  focusedMarker,
}: {
  focusedMarker: string | null;
}) => {
  const t = useTranslations("map.locationPicker");
  const queryClient = useQueryClient();
  const supabase = useSupabaseBrowser();
  const insertLocationMutation = useMutation<
    undefined,
    Error,
    { anchorA: LatLng; anchorB: LatLng }
  >({
    mutationFn: async (data) => {
      const { error } = await supabase
        .from("highline")
        .update({
          lenght: getDistance({ anchorA: data.anchorA, anchorB: data.anchorB }),
          anchor_a: locationToPostGISPoint({
            lat: data.anchorA.lat,
            lng: data.anchorA.lng,
          }),
          anchor_b: locationToPostGISPoint({
            lat: data.anchorB.lat,
            lng: data.anchorB.lng,
          }),
        })
        .eq("id", focusedMarker);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highline", focusedMarker] });
      router.push(`/${focusedMarker}`);
    },
  });
  const router = useRouter();
  const { deleteQueryParam, pushQueryParam } = useQueryString();

  const map = useMapEvent("move", () => {
    setCenter(map.getCenter());
  });

  const [center, setCenter] = useState<LatLng>(map.getCenter());
  const [anchorA, setAnchorA] = useState<LatLng | null>(null);
  const [anchorB, setAnchorB] = useState<LatLng | null>(null);
  const anchorARef = useRef<MarkerType | null>(null);
  const markerEventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = anchorARef.current;
        if (marker !== null) {
          setAnchorA(marker.getLatLng());
        }
      },
    }),
    []
  );

  const icon = new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <MapPin className="absolute left-1/2 top-1/2 z-[1000] h-6 w-6 -translate-x-1/2 -translate-y-full fill-red-500 text-primary" />
    ),
    iconSize: [24, 24],
  });

  let distance: number | null = null;
  if (anchorA && (anchorB || center)) {
    let latlng1 = L.latLng(anchorA.lat, anchorA.lng);
    let latlng2 = L.latLng(
      anchorB?.lat || center.lat,
      anchorB?.lng || center.lng
    );
    distance = getDistance({ anchorA: latlng1, anchorB: latlng2 });
  }

  function handlePickLocation() {
    const center = map.getCenter();
    if (!anchorA) {
      setAnchorA(center);
      return;
    }
    if (!anchorB) {
      setAnchorB(center);
      return;
    }

    if (focusedMarker) {
      insertLocationMutation.mutate({
        anchorA,
        anchorB,
      });
    } else {
      pushQueryParam("location", encodeLocation(anchorA, anchorB));
    }
  }

  function handleUndoPickLocation() {
    if (anchorB) {
      setAnchorB(null);
      return;
    }
    if (anchorA) {
      setAnchorA(null);
      return;
    }
    deleteQueryParam("location");
  }

  return (
    <>
      {!(anchorA && anchorB) ? (
        <div className="absolute left-1/2 top-1/2 z-[1000] flex -translate-x-1/2 -translate-y-full flex-col items-center">
          {distance ? (
            <span className="mb-1 rounded-2xl bg-primary px-2 py-1 text-primary-foreground">
              {distance}m
            </span>
          ) : null}
          <MapPin className="h-6 w-6 fill-red-500 text-primary" />
        </div>
      ) : null}
      {anchorA ? (
        <Marker
          ref={anchorARef}
          draggable
          eventHandlers={markerEventHandlers}
          position={anchorA}
          icon={icon}
        ></Marker>
      ) : null}
      {anchorB ? <Marker position={anchorB} icon={icon}></Marker> : null}
      {anchorA && (anchorB || center) ? (
        <Polyline
          positions={[anchorA, anchorB || center]}
          dashArray={[20, 10]}
          color="#000000"
        />
      ) : null}
      <div className="fixed bottom-3 left-1/2 z-[1000] flex w-fit -translate-x-1/2 items-center gap-2 rounded-full bg-primary">
        <button
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={handlePickLocation}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {anchorA ? (anchorB ? t("confirm") : t("setB")) : t("setA")}
          </span>
        </button>
        <button
          className="mr-2 rounded-full p-1"
          onClick={handleUndoPickLocation}
        >
          <Undo2 className="h-6 w-6 text-destructive" />
        </button>
      </div>
    </>
  );
};
