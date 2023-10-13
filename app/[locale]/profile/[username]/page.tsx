import { Metadata } from "next";

import supabase from "@/utils/supabase";

import GoBack from "./_components/GoBack";
import LastWalks from "./_components/LastWalks";
import Stats from "./_components/Stats";
import UserHeader from "./_components/UserHeader";
import UserNotFound from "./_components/UserNotFound";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile",
};

export default async function Profile({
  params: { username },
}: {
  params: { username: string };
}) {
  const { data, error } = await supabase
    .rpc("profile_stats", {
      username: `@${username}`,
    })
    .maybeSingle();

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

  if (!data || Object.values(data).every((value) => value === null)) {
    return (
      <div className="mx-auto max-w-screen-md">
        <UserNotFound username={username} />
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-screen-md space-y-4 rounded-lg px-2 pb-2 pt-0 md:space-y-6 md:pt-8">
      <GoBack />
      <UserHeader username={username} />
      <Stats
        total_cadenas={data.total_cadenas || 0}
        total_distance_walked={data.total_distance_walked || 0}
        total_full_lines={data.total_full_lines || 0}
      />
      <LastWalks entries={entries} />
    </div>
  );
}
