"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import type { Tables } from "@/utils/supabase";

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
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  return (
    <div className="h-full">
      <ul className="mb-4 flex">
        {tabs.map((item) => (
          <li
            key={item.id}
            className={`relative flex-auto cursor-pointer rounded-t-md text-base md:text-lg ${
              item.id === selectedTabId
                ? "text-blue-600 dark:text-blue-500"
                : ""
            }`}
            onClick={() => setSelectedTabId(item.id)}
          >
            {item.label}
            {item.id === selectedTabId ? (
              <motion.div
                className="absolute -bottom-px left-0 right-0 h-px bg-blue-700"
                layout
                layoutId="underline"
              />
            ) : null}
          </li>
        ))}
      </ul>

      <div className="overflow-y-auto">
        {tabMapping(selectedTabId, highline)}
      </div>
    </div>
  );
}

export default Tabs;
