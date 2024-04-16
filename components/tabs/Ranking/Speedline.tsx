import { useInfiniteQuery } from "@tanstack/react-query";
import { useFormatter } from "next-intl";
import React from "react";

import type { Highline } from "@/app/actions/getHighline";
import { transformSecondsToTimeString } from "@/utils/helperFunctions";
import useSupabaseBrowser from "@/utils/supabase/client";

import SeeMore from "../SeeMore";
import { Leaderboard, LeaderboardRow } from "./leaderboard";
import LoadingSkeleton from "./LoadingSkeleton";

interface Props {
  highline: Highline;
}

const PAGE_SIZE = 5;

function Speedline({ highline }: Props) {
  const supabase = useSupabaseBrowser();
  const format = useFormatter();

  async function fetchEntries({ pageParam = 1 }) {
    const { data } = await supabase
      .from("entry")
      .select()
      .match({ highline_id: highline.id })
      .order("crossing_time", { ascending: true })
      .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);

    return data;
  }

  const {
    data: entries,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["entry", highline.id, "speedline"],
    queryFn: ({ pageParam }) => fetchEntries({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage?.length === PAGE_SIZE ? nextPage : undefined;
    },
    enabled: !!highline.id,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <div>OOPS! Aconteceu algum error. Tente recarregar a página.</div>;
  }

  return (
    <>
      <Leaderboard
        entries={
          entries?.pages.flatMap((page, pageIdx) => {
            return (
              page?.map((entry, idx) => {
                if (!entry.crossing_time || !entry.created_at) return null;
                return {
                  name: entry.instagram,
                  position: pageIdx * PAGE_SIZE + idx + 1,
                  value: transformSecondsToTimeString(entry.crossing_time),
                };
              }) || []
            );
          }) || [null, null, null]
        }
      />
      {hasNextPage && (
        <SeeMore onClick={() => fetchNextPage()} disabled={isLoading} />
      )}
    </>
  );
}

export default Speedline;
