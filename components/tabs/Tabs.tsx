"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

import { usePathname, useRouter } from "@/navigation";
import type { Tables } from "@/utils/supabase/database.types";

import Comments from "./Comments";
import Info from "./Info";
import Ranking from "./Ranking";

type Tab = {
  id: string;
  label: string;
};

interface Props {
  highline: Tables["highline"]["Row"];
}

function tabMapping(tab: string, highline: Tables["highline"]["Row"]) {
  switch (tab) {
    case "info":
      return <Info highline={highline} />;
    case "reviews":
      return <Comments highline={highline} />;
    case "ranking":
      return <Ranking highline={highline} />;
    default:
      return null;
  }
}

function Tabs({ highline }: Props) {
  const t = useTranslations("highline.tabs");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "info";

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      params.delete("category");

      return params.toString();
    },
    [searchParams]
  );

  const tabs = useMemo<Tab[]>(
    () => [
      {
        id: "info",
        label: t("informations.label"),
      },
      {
        id: "reviews",
        label: t("comments"),
      },
      {
        id: "ranking",
        label: "Ranking",
      },
    ],
    [t]
  );

  return (
    <div className="h-full">
      <ul className="mb-4 flex">
        {tabs.map((item) => (
          <li
            key={item.id}
            className={`relative flex-auto cursor-pointer rounded-t-md text-base md:text-lg ${
              item.id === tab ? "text-blue-600 dark:text-blue-500" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              router.push(pathname + "?" + createQueryString("tab", item.id));
            }}
          >
            {item.label}
            {item.id === tab ? (
              <motion.div
                className="absolute -bottom-px left-0 right-0 h-px bg-blue-700"
                layout
                layoutId="underline"
              />
            ) : null}
          </li>
        ))}
      </ul>

      <div className="overflow-y-auto overflow-x-hidden">
        {tabMapping(tab, highline)}
      </div>
    </div>
  );
}

export default Tabs;
