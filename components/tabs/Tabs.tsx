"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// import type { Tables } from "~/lib/supabaseClient";
import Info from "./Info";
import Ranking from "./Ranking";

type Tab = {
  id: string;
  label: string;
};

interface Props {
  tabs: [Tab, Tab, Tab]; // Define that should be an array of 3 items
  // highline: Tables["highline"]["Row"];
  highline: any;
}

function tabMapping(tab: string, highline: any) {
  switch (tab) {
    case "info":
      return <Info highline={highline} />;
    case "reviews":
      return <div>Reviews</div>;
    case "ranking":
      return <Ranking />;
    default:
      return null;
  }
}

function Tabs({ tabs, highline }: Props) {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  return (
    <div>
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

      {tabMapping(selectedTabId, highline)}
    </div>
  );
}

export default Tabs;
