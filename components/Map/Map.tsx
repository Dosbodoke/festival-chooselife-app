"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "./leaflet-reset.css";

import type { Map } from "leaflet";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  LayerGroup,
} from "react-leaflet";

import LocationMarker from "./LocationMarker";

interface MarkerData {
  coordinates: [number, number];
  title: string;
}

const MapComponent: FC<{ locale: string }> = ({ locale }) => {
  const [markerData, setMarkerData] = useState<MarkerData | null>(null);
  const mapRef = useRef<Map | null>(null);

  return (
    <div
      className="fixed inset-0 w-full"
      id="leaflet-container"
      style={{ height: "100dvh" }}
    >
      <MapContainer
        center={[-15.7783994, -47.9308375]}
        zoom={11}
        className="h-full w-full"
      >
        {/* 21. Set the tile layer for the map. */}
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

        <LocationMarker />
      </MapContainer>
    </div>
  );
};
//25. Export the MapComponent.
export default MapComponent;
