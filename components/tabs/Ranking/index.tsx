"use client";

import React, { useState } from "react";

import { type Tables } from "@/utils/supabase";

import CategoryDropdown from "./CategoryDropdown";
import Speedline from "./Speedline";

interface Props {
  highline: Tables["highline"]["Row"];
}

export type Category = "speedline" | "distância";

const categories: Category[] = ["speedline", "distância"];

function Ranking({ highline }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("speedline");

  function handleCategoryChange(category: Category) {
    setSelectedCategory(category);
  }

  return (
    <div className="w-full rounded-lg">
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div>
        {selectedCategory === "speedline" ? (
          <Speedline highline={highline} />
        ) : null}
      </div>
    </div>
  );
}

export default Ranking;
