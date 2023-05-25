"use client";

import React from "react";
import Link from "next/link";
import supabase, { type Tables } from "@/utils/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  convertISODateToTimeFormat,
  transformSecondsToTimeString,
} from "@/utils/helperFunctions";
import LoadingSkeleton from "./LoadingSkeleton";

interface Props {
  highline: Tables["highline"]["Row"];
}

function Ranking({ highline }: Props) {
  const fetchRoles = async ({ pageParam = 1 }) => {
    const { data } = await supabase
      .from("role")
      .select()
      .match({ highline_id: highline.id })
      .order("crossing_time", { ascending: true })
      .range((pageParam - 1) * 10, pageParam * 10 - 1);

    return data;
  };

  const {
    data: roles,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["roles"],
    ({ pageParam = 1 }) => fetchRoles({ pageParam }),
    {
      enabled: !!highline.id,
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return lastPage?.length === 10 ? nextPage : undefined;
      },
    }
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <div>OOPS! Aconteceu algum error. Recarregue a página.</div>;
  }

  return (
    <div className="w-full rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Speedline
        </h5>
      </div>

      <div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {roles.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page?.map((role) => {
                if (!role.crossing_time || !role.created_at) return null;
                return (
                  <li key={role.id} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`https://www.instagram.com/${role.name.replace(
                            "@",
                            ""
                          )}/`}
                          target="_blank"
                          className="truncate font-medium text-blue-700 dark:text-blue-500"
                        >
                          {role.name}
                        </Link>
                        <div>{convertISODateToTimeFormat(role.created_at)}</div>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {transformSecondsToTimeString(role.crossing_time)}
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
      </div>
    </div>
  );
}

export default Ranking;
