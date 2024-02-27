"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useSearchParams } from "next/navigation";

import { getHighline } from "@/app/actions/getHighline";

import { Highline } from "./Highline";
import { HighlineListSkeleton } from "./HighlineListSkeleton";

export default function HighlineList() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("q") || "";

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["highlines", { searchValue }],
    queryFn: ({ pageParam }) => getHighline({ pageParam, searchValue }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (scrollYProgress.get() === 1 && hasNextPage) fetchNextPage();
  });

  return (
    <section className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.pages.map((page) =>
        page.data?.map((high) => (
          <Highline
            key={high.id}
            highline={{
              ...high,
              is_favorite: !!high.favorite_highline.find(
                (fav) => fav.profile_id === ""
              ),
            }}
          />
        ))
      )}
      {isFetching ? <HighlineListSkeleton /> : null}
    </section>
  );
}
