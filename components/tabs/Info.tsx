"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { Tables } from "@/utils/supabase/database.types";

interface Props {
  highline: Tables["highline"]["Row"];
}

function Info({ highline }: Props) {
  const t = useTranslations("highline.tabs.informations");

  return (
    <motion.div exit={{ opacity: 0 }}>
      <p className="mb-4 leading-relaxed">{highline.description}</p>

      <div className="flex border-t border-gray-200 py-2">
        <span className="flex-1 text-gray-500 dark:text-gray-400">
          {t("height")}
        </span>
        <span className="flex-1 text-right text-gray-900 dark:text-gray-200">
          {highline.height} {t("meters")}
        </span>
      </div>
      <div className="flex border-t border-gray-200 py-2">
        <span className="flex-1 text-gray-500 dark:text-gray-400">
          {t("length")}
        </span>
        <span className="flex-1 text-right text-gray-900 dark:text-gray-200">
          {highline.lenght} {t("meters")}
        </span>
      </div>
      <div className="flex border-t border-gray-200 py-2">
        <span className="flex-1 text-gray-500 dark:text-gray-400">
          {t("mainWebbing")}
        </span>
        <span className="flex-1 text-right text-gray-900 dark:text-gray-200">
          {highline.main_webbing}
        </span>
      </div>
      <div className="flex border-t border-gray-200 py-2">
        <span className="flex-1 text-gray-500 dark:text-gray-400">
          {t("backupWebbing")}
        </span>
        <span className="flex-1 text-right text-gray-900 dark:text-gray-200">
          {highline.backup_webbing}
        </span>
      </div>
    </motion.div>
  );
}

export default Info;
