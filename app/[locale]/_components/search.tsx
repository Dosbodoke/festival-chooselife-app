"use client";

import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { useRouter } from "@/navigation";
import { createUrl } from "@/utils/helperFunctions";

export default function Search() {
  const t = useTranslations("home");
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());
    if (search.value) {
      newParams.set("nameFilter", search.value);
    } else {
      newParams.delete("nameFilter");
    }
    router.push(createUrl("/", newParams));
  }

  return (
    <div className="mx-auto flex w-full items-center rounded-lg border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-3/5">
      <SearchIcon className="h-5 w-5 text-muted-foreground" />

      <form onSubmit={onSubmit} className="flex-1">
        <input
          key={searchParams?.get("nameFilter")}
          type="text"
          name="search"
          placeholder={t("searchPlaceholder")}
          autoComplete="off"
          defaultValue={searchParams?.get("nameFilter") || ""}
          className="w-full bg-transparent pl-2 text-base text-gray-900 dark:text-white  dark:placeholder-gray-400"
        />
      </form>
    </div>
  );
}
