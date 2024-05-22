import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

import useSupabaseBrowser from "@/utils/supabase/client";

import SeeMore from "../SeeMore";
import { Leaderboard } from "./leaderboard";
import LoadingSkeleton from "./LoadingSkeleton";

interface Props {
  highlines_ids: string[];
}

const PAGE_SIZE = 5;

function Distance({ highlines_ids }: Props) {
  const supabase = useSupabaseBrowser();

  async function fetchEntries({ pageParam = 1 }) {
    const { data, error } = await supabase.rpc("get_total_walked", {
      highline_ids: highlines_ids,
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
    queryKey: ["entry", highlines_ids, "distance"],
    queryFn: ({ pageParam }) => fetchEntries({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage?.length === PAGE_SIZE ? nextPage : undefined;
    },
    enabled: !!highlines_ids.length,
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
                return {
                  name: entry.instagram,
                  position: pageIdx * PAGE_SIZE + idx + 1,
                  value: `${entry.total_distance_walked}m`,
                  profilePicture: entry.profile_picture,
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

export default Distance;
