"use client";

import { useQuery } from "@tanstack/react-query";
import type { BBox, GeoJsonProperties } from "geojson";
import L from "leaflet";
import { SearchIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, Polyline, useMap, useMapEvents } from "react-leaflet";
import type { PointFeature } from "supercluster";
import useSupercluster from "use-supercluster";

import { useQueryString } from "@/hooks/useQueryString";
import useSupabaseBrowser from "@/utils/supabase/client";

interface PointProperties {
  cluster: boolean;
  category: string;
  id: string;
}

const locationToBoundingBox = (location: L.LatLngBounds): BBox => {
  return [
    location.getSouthWest().lng,
    location.getSouthWest().lat,
    location.getNorthEast().lng,
    location.getNorthEast().lat,
  ];
};

export const Markers = ({
  focusedMarker,
  setFocusedMarker,
  setHighlineIds,
}: {
  focusedMarker: string | null;
  setFocusedMarker: React.Dispatch<React.SetStateAction<string | null>>;
  setHighlineIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const supabase = useSupabaseBrowser();
  const { searchParams, pushQueryParam, deleteQueryParam } = useQueryString();
  const map = useMap();
  const [canRefetch, setCanRefetch] = useState(false);
  const [bounds, setBounds] = useState<BBox>();

  const {
    data: highlines,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["bounds"],
    queryFn: async () => {
      if (!bounds) return [];
      const { data, error } = await supabase.rpc("highlines_in_view", {
        min_long: bounds[0],
        min_lat: bounds[1],
        max_long: bounds[2],
        max_lat: bounds[3],
      });
      if (error) throw new Error(error.message);
      setCanRefetch(false);
      return data;
    },
  });

  const points = useMemo<
    PointFeature<GeoJsonProperties & PointProperties>[]
  >(() => {
    if (!highlines) return [];

    return highlines.map((high) => ({
      type: "Feature",
      properties: {
        cluster: false,
        category: "highline",
        id: high.id,
      },
      geometry: {
        type: "Point",
        coordinates: [high.anchor_a_long, high.anchor_a_lat],
      },
    }));
  }, [highlines]);

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: map.getZoom(),
    options: { radius: 75, maxZoom: 20 },
  });

  useMapEvents({
    moveend() {
      const bounds = locationToBoundingBox(map.getBounds());
      setBounds(bounds);
      setCanRefetch(true);
    },
    click() {
      if (searchParams.get("focusedMarker")) {
        deleteQueryParam("focusedMarker");
      }
      setHighlineIds([]);
      setFocusedMarker(null);
    },
  });

  function fetchIcon({ count, size }: { count: number; size: number }) {
    return L.divIcon({
      html: ReactDOMServer.renderToString(
        <div
          className="grid place-items-center rounded-full bg-accent text-base text-accent-foreground"
          style={{ width: size, height: size }}
        >
          {count}
        </div>
      ),
    });
  }

  useEffect(() => {
    const bounds = locationToBoundingBox(map.getBounds());
    setBounds(bounds);
  }, [map]);

  const focusedHigline =
    focusedMarker && highlines
      ? highlines.find((h) => h.id === focusedMarker)
      : null;

  const openMarkerDetails = useCallback(
    async (markerId: string, highlineIds: string[]) => {
      pushQueryParam("focusedMarker", markerId);
      setHighlineIds(highlineIds);
      setFocusedMarker(highlineIds[0]);
    },
    [pushQueryParam, setFocusedMarker, setHighlineIds]
  );

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          if (!supercluster || typeof cluster.id !== "number") return;
          const highlineIds = supercluster
            .getLeaves(cluster.id)
            .map((h) => h.properties.id as string);

          return (
            <>
              <Marker
                key={`cluster-${cluster.id}`}
                position={[latitude, longitude]}
                eventHandlers={{
                  click: () => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(
                        cluster.properties.cluster_id
                      ),
                      17
                    );
                    map.setView([latitude, longitude], expansionZoom, {
                      animate: true,
                    });

                    // If is clustered and can't zoom more
                    if (expansionZoom === 17) {
                      openMarkerDetails(cluster.id as string, highlineIds);
                    }
                  },
                }}
                icon={fetchIcon({
                  count: pointCount,
                  size: 10 + (pointCount / points.length) * 40,
                })}
              />
            </>
          );
        }

        return (
          <Marker
            key={`highline-${cluster.properties.id}`}
            position={[latitude, longitude]}
            eventHandlers={{
              click: () => {
                openMarkerDetails(cluster.properties.id, [
                  cluster.properties.id,
                ]);
              },
            }}
          />
        );
      })}

      {focusedHigline ? (
        <>
          <Marker
            position={[
              focusedHigline.anchor_b_lat,
              focusedHigline.anchor_b_long,
            ]}
          />
          <Polyline
            positions={[
              [focusedHigline.anchor_a_lat, focusedHigline.anchor_a_long],
              [focusedHigline.anchor_b_lat, focusedHigline.anchor_b_long],
            ]}
            dashArray={[20, 10]}
            color="#000000"
          />
        </>
      ) : null}

      <button
        className="absolute left-1/2 top-12 z-[1000] flex -translate-x-1/2 items-center gap-2 rounded-3xl bg-white px-3 py-2 text-sm text-black shadow-lg aria-hidden:hidden"
        aria-hidden={!canRefetch}
        onClick={() => {
          refetch();
        }}
      >
        <p className="font-medium">
          {isFetching ? "Pesquisando..." : "Pesquisar nesta área"}
        </p>
        <div className="h-5 w-5">
          <SearchIcon className="h-full w-full text-blue-500" />
        </div>
      </button>
    </>
  );
};
