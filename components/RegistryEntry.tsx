"use client";

import { useState } from "react";

import Modal from "./modal/Modal";

interface Props {
  highlineId: string;
  highlineDistace: number;
}

function RegistryEntry({ highlineId, highlineDistace }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Registrar rolê
      </button>
      {isOpen && (
        <Modal
          highlineId={highlineId}
          highlineDistance={highlineDistace}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default RegistryEntry;
