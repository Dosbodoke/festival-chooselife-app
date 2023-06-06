"use client";

import { motion } from "framer-motion";

import type { Tables } from "@/utils/supabase";

interface Props {
  highline: Tables["highline"]["Row"];
}

function Info({ highline }: Props) {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <p className="mb-4 leading-relaxed">{highline.description}</p>

      <div className="flex border-t border-gray-200 py-2">
        <span className="flex-1 text-gray-500 dark:text-gray-400">Altura</span>
        <span className="flex-1 text-right text-gray-900 dark:text-gray-200">
          {highline.height} metros
        </span>
      </div>
      <div className="flex border-t border-gray-200 py-2">
        <span className="flex-1 text-gray-500 dark:text-gray-400">
          Comprimento
        </span>
        <span className="flex-1 text-right text-gray-900 dark:text-gray-200">
          {highline.lenght} metros
        </span>
      </div>
      <div className="flex border-t border-gray-200 py-2">
        <span className="flex-1 text-gray-500 dark:text-gray-400">
          Fita principal
        </span>
        <span className="flex-1 text-right text-gray-900 dark:text-gray-200">
          {highline.main_webbing}
        </span>
      </div>
      <div className="flex border-t border-gray-200 py-2">
        <span className="flex-1 text-gray-500 dark:text-gray-400">
          Fita Backup
        </span>
        <span className="flex-1 text-right text-gray-900 dark:text-gray-200">
          {highline.backup_webbing}
        </span>
      </div>
    </motion.div>
  );
}

export default Info;
