"use client";

import { useQuery } from "@tanstack/react-query";
import type { BBox, GeoJsonProperties } from "geojson";
import L, { point } from "leaflet";
import { SearchIcon } from "lucide-react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import type { PointFeature } from "supercluster";
import useSupercluster from "use-supercluster";

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

function Highlines() {
  const supabase = useSupabaseBrowser();
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
        coordinates: [high.long, high.lat],
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

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              eventHandlers={{
                click: () => {
                  if (!supercluster) return;
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(
                      cluster.properties.cluster_id
                    ),
                    17
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
              icon={fetchIcon({
                count: pointCount,
                size: 10 + (pointCount / points.length) * 40,
              })}
            />
          );
        }

        return (
          <Marker
            key={`highline-${cluster.properties.id}`}
            position={[latitude, longitude]}
          />
        );
      })}
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
}

export default Highlines;
