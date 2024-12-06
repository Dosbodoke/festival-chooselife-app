"use client";

import { ListIcon, MapIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

function MapToggle({
  mapIsOpen,
  hidden,
}: {
  mapIsOpen: boolean;
  hidden?: boolean;
}) {
  const t = useTranslations("map.toggle");
  const [, setView] = useQueryState("view");

  return (
    <div
      className="fixed bottom-3 left-1/2 z-50 flex w-fit -translate-x-1/2 justify-center data-[hidden=true]:hidden"
      data-hidden={hidden}
      hidden={hidden}
    >
      <button
        onClick={() => setView(mapIsOpen ? "list" : "map")}
        className="flex items-center gap-2 rounded-3xl bg-black px-5 py-3 text-white"
      >
        <p>{mapIsOpen ? t("list") : t("map")}</p>
        <div className="h-6 w-6">{mapIsOpen ? <ListIcon /> : <MapIcon />}</div>
      </button>
    </div>
  );
}

export default MapToggle;
