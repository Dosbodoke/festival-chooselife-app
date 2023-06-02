import React from "react";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  convertISODateToTimeFormat,
  transformSecondsToTimeString,
} from "@/utils/helperFunctions";
import supabase, { type Tables } from "@/utils/supabase";
import LoadingSkeleton from "./LoadingSkeleton";

interface Props {
  highline: Tables["highline"]["Row"];
}

const PAGE_SIZE = 5;

function Speedline({ highline }: Props) {
  const fetchEntrys = async ({ pageParam = 1 }) => {
    const { data } = await supabase
      .from("entry")
      .select()
      .match({ highline_id: highline.id })
      .order("crossing_time", { ascending: true })
      .range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);

    return data;
  };

  const {
    data: entrys,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["entry", highline.id, "speedline"],
    ({ pageParam = 1 }) => fetchEntrys({ pageParam }),
    {
      enabled: !!highline.id,
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return lastPage?.length === PAGE_SIZE ? nextPage : undefined;
      },
    }
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <div>OOPS! Aconteceu algum error. Tente recarregar a página.</div>;
  }

  return (
    <>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {entrys.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page?.map((entry, idx) => {
              if (!entry.crossing_time || !entry.created_at) return null;
              const rankingPosition = pageIndex * PAGE_SIZE + idx + 1; // Calculate ranking
              return (
                <li key={entry.id} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="font-bold">{rankingPosition}</div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`https://www.instagram.com/${entry.instagram.replace(
                          "@",
                          ""
                        )}/`}
                        target="_blank"
                        className="truncate font-medium text-blue-700 dark:text-blue-500"
                      >
                        {entry.instagram}
                      </Link>
                      <div>{convertISODateToTimeFormat(entry.created_at)}</div>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {transformSecondsToTimeString(entry.crossing_time)}
                    </div>
                  </div>
                </li>
              );
            })}
          </React.Fragment>
        ))}
      </ul>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isLoading}
          className="mt-2 text-center text-sm font-medium cursor-pointer text-blue-600 dark:text-blue-500"
        >
          carregar mais
        </button>
      )}
    </>
  );
}

export default Speedline;
