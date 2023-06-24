"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

import supabase, { type Tables } from "@/utils/supabase";
import Highline from "../components/Highline";
import { SearchSvg } from "@/assets";

export default function Home() {
  const [highlines, setHighlines] = useState<Tables["highline"]["Row"][]>([]);
  const [search, setSearch] = useState("");

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
      <div className="relative mx-auto my-12 w-full sm:w-3/5">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchSvg />
        </div>
        <input
          type="search"
          id="default-search"
          placeholder="Nome do Highline"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>

      <section className="flex flex-wrap justify-center gap-6">
        {filteredHighlines.map((highline) => (
          <Highline key={highline.id} highline={highline} />
        ))}
      </section>
    </main>
  );
}
