"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { ListIcon, MapIcon } from "@/assets";
import { usePathname, useRouter } from "@/navigation";

function MapToggle({ mapIsOpen }: { mapIsOpen: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="fixed bottom-0 mb-6 flex w-full justify-center">
      <button
        onClick={() =>
          router.push(
            pathname +
              "?" +
              createQueryString("map", mapIsOpen ? "false" : "true")
          )
        }
        className="flex items-center gap-2 rounded-3xl bg-black px-5 py-3 text-white"
      >
        <p>{mapIsOpen ? "Lista" : "Mapa"}</p>
        <div className="h-6 w-6">{mapIsOpen ? <ListIcon /> : <MapIcon />}</div>
      </button>
    </div>
  );
}

export default MapToggle;
