"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
      <div className="flex border-t border-gray-200 py-2">
        <span className="flex-1 text-gray-500 dark:text-gray-400">Riggers</span>
        <span className="flex-1 text-right text-gray-900 dark:text-gray-200">
          {highline.riggers?.length === 2 ? (
            <>
              <Link
                href={`https://www.instagram.com/${highline.riggers[0].replace(
                  "@",
                  ""
                )}/`}
                target="_blank"
                className="mt-1 block truncate py-1 font-medium text-blue-700 dark:text-blue-500"
              >
                {highline.riggers[0]}
              </Link>
              <Link
                href={`https://www.instagram.com/${highline.riggers[1].replace(
                  "@",
                  ""
                )}/`}
                target="_blank"
                className="mt-1 block truncate py-1 font-medium text-blue-700 dark:text-blue-500"
              >
                {highline.riggers[0]}
              </Link>
            </>
          ) : null}
        </span>
      </div>
      <h2 className="my-4 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Mapa
      </h2>
      <div className="relative h-[36rem] w-full">
        <Image
          src={"/mapa-chooselife.jpg"}
          alt="Mapa do Festival"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-12 bg-orange-500" />
          <span>Estrada 4x4</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-12 bg-red-700" />
          <span>Trilha dos escravos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-12 bg-teal-500" />
          <span>Trilha setor dos anjos</span>
        </div>
        <p>
          1 Setor dos Anjos - Fabiano Pimenta / Thiago Pantufa / Jonas Silva
        </p>
        <p>2 Chora Negão</p>
        <p>3 Escravos de Choosen / Coração de Frango</p>
        <p>4 Brazilian Jenks / Bota o Capacete</p>
        <p>5 Agulhinha</p>
        <p>6 Café Chooselife</p>
        <p>7 Choose Games / Waterline</p>
        <p>8 Bonds Vive</p>
        <p>9 Quemtaí? / O Pastor, o grilo e a Tartaruta</p>
      </div>
    </motion.div>
  );
}

export default Info;
