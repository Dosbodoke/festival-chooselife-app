"use client";

import { ListIcon, MapIcon } from "@/assets";
import { useQueryString } from "@/hooks/useQueryString";

function MapToggle({ mapIsOpen }: { mapIsOpen: boolean }) {
  const { pushQueryParam, searchParams } = useQueryString();

  return (
    <div className="fixed bottom-3 left-1/2 z-50 flex w-fit -translate-x-1/2   justify-center">
      <button
        onClick={() => pushQueryParam("view", mapIsOpen ? "list" : "map")}
        className="flex items-center gap-2 rounded-3xl bg-black px-5 py-3 text-white"
      >
        <p>{mapIsOpen ? "Lista" : "Mapa"}</p>
        <div className="h-6 w-6">{mapIsOpen ? <ListIcon /> : <MapIcon />}</div>
      </button>
    </div>
  );
}

export default MapToggle;
