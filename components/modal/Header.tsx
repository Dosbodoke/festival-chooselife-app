import React from "react";

import { CloseSvg } from "@/assets";

interface Props {
  closeModal: () => void;
}

function Header({ closeModal }: Props) {
  return (
    <div className="pb-4 mb-4 border-b sm:mb-5 dark:border-gray-600">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Registrar rolê
        </h3>
        <button
          type="button"
          onClick={closeModal}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
