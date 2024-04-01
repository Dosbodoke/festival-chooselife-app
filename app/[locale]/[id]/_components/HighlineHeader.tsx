"use client";

import { MapPinIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { Highline } from "@/app/actions/getHighline";
import { RegistryEntry } from "@/components/RegistryEntry";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const HighlineHeader = ({ highline }: { highline: Highline }) => {
  const router = useRouter();

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const isClamped =
        descriptionRef.current.scrollHeight >
        descriptionRef.current.clientHeight;
      setIsClamped(isClamped);
    }
  }, [descriptionRef]);

  return (
    <CardHeader className="mb-4 space-y-4 pb-3">
      <div>
        <CardTitle className="text-xl">{highline.name}</CardTitle>
        {highline.description ? (
          <div className="relative">
            <CardDescription
              data-expanded={descriptionExpanded}
              className="line-clamp-3 data-[expanded=true]:line-clamp-none"
              ref={descriptionRef}
            >
              {highline.description}
            </CardDescription>
            <Button
              className={cn(
                "hidden w-fit -translate-y-2 p-0 text-blue-700 dark:text-blue-500",
                isClamped ? "block" : ""
              )}
              onClick={() => setDescriptionExpanded((prev) => !prev)}
              variant="link"
            >
              {descriptionExpanded ? "See less..." : "See more..."}
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex gap-2">
        <RegistryEntry
          highlineId={highline.id}
          highlineDistance={highline.lenght}
        />
        {highline.anchor_a_lat && highline.anchor_b_lat ? (
          <Button
            variant="outline"
            className="border-dashed"
            onClick={() => {
              router.push(`/?view=map&focusedMarker=${highline.id}`);
            }}
          >
            <MapPinIcon className="mr-2 h-4 w-4" /> Ver no mapa
          </Button>
        ) : (
          <Button variant="outline" className="border-dashed">
            <MapPinIcon className="mr-2 h-4 w-4" /> Adiconar ao mapa
          </Button>
        )}
      </div>
    </CardHeader>
  );
};
