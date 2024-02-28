"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import { getHighline } from "@/app/actions/getHighline";

import { Highline } from "./Highline";
import { HighlineListSkeleton } from "./HighlineListSkeleton";

export const pageSize = 6;

export function HighlineList() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("q") || "";

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["highlines", { searchValue }],
    queryFn: ({ pageParam }) =>
      getHighline({ pageParam, searchValue, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage.data?.length === pageSize ? nextPage : undefined;
    },
  });

  return (
    <>
      <section className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.pages.map((page) =>
          page.data?.map((high) => <Highline key={high.id} highline={high} />)
        )}
        {isFetching ? <HighlineListSkeleton /> : null}
      </section>
      {hasNextPage ? (
        <motion.div
          // Change the key with the loaded items length to
          // create a new div each time new items load
          key={data?.pages.length}
          // Pairing this with once: true will ensure just one
          // network request per load
          viewport={{ once: true, margin: "0px" }}
          onViewportEnter={() => {
            hasNextPage && fetchNextPage();
          }}
          onClick={() => {
            hasNextPage && fetchNextPage();
          }}
        ></motion.div>
      ) : null}
    </>
  );
}
