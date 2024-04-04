"use client";

import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/Input";
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
    <form onSubmit={onSubmit} className="relative mx-auto w-full sm:w-3/5">
      <span className="absolute inset-y-0 start-0 flex items-center justify-center px-2">
        <SearchIcon className="h-6 w-6 text-muted-foreground" />
      </span>
      <Input
        key={searchParams?.get("q")}
        type="search"
        name="search"
        placeholder={t("searchPlaceholder")}
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="bg-transparent pl-10 text-base"
      />
    </form>
  );
}
