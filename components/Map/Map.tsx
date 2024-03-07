"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "./leaflet-reset.css";

import type { Map } from "leaflet";
import React, { useRef } from "react";
import { MapContainer } from "react-leaflet";

import MapControls from "./Controls";
import Highlines from "./Highlines";
import { LocationPicker } from "./LocationPicker";
import { UserLocationMarker } from "./UserLocationMarker";

const MapComponent: React.FC<{
  locale: string;
  isPickingLocation: boolean;
}> = ({ locale, isPickingLocation }) => {
  const mapRef = useRef<Map | null>(null);
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
        {isPickingLocation ? <LocationPicker /> : <Highlines />}
        <UserLocationMarker />
        <MapControls locale={locale} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
