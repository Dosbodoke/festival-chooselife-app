import { ChevronRightIcon } from "@radix-ui/react-icons";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { EnduranceIcon, SpeedlineIcon } from "@/assets";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Database } from "@/utils/database.types";
import { transformSecondsToTimeString } from "@/utils/helperFunctions";

import FormattedDate from "./FormattedDate";

export const dynamic = "force-dynamic";

interface Props {
  username: string;
}

export default async function LastWalks({ username }: Props) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

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

  return <LastWalksContent entries={entries || []} />;
}

interface ContentProps {
  entries:
    | (Database["public"]["Tables"]["entry"]["Row"] & {
        highline: Database["public"]["Tables"]["highline"]["Row"] | null;
      })[];
}
function LastWalksContent({ entries }: ContentProps) {
  const t = useTranslations("profile.lastWalks");

  return (
    <div className="max-w-screen-md rounded-xl border border-gray-200 bg-white px-2 py-4 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-xl font-semibold dark:text-white">{t("title")}</h3>
      <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <li
              key={entry.id}
              className="overflow-hidden py-4 first:pt-0 last:pb-0"
            >
              <Popover>
                <PopoverTrigger className="mb-0.5 truncate text-base font-semibold leading-none text-blue-500 dark:text-blue-400">
                  {entry.highline?.name}
                </PopoverTrigger>
                <PopoverContent
                  side="top"
                  className="max-h-96 overflow-auto p-0"
                >
                  <div className="space-y-2 p-4">
                    <p>{entry.highline?.description}</p>
                    <div>
                      <p>
                        {t("popover.height")}: {entry.highline?.height}m
                      </p>
                      <p>
                        {t("popover.length")}: {entry.highline?.lenght}m
                      </p>
                    </div>
                    <Link
                      href={`/${entry.highline?.id}`}
                      className="flex items-center font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-600"
                    >
                      {t("popover.buttonLabel")}{" "}
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
          ))
        ) : (
          <p>{t("empty")}</p>
        )}
      </ul>
    </div>
  );
}

export function LastWalksSkeleton() {
  return (
    <div className="max-w-screen-md rounded-xl border border-gray-200 bg-white px-2 py-4 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
      <div className="animate-pulse">
        <h3 className="h-4 w-36 rounded-full bg-gray-200 dark:bg-gray-700"></h3>
        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from(Array(2)).map((v) => (
            <li key={v} className="py-4 first:pt-0 last:pb-0">
              <div className="mb-2 h-4 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-3 flex gap-4 truncate text-sm font-normal dark:text-white">
                <div className="flex items-end gap-1">
                  <div className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-2 w-8 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="flex items-end gap-1">
                  <div className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-2 w-8 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
              <div></div>
              <div className="mb-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
