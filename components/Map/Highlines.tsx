"use client";

import { useQuery } from "@tanstack/react-query";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";

interface Props {
  setCanRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setBounds: React.Dispatch<
    React.SetStateAction<{
      min_lat: number;
      min_long: number;
      max_lat: number;
      max_long: number;
    } | null>
  >;
  points: { lat: number; long: number; name: string; id: string }[] | undefined;
}

function Highlines({ points, setBounds, setCanRefetch }: Props) {
  const map = useMap();

  useMapEvents({
    moveend() {
      const mapBounds = map.getBounds();
      const { lat: min_lat, lng: min_long } = mapBounds.getSouthWest();
      const { lat: max_lat, lng: max_long } = mapBounds.getNorthEast();
      setBounds({
        min_lat,
        min_long,
        max_lat,
        max_long,
      });
      setCanRefetch(true);
    },
  });

  return (
    <>
      {points?.map((p) => (
        <Marker position={{ lat: p.lat, lng: p.long }} key={p.id} />
      ))}
    </>
  );
}

export default Highlines;
