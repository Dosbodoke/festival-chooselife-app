"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const svgVariants: Variants = {
  normal: {
    y: 0,
  },
  animate: {
    y: [0, -5, -3],
    transition: {
      duration: 0.5,
      times: [0, 0.6, 1],
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
};

const minusVariants: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
};

const MapPinMinusInsideIcon = ({ className }: { className: string }) => {
  const controls = useAnimation();

  return (
    <div
      className="flex cursor-pointer select-none items-center justify-center rounded-md p-2"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={svgVariants}
        initial="normal"
        animate={controls}
        className={className}
      >
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <motion.path
          d="M9 10h6"
          variants={minusVariants}
          initial="normal"
          animate={controls}
        />
      </motion.svg>
    </div>
  );
};

export { MapPinMinusInsideIcon };
