"use client";

import { useState, useEffect } from "react";
import supabase, { type Tables } from "@/utils/supabase";
import Highline from "@/components/Highline";
import { SearchSvg } from "@/assets";
import CreateHighline from "@/components/CreateHighline";
import { useTranslations } from "next-intl";

export default function Home() {
  const [highlines, setHighlines] = useState<Tables["highline"]["Row"][]>([]);
  const [search, setSearch] = useState("");

  const t = useTranslations("home");

  useEffect(() => {
    fetchHighlines();
  }, []);

  const fetchHighlines = async () => {
    const { data } = await supabase.from("highline").select("*");
    setHighlines(data || []);
  };

  const filteredHighlines = highlines.filter((highline) =>
    highline.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container mx-auto ">
      <div className="mx-auto my-12 flex w-full items-center rounded-lg border border-gray-300 bg-gray-50 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-3/5">
        <SearchSvg />
        <input
          type="search"
          id="default-search"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent pl-2 text-base text-gray-900 dark:text-white  dark:placeholder-gray-400"
        />
        <CreateHighline />
      </div>

      <section className="flex flex-wrap justify-center gap-6">
        {filteredHighlines.map((highline) => (
          <Highline key={highline.id} highline={highline} />
        ))}
      </section>
    </main>
  );
}
