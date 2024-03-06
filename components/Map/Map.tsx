"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "./leaflet-reset.css";

import { useQuery } from "@tanstack/react-query";
import type { Map } from "leaflet";
import { SearchIcon } from "lucide-react";
import React, { FC, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";

import useSupabaseBrowser from "@/utils/supabase/client";

import MapControls from "./Controls";
import Highlines from "./Highlines";
import { LocationPicker } from "./LocationPicker";
import { UserLocationMarker } from "./UserLocationMarker";

type ViewBounds = {
  max_lat: number;
  max_long: number;
  min_lat: number;
  min_long: number;
};

const MapComponent: FC<{ locale: string; isPickingLocation: boolean }> = ({
  locale,
  isPickingLocation,
}) => {
  const supabase = useSupabaseBrowser();

  const mapRef = useRef<Map | null>(null);
  const [canRefetch, setCanRefetch] = useState(false);
  const [bounds, setBounds] = useState<ViewBounds | null>(null);

  const {
    data: points,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["bounds"],
    queryFn: async () => {
      if (!bounds) return [];
      const { data, error } = await supabase.rpc("highlines_in_view", bounds);
      if (error) throw new Error(error.message);
      setCanRefetch(false);
      return data;
    },
  });

  return (
    <div
      className="fixed inset-0 w-full"
      id="leaflet-container"
      style={{ height: "100dvh" }}
    >
      <MapContainer
        center={[-15.7783994, -47.9308375]}
        zoom={12}
        maxZoom={20}
        zoomControl={false}
        ref={mapRef}
        className="h-full w-full"
      >
        {isPickingLocation ? null : (
          <>
            <Highlines
              setCanRefetch={setCanRefetch}
              setBounds={setBounds}
              points={points}
            />
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
        )}
        <UserLocationMarker />
        {isPickingLocation ? <LocationPicker /> : null}

        <MapControls locale={locale} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
