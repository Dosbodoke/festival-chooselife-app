"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import supabase, { type Tables } from "@/utils/supabase";

import { transformSecondsToTimeString } from "@/utils/helperFunctions";

interface Props {
  highline: Tables["highline"]["Row"];
}

function Ranking({ highline }: Props) {
  const [roles, setRoles] = useState<Tables["role"]["Row"][]>([]);

  useEffect(() => {
    async function fetchRoles() {
      const { data } = await supabase
        .from("role")
        .select()
        .match({ highline_id: highline.id })
        .order("crossing_time", { ascending: true });
      if (data) setRoles(data);
    }

    fetchRoles();
  }, [highline]);

  console.log(roles);

  return (
    <div className="w-full rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Speedline
        </h5>
        {/* <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a> */}
      </div>

      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {roles.map((role) => (
            <li key={role.id} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                {/* <div className="flex-shrink-0"></div> */}
                <div className="min-w-0 flex-1">
                  <Link
                    href={`https://www.instagram.com/${role.name.replace(
                      "@",
                      ""
                    )}/`}
                    target="_blank"
                    className="truncate text-sm font-medium text-blue-700 dark:text-blue-500"
                  >
                    {role.name}
                  </Link>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {transformSecondsToTimeString(role.crossing_time)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Ranking;
