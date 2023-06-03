import React from "react";

import { CloseSvg } from "@/assets";

interface Props {
  closeModal: () => void;
}

function Header({ closeModal }: Props) {
  return (
    <div className="mb-4 border-b pb-4 dark:border-gray-600 sm:mb-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Registrar rolê
        </h3>
        <button
          type="button"
          onClick={closeModal}
          className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <CloseSvg />
        </button>
      </div>

      <div>
        Registre como foi o seu rolê para ter a sua estatística no festival.
      </div>
    </div>
  );
}

export default Header;
