"use client";

import { ListIcon, MapIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";

function MapToggle({
  mapIsOpen,
  hidden,
}: {
  mapIsOpen: boolean;
  hidden?: boolean;
}) {
  const t = useTranslations("map.toggle");
  const [_, setView] = useQueryState("view");

  const currentType = mapIsOpen ? "list" : "map";

  return (
    <div
      className="fixed bottom-3 left-1/2 z-50 flex w-fit -translate-x-1/2 justify-center data-[hidden=true]:hidden"
      data-hidden={hidden}
      hidden={hidden}
    >
      <button
        onClick={() => setView(mapIsOpen ? "list" : "map")}
        className="flex items-center gap-2 rounded-3xl bg-black px-5 py-3 text-white"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={`label-${currentType}`}
            variants={motionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          >
            {t(currentType)}
          </motion.span>
          <motion.div
            key={`icon-${currentType}`}
            variants={motionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="h-6 w-6"
          >
            {mapIsOpen ? <ListIcon /> : <MapIcon />}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}

const motionVariants = {
  initial: { opacity: 0, y: -25 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 25 },
};

export default MapToggle;
