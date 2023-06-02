"use client";

import React, { useState } from "react";

import { type Tables } from "@/utils/supabase";

import CategoryDropdown from "./CategoryDropdown";
import Speedline from "./Speedline";
import Distance from "./Distance";
import Cadenas from "./Cadenas";
import FullLine from "./FullLine";

interface Props {
  highline: Tables["highline"]["Row"];
}

// TODO: Improve this logic, categories shouldn't be possible to
// crate with duplicated values such as ["sppedline", "speedline"]
export type Category = "speedline" | "distância" | "cadenas" | "fullLine";
const categories: Category[] = [
  "speedline",
  "distância",
  "cadenas",
  "fullLine",
];

function Ranking({ highline }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    () =>
      (localStorage.getItem("selectedCategory") as Category) || categories[0]
  );

  function handleCategoryChange(category: Category) {
    localStorage.setItem("selectedCategory", category);
    setSelectedCategory(category);
  }

  function renderCategory() {
    switch (selectedCategory) {
      case "speedline":
        return <Speedline highline={highline} />;
      case "distância":
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
