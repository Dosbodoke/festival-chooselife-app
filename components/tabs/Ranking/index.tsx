"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

import type { Highline } from "@/app/actions/getHighline";
import { usePathname, useRouter } from "@/navigation";

import Cadenas from "./Cadenas";
import { CategoryDropdown } from "./CategoryDropdown";
import Distance from "./Distance";
import FullLine from "./FullLine";
import Speedline from "./Speedline";

interface Props {
  highline: Highline;
}

export type Category = "speedline" | "distance" | "cadenas" | "fullLine";
export type Categories = Record<Category, { label: string }>;

function Ranking({ highline }: Props) {
  const t = useTranslations("highline.tabs.ranking");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categories = useMemo<Categories>(
    () => ({
      speedline: { label: "Speedline" },
      cadenas: { label: t("cadenas") },
      distance: { label: t("distance") },
      fullLine: { label: "Full Lines" },
    }),
    [t]
  );

  const selectedCategory: Category =
    (searchParams.get("category") as Category) || "speedline";

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleCategoryChange(category: Category) {
    router.push(pathname + "?" + createQueryString("category", category));
  }

  function renderCategory() {
    switch (selectedCategory) {
      case "speedline":
        return <Speedline highline={highline} />;
      case "distance":
        return <Distance highline={highline} />;
      case "cadenas":
        return <Cadenas highline={highline} />;
      case "fullLine":
        return <FullLine highline={highline} />;
      default:
        return null;
    }
  }

  return (
    <div className="w-full rounded-lg">
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div>{renderCategory()}</div>
    </div>
  );
}

export default Ranking;
