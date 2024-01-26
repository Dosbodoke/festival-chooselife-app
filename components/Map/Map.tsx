"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "./leaflet-reset.css";

import { useQuery } from "@tanstack/react-query";
import type { Map } from "leaflet";
import React, { FC, useRef, useState } from "react";
import { LayerGroup, MapContainer, TileLayer } from "react-leaflet";

import { SearchSvg } from "@/assets";
import useSupabaseBrowser from "@/utils/supabase/client";

import Highlines from "./Highlines";
import LocationMarker from "./LocationMarker";

type ViewBounds = {
  max_lat: number;
  max_long: number;
  min_lat: number;
  min_long: number;
};

const MapComponent: FC<{ locale: string }> = ({ locale }) => {
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
      if (error) throw new Error("");
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
      <button
        className="absolute left-1/2 top-12 flex -translate-x-1/2 items-center gap-2 rounded-3xl bg-white px-3 py-2 text-sm text-black shadow-lg aria-hidden:hidden"
        style={{ zIndex: 1000 }}
        aria-hidden={!canRefetch}
        onClick={() => {
          refetch();
        }}
      >
        <p className="font-medium">
          {isFetching ? "Pesquisando..." : "Pesquisar nesta área"}
        </p>
        <div className="h-5 w-5">
          <SearchSvg className="h-full w-full text-blue-500" />
        </div>
      </button>
      <MapContainer
        center={[-15.7783994, -47.9308375]}
        zoom={12}
        ref={mapRef}
        className="h-full w-full"
      >
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        {/* <TileLayer
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        /> */}
        <LayerGroup>
          <TileLayer
            attribution="Google Maps Satellite"
            url={`https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}&hl=${locale}`}
          />
          <TileLayer
            url={`https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}&hl=${locale}`}
          />
        </LayerGroup>
        <Highlines
          setCanRefetch={setCanRefetch}
          setBounds={setBounds}
          points={points}
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
