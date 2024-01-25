<<<<<<< HEAD
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
=======
import { cookies } from "next/headers";
import { useTranslations } from "next-intl";

import { ArrowIcon } from "@/assets";
import HighlineImage from "@/components/HighlineImage";
import { Link } from "@/navigation";
import type { Tables } from "@/utils/supabase/database.types";
import { useSupabaseServer } from "@/utils/supabase/server";

export async function HighlineList({
  nameFilter,
}: {
  nameFilter: string | undefined;
}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const highlines = nameFilter
    ? (
        await supabase
          .from("highline")
          .select("*")
          .ilike("name", `%${nameFilter}%`)
      ).data
    : (await supabase.from("highline").select("*").limit(10)).data;

  return (
    <section className="flex flex-wrap justify-center gap-6">
      {highlines && highlines?.length > 0
        ? highlines.map((highline) => (
            <Highline key={highline.id} highline={highline} />
          ))
        : null}
    </section>
  );
}

interface HighlineProps {
  highline: Tables["highline"]["Row"];
}

function Highline({ highline }: HighlineProps) {
  const t = useTranslations("home");

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 md:w-96">
      <div className="relative block h-72 w-full">
        <HighlineImage coverImageId={highline.cover_image} />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {highline.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {highline.description}
        </p>
        <Link
          href={`/${highline.id}`}
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t("seeDetails")}
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

export function HighlineListSkeleton() {
  return (
    <ul className="flex animate-pulse flex-wrap justify-center gap-6">
      {Array.from(Array(8)).map((v) => (
        <li
          className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 md:w-96"
          key={v}
        >
          <div className="relative block h-72 w-full opacity-25">
            <HighlineImage coverImageId={null} />
          </div>
          <div className="p-5">
            <div className="mt-4 h-6 w-28 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mt-2 h-3 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mt-2 h-3 w-56 rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </li>
      ))}
    </ul>
>>>>>>> f2abc8c (Added react-leaflet map with button to toggle between the Map and a list)
  );
}
