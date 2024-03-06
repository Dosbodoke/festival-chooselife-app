"use client";

import L, { type LatLng, type Marker as MarkerType } from "leaflet";
import { MapPin, Undo2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, Polyline, useMapEvent } from "react-leaflet";

import { useQueryString } from "@/hooks/useQueryString";
import { encodeLocation, getDistance } from "@/utils/helperFunctions";

export const LocationPicker = () => {
  const { deleteQueryParam, pushQueryParam } = useQueryString();

  const map = useMapEvent("move", () => {
    setCenter(map.getCenter());
  });

  const [center, setCenter] = useState<LatLng>(map.getCenter());
  const [anchorA, setAnchorA] = useState<LatLng | null>(null);
  const [anchorB, setAnchorB] = useState<LatLng | null>(null);
  const anchorARef = useRef<MarkerType | null>(null);
  const eventHandlers = useMemo(
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
      <MapPin className="absolute left-1/2 top-1/2 z-[1000] h-6 w-6 -translate-x-1/2 -translate-y-full fill-red-500 text-primary-foreground" />
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
    if (!anchorA) {
      setAnchorA(map.getCenter());
      return;
    }
    if (!anchorB) {
      setAnchorB(map.getCenter());
      return;
    }
    pushQueryParam("location", encodeLocation(anchorA, anchorB));
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
        <div className="absolute left-1/2 top-1/2 z-[1000] flex -translate-x-1/2 -translate-y-full flex-col items-center text-primary-foreground">
          {distance ? <span>{distance}m</span> : null}
          <MapPin className="h-6 w-6 fill-red-500 text-primary-foreground" />
        </div>
      ) : null}
      {anchorA ? (
        <Marker
          ref={anchorARef}
          draggable
          eventHandlers={eventHandlers}
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
      <div className="fixed bottom-3 left-1/2 z-[1000] flex w-fit -translate-x-1/2 items-center gap-2">
        <button className="relative flex p-[3px]" onClick={handlePickLocation}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="group relative rounded-full bg-black p-2 text-white transition duration-200 hover:bg-transparent">
            {anchorA
              ? anchorB
                ? "confirmar"
                : "Set anchor B"
              : "Set Anchor A"}
          </div>
        </button>

        <button
          className="rounded-full bg-destructive p-1"
          onClick={handleUndoPickLocation}
        >
          <Undo2 className="h-6 w-6 text-destructive-foreground" />
        </button>
      </div>
    </>
  );
};
