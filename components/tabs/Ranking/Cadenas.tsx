import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

import type { Highline } from "@/app/actions/getHighline";
import useSupabaseBrowser from "@/utils/supabase/client";

import SeeMore from "../SeeMore";
import { Leaderboard } from "./leaderboard";
import LoadingSkeleton from "./LoadingSkeleton";

interface Props {
  highline: Highline;
}

const PAGE_SIZE = 5;

function Cadenas({ highline }: Props) {
  const supabase = useSupabaseBrowser();

  async function fetchCadenas({ pageParam = 1 }) {
    const { data, error } = await supabase.rpc("get_total_cadenas", {
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
    queryKey: ["entry", highline.id, "cadenas"],
    queryFn: ({ pageParam }) => fetchCadenas({ pageParam }),
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
                return {
                  name: entry.instagram,
                  position: pageIdx * PAGE_SIZE + idx + 1,
                  value: entry.total_cadenas.toString(),
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

export default Cadenas;
