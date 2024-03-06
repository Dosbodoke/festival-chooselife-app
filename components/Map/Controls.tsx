"use client";

import { Layers2Icon, LocateIcon } from "lucide-react";
import { LayerGroup, MapContainer, Marker, TileLayer } from "react-leaflet";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryString } from "@/hooks/useQueryString";

export default function MapControls({ locale }: { locale: string }) {
  const { pushQueryParam, searchParams } = useQueryString();
  const mapType = searchParams.get("mapType");

  return (
    <>
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {mapType === "satelite" ? (
        <LayerGroup>
          <TileLayer
            maxZoom={20}
            attribution="Google Maps Satellite"
            url={`https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}&hl=${locale}`}
          />
          <TileLayer
            maxZoom={20}
            url={`https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}&hl=${locale}`}
          />
        </LayerGroup>
      ) : (
        <TileLayer
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
      )}

      <div className="absolute right-2 top-2 z-[1000] flex flex-col divide-y divide-primary-foreground bg-white">
        <Button variant="default" size="icon" className="shadow-none">
          <LocateIcon />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" size="icon" className="shadow-none">
              <Layers2Icon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Tipo de mapa</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <button onClick={() => pushQueryParam("mapType", "map")}>
                  Map
                </button>
                <button onClick={() => pushQueryParam("mapType", "satelite")}>
                  Satelite
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
