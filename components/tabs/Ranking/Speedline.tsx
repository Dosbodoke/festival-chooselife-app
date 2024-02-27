import { useInfiniteQuery } from "@tanstack/react-query";
import { useFormatter } from "next-intl";
import React from "react";

import { transformSecondsToTimeString } from "@/utils/helperFunctions";
import useSupabaseBrowser from "@/utils/supabase/client";
import type { Tables } from "@/utils/supabase/database.types";

import SeeMore from "../SeeMore";
import LoadingSkeleton from "./LoadingSkeleton";
import UsernameLink from "./UsernameLink";

interface Props {
  highline: Tables["highline"]["Row"];
}

const PAGE_SIZE = 5;

function Speedline({ highline }: Props) {
  const supabase = useSupabaseBrowser();
  const format = useFormatter();

  async function fetchEntrys({ pageParam = 1 }) {
    const { data } = await supabase
      .from("entry")
      .select()
      .match({ highline_id: highline.id })
      .order("crossing_time", { ascending: true })
      .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);

    return data;
  }

  const {
    data: entrys,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["entry", highline.id, "speedline"],
    queryFn: ({ pageParam }) => fetchEntrys({ pageParam }),
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
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {entrys?.pages.map((page, pageIndex) =>
          page?.map((entry, idx) => {
            if (!entry.crossing_time || !entry.created_at) return null;
            const rankingPosition = pageIndex * PAGE_SIZE + idx + 1; // Calculate ranking
            return (
              <li key={entry.id} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="font-bold">{rankingPosition}</div>
                  <div className="min-w-0 flex-1">
                    <UsernameLink username={entry.instagram} />
                    <div>
                      {format.dateTime(new Date(entry.created_at), {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {transformSecondsToTimeString(entry.crossing_time)}
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
      {hasNextPage && (
        <SeeMore onClick={() => fetchNextPage()} disabled={isLoading} />
      )}
    </>
  );
}

export default Speedline;
