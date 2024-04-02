"use client";

import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { useQueryString } from "@/hooks/useQueryString";

export default function Search() {
  const t = useTranslations("home");
  const { searchParams, pushQueryParam, deleteQueryParam } = useQueryString();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    if (search.value) {
      pushQueryParam("q", search.value);
    } else {
      deleteQueryParam("q");
    }
  }

  return (
    <div className="mx-auto flex w-full items-center rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-3/5">
      <SearchIcon className="h-5 w-5 text-muted-foreground" />

      <form onSubmit={onSubmit} className="flex-1">
        <input
          key={searchParams?.get("q")}
          type="text"
          name="search"
          placeholder={t("searchPlaceholder")}
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
          className="w-full bg-transparent pl-2 text-base text-gray-900 dark:text-white  dark:placeholder-gray-400"
        />
      </form>
    </div>
  );
}
