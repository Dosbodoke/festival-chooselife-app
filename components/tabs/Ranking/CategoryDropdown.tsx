"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { ArrowDownSvg } from "@/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type Categories, type Category } from "./index";

interface Props {
  categories: Categories;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategoryDropdown = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) => {
  const t = useTranslations("highline.tabs.ranking");

  const handleCategorySelect = (category: Category) => {
    onCategoryChange(category);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center gap-1 text-xl font-bold leading-none text-gray-900 dark:text-white"
        >
          <ArrowDownSvg className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          <div className="capitalize">{categories[selectedCategory].label}</div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{t("changeModality")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedCategory}
          onValueChange={(val) => handleCategorySelect(val as Category)}
        >
          {Object.entries(categories).map(([key, value]) => (
            <DropdownMenuRadioItem key={key} value={key}>
              {value.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
