"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import type { Highline } from "@/app/actions/getHighline";
import { useQueryString } from "@/hooks/useQueryString";

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
  const { searchParams } = useQueryString();

  const selectedCategory: Category =
    (searchParams.get("category") as Category) || "speedline";

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
      <CategoryDropdown selectedCategory={selectedCategory} />

      <div>{renderCategory()}</div>
    </div>
  );
}

export default Ranking;
