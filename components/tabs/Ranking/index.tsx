"use client";

import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";

import { type Tables } from "@/utils/supabase";

import Cadenas from "./Cadenas";
import CategoryDropdown from "./CategoryDropdown";
import Distance from "./Distance";
import FullLine from "./FullLine";
import Speedline from "./Speedline";

interface Props {
  highline: Tables["highline"]["Row"];
}

export type Category = "speedline" | "distance" | "cadenas" | "fullLine";
export type Categories = Record<Category, { label: string }>;

function Ranking({ highline }: Props) {
  const t = useTranslations("highline.tabs.ranking");
  const categories = useMemo<Categories>(
    () => ({
      speedline: { label: "Speedline" },
      cadenas: { label: t("cadenas") },
      distance: { label: t("distance") },
      fullLine: { label: "Full Lines" },
    }),
    [t]
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    () => (localStorage.getItem("selectedCategory") as Category) || "speedline"
  );

  function handleCategoryChange(category: Category) {
    localStorage.setItem("selectedCategory", category);
    setSelectedCategory(category);
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
