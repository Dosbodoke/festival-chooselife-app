import React from "react";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";

import supabase, { type Tables } from "@/utils/supabase";
import LoadingSkeleton from "../LoadingSkeleton";

interface Props {
  highline: Tables["highline"]["Row"];
}

const PAGE_SIZE = 5;

function Distance({ highline }: Props) {
  const fetchEntrys = async ({ pageParam = 1 }) => {
    const { data, error } = await supabase.rpc("get_total_walked", {
      highline_id: highline.id,
      page_number: pageParam,
      page_size: PAGE_SIZE,
    });
    return data;
    // const { data, error } = await supabase
    //   .rpc("get_total_walked", {
    //     highline_id: highline.id,
    //     page_number: pageParam,
    //     page_size: PAGE_SIZE,
    //   })
    //   .select();
    // console.log({ data });
    // return data;
  };

  const {
    data: entrys,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["entry", highline.id, "distance"],
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
              const rankingPosition = pageIndex * PAGE_SIZE + idx + 1; // Calculate ranking
              console.log(entry);
              return (
                <li key={entry.instagram} className="py-3 sm:py-4">
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
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {entry.total_distance_walked}m
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

export default Distance;
