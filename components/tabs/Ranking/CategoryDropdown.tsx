import { useState } from "react";

import { type Category } from "./index";
import { ArrowDownSvg } from "@/assets";

interface Props {
  categories: Category[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

function CategoryDropdown({
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setDropdownOpen(false);
    onCategoryChange(category);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="inline-flex items-end gap-2 text-xl font-bold leading-none text-gray-900 dark:text-white"
      >
        <div className="capitalize">{selectedCategory}</div>
        <ArrowDownSvg className="h-4 w-4" />
      </button>

      {dropdownOpen && (
        <div className="absolute z-10 mt-3 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-500 dark:bg-gray-600">
          <div className="block px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Trocar modalidade
          </div>
          <ul className="space-y-1 p-3 text-sm capitalize text-gray-700 dark:text-gray-200">
            {categories.map((c) => (
              <li key={c}>
                <label
                  htmlFor={c}
                  className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-500"
                >
                  <input
                    id={c}
                    type="radio"
                    value={c}
                    checked={selectedCategory === c}
                    onChange={() => handleCategorySelect(c)}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <span className="ml-2 w-full rounded text-sm font-medium text-gray-500 dark:text-gray-300">
                    {c}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;
