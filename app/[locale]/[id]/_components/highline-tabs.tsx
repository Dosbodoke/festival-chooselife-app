"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import type { Highline } from "@/app/actions/getHighline";
import { Ranking } from "@/components/Ranking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryString } from "@/hooks/useQueryString";

import Comments from "./Comments";
import Info from "./Info";

interface Props {
  highline: Highline;
}

export const HighlineTabs = ({ highline }: Props) => {
  const t = useTranslations("highline.tabs");
  const searchParams = useSearchParams();
  const { replaceQueryParam } = useQueryString();

  const selectedTab = searchParams.get("tab") || "info";

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
        content: <Ranking highlines_ids={[highline.id]} />,
      },
    ],
    [t, highline]
  );

  return (
    <>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          replaceQueryParam("tab", value);
        }}
      >
        <TabsList className="my-2 w-full gap-2">
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
};
