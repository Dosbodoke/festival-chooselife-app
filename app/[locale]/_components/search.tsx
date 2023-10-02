"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { SearchSvg } from "@/assets";
import CreateHighline from "@/components/CreateHighline";
import { useRouter } from "@/navigation";
import { createUrl } from "@/utils/helperFunctions";

export default function Search() {
  const router = useRouter();

  const t = useTranslations("home");

  const searchParams = useSearchParams();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());
    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }
    router.push(createUrl("/", newParams));
  }
  return (
    <div className="mx-auto flex w-full items-center rounded-lg border border-gray-300 bg-gray-50 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-3/5">
      <SearchSvg />

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
      <CreateHighline />
    </div>
  );
}
