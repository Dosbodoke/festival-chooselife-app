import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { EnduranceIcon, SpeedlineIcon } from "@/assets";
import HighlineImage from "@/components/HighlineImage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { transformSecondsToTimeString } from "@/utils/helperFunctions";
import supabase from "@/utils/supabase-server";

import FormattedDate from "./FormattedDate";

interface Props {
  username: string;
}

async function LastWalks({ username }: Props) {
  const { data: entries } = await supabase
    .from("entry")
    .select(
      `
      *,
      highline (*)
    `
    )
    .eq("instagram", `@${username}`)
    .limit(5)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-screen-md rounded-xl border border-gray-200 bg-white px-2 py-4 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-xl font-semibold dark:text-white">Last Walks</h3>
      <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
        {entries?.map((entry) => (
          <li key={entry.id} className="py-4 first:pt-0 last:pb-0">
            <Popover>
              <PopoverTrigger className="mb-0.5 truncate text-base font-semibold leading-none text-blue-500 dark:text-blue-400">
                {entry.highline?.name}
              </PopoverTrigger>
              <PopoverContent side="top" className="max-h-96 overflow-auto p-0">
                <div className="relative h-12 w-full">
                  <HighlineImage
                    coverImageId={entry.highline?.cover_image || null}
                  />
                </div>
                <div className="space-y-2 p-4">
                  <p>{entry.highline?.description}</p>
                  <Link
                    href={`/${entry.highline?.id}`}
                    className="flex items-center font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-600"
                  >
                    Ver mais{" "}
                    <ChevronRightIcon
                      className="ml-1.5 h-3 w-3"
                      strokeWidth={2}
                      stroke="currentColor"
                    />
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
            <FormattedDate date={new Date(entry.created_at)} />
            <div className="text-white-700 mb-1 flex gap-4 truncate text-sm font-normal dark:text-white">
              {entry.crossing_time && (
                <div className="flex items-end gap-1">
                  <SpeedlineIcon className="text-gray-900 dark:text-white" />
                  <p>{transformSecondsToTimeString(entry.crossing_time)}</p>
                </div>
              )}
              <div className="flex items-end gap-1">
                <EnduranceIcon className="text-gray-900 dark:text-white" />
                <p>{entry.distance_walked}m</p>
              </div>
            </div>
            <p>{entry.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LastWalks;
