import Image from "next/image";
import Link from "next/link";

import type { Tables } from "@/utils/supabase";
import { ArrowIcon } from "@/assets";
import HighlineImage from "./HighlineImage";

interface Props {
  highline: Tables["highline"]["Row"];
}

function Highline({ highline }: Props) {
  return (
    <div className="sm:w-128 w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="relative block h-72 w-full">
        <HighlineImage coverImageId={highline.cover_image} />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {highline.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {highline.description}
        </p>
        <Link
          href={`/${highline.id}`}
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ver detalhes
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

export default Highline;
