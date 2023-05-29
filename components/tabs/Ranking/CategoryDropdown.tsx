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
        <div>{selectedCategory}</div>
        <ArrowDownSvg className="w-4 h-4" />
      </button>

      {dropdownOpen && (
        <div className="mt-3 absolute z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-600 dark:divide-gray-500">
          <div className="block px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
            Trocar modalidade
          </div>
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((c) => (
              <li key={c}>
                <label
                  htmlFor={c}
                  className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-500"
                >
                  <input
                    id={c}
                    type="radio"
                    value={c}
                    checked={selectedCategory === c}
                    onChange={() => handleCategorySelect(c)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="w-full ml-2 text-sm font-medium text-gray-500 rounded dark:text-gray-300">
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
