"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

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
import { useQueryString } from "@/hooks/useQueryString";

import { type Categories, type Category } from "./index";

interface Props {
  selectedCategory: Category;
}

export const CategoryDropdown = ({ selectedCategory }: Props) => {
  const t = useTranslations("highline.tabs.ranking");
  const { replaceQueryParam } = useQueryString();

  const categories = useMemo<Categories>(
    () => ({
      speedline: { label: "Speedline" },
      cadenas: { label: t("cadenas") },
      distance: { label: t("distance") },
      fullLine: { label: "Full Lines" },
    }),
    [t]
  );

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
          onValueChange={(category) => replaceQueryParam("category", category)}
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
