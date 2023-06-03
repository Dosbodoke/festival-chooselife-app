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
        className="my-3 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
