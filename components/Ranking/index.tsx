"use client";

import { useQueryString } from "@/hooks/useQueryString";

import Cadenas from "./Cadenas";
import { CategoryDropdown } from "./CategoryDropdown";
import Distance from "./Distance";
import FullLine from "./FullLine";
import Speedline from "./Speedline";

interface Props {
  highlines_ids: string[];
  visibleCategories?: Category[];
  startDate?: Date;
  endDate?: Date;
}

export type Category = "speedline" | "distance" | "cadenas" | "fullLine";

const CategoryRenderer: React.FC<
  Props & {
    category: Category;
  }
> = ({ category, highlines_ids, visibleCategories, startDate, endDate }) => {
  if (!visibleCategories?.includes(category)) return null;
  switch (category) {
    case "speedline":
      return <Speedline highlines_id={highlines_ids[0]} />;
    case "distance":
      return (
        <Distance
          highlines_ids={highlines_ids}
          startDate={startDate}
          endDate={endDate}
        />
      );
    case "cadenas":
      return (
        <Cadenas
          highlines_ids={highlines_ids}
          startDate={startDate}
          endDate={endDate}
        />
      );
    case "fullLine":
      return (
        <FullLine
          highlines_ids={highlines_ids}
          startDate={startDate}
          endDate={endDate}
        />
      );
    default:
      return null;
  }
};

export const Ranking: React.FC<Props> = ({
  highlines_ids,
  visibleCategories = ["cadenas", "distance", "fullLine", "speedline"], // All categories visible by default,
  startDate,
  endDate,
}) => {
  const { searchParams } = useQueryString();
  const selectedCategory =
    (searchParams.get("category") as Category) || "distance";

  return (
    <div className="w-full rounded-lg">
      <CategoryDropdown
        selectedCategory={selectedCategory}
        visibleCategories={visibleCategories}
      />
      <CategoryRenderer
        category={selectedCategory}
        highlines_ids={highlines_ids}
        visibleCategories={visibleCategories}
      />
    </div>
  );
};
