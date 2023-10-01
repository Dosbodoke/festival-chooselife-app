import { Metadata } from "next";

import supabase from "@/utils/supabase-server";

import LastWalks from "./_components/LastWalks";
import Stats from "./_components/Stats";
import UserHeader from "./_components/UserHeader";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile",
};

export default async function Profile({
  params: { username },
}: {
  params: { username: string };
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .rpc("profile_stats", {
      username: `@${username}`,
    })
    .maybeSingle();

  if (!data || Object.values(data).every((value) => value === null)) {
    return <UserHeader username={username} />;
  }

  return (
    <div className="relative mx-auto h-full w-full max-w-screen-md flex-1 space-y-4 rounded-lg px-2 pb-2 pt-0 md:space-y-6 md:pt-8">
      <UserHeader username={username} />
      <Stats
        total_cadenas={data.total_cadenas || 0}
        total_distance_walked={data.total_distance_walked || 0}
        total_full_lines={data.total_full_lines || 0}
      />
      <LastWalks username={username} />
    </div>
  );
}
