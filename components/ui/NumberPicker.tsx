"use client";

import { MinusIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

import { PlusSvg } from "@/assets";
import { cn } from "@/utils/cn";

interface Props {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}
function NumberPicker({ value, onChange, className }: Props) {
  function handleDecrement() {
    if (value > 0) onChange(value - 1);
  }

  function handleIncrement() {
    onChange(value + 1);
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        className="grid h-8 w-8 place-items-center rounded-md bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white"
        onClick={(e) => {
          e.preventDefault();
          handleDecrement();
        }}
      >
        <MinusIcon transform="scale(1.5, 2)" />
      </button>

      <motion.div
        key={value}
        className="tabular-nums"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        exit={{ y: -15, opacity: 0 }}
      >
        {value}
      </motion.div>
      <button
        className="grid h-8 w-8 place-items-center rounded-md bg-blue-700 text-white dark:bg-blue-600"
        onClick={(e) => {
          e.preventDefault();
          handleIncrement();
        }}
      >
        <PlusSvg />
      </button>
    </div>
  );
}

export default NumberPicker;
