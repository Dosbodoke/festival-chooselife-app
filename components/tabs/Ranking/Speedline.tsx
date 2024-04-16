import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

import type { Highline } from "@/app/actions/getHighline";
import { transformSecondsToTimeString } from "@/utils/helperFunctions";
import useSupabaseBrowser from "@/utils/supabase/client";

import SeeMore from "../SeeMore";
import { Leaderboard } from "./leaderboard";
import LoadingSkeleton from "./LoadingSkeleton";

interface Props {
  highline: Highline;
}

const PAGE_SIZE = 5;

function Speedline({ highline }: Props) {
  const supabase = useSupabaseBrowser();

  async function fetchEntries({ pageParam = 1 }) {
    const { data, error } = await supabase.rpc("get_crossing_time", {
      highline_id: highline.id,
      page_number: pageParam,
      page_size: PAGE_SIZE,
    });
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
                if (!entry.crossing_time) return null;
                return {
                  name: entry.instagram,
                  position: pageIdx * PAGE_SIZE + idx + 1,
                  value: transformSecondsToTimeString(entry.crossing_time),
                  profilePicture: entry.profile_picture || "",
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
