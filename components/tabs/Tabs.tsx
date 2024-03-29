"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "@/navigation";
import type { Tables } from "@/utils/supabase/database.types";

import Comments from "./Comments";
import Info from "./Info";
import Ranking from "./Ranking";

interface Props {
  highline: Tables["highline"]["Row"];
}

function HighlineTabs({ highline }: Props) {
  const t = useTranslations("highline.tabs");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTab = searchParams.get("tab") || "info";

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

  const tabs = useMemo(
    () => [
      {
        id: "info",
        label: t("informations.label"),
        content: <Info highline={highline} />,
      },
      {
        id: "comments",
        label: t("comments"),
        content: <Comments highline={highline} />,
      },
      {
        id: "ranking",
        label: "Ranking",
        content: <Ranking highline={highline} />,
      },
    ],
    [t, highline]
  );

  return (
    <>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("tab", value));
        }}
      >
        <TabsList className="w-full gap-2">
          {tabs.map((tab) => (
            <TabsTrigger
              className="relative data-[state=active]:bg-transparent"
              value={tab.id}
              key={`${tab.id}-trigger`}
            >
              {selectedTab === tab.id && (
                <motion.div
                  layoutId="selectedTab"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className="absolute inset-0 rounded-md bg-background"
                />
              )}

              <span className="relative block text-black dark:text-white">
                {tab.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={`${tab.id}-content`} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

export default HighlineTabs;
