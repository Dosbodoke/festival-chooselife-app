"use client";

import L, { type LatLng } from "leaflet";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, useMap } from "react-leaflet";

export function UserLocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  const iconHTML = ReactDOMServer.renderToString(
    <div className="h-5 w-5 rounded-full border-2 border-white bg-blue-500" />
  );
  const icon = new L.DivIcon({
    html: iconHTML,
    iconSize: [20, 20],
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}></Marker>
  );
}
