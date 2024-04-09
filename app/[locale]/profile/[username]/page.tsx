import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import UpdateProfile from "@/components/layout/navbar/UpdateProfile";
import { useSupabaseServer } from "@/utils/supabase/server";

import LastWalks, { LastWalksSkeleton } from "./_components/LastWalks";
import Stats from "./_components/Stats";
import UserHeader from "./_components/UserHeader";
import UserNotFound from "./_components/UserNotFound";

export const dynamic = "force-dynamic";

type Props = {
  params: { locale: string; username: string };
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const t = await getTranslations("profileMetadata");
  return {
    title: t("title", { username: `@${params.username}` }),
    description: t("description"),
  };
}

export default async function Profile({
  params: { username },
  searchParams,
}: Props) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const result = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from("profiles")
      .select("*")
      .eq("username", `@${username}`)
      .single(),
    supabase
      .rpc("profile_stats", {
        username: `@${username}`,
      })
      .single(),
  ]);

  const user = result[0].data.user;
  const profile = result[1].data;
  const stats = result[2].data;

  if (
    !profile &&
    (!stats || Object.values(stats).every((value) => value === null))
  ) {
    return (
      <div className="mx-auto max-w-screen-md">
        <UserNotFound username={username} />
      </div>
    );
  }

  return (
    <div className="mx-2 max-w-screen-md space-y-4 pt-0 md:mx-auto md:space-y-6 md:pt-8">
      <div className="flex flex-row items-end justify-between">
        {profile && profile.id === user?.id ? (
          <UpdateProfile profile={profile} />
        ) : null}
      </div>
      <UserHeader profile={profile} username={username} />
      <Stats
        total_cadenas={stats?.total_cadenas || 0}
        total_distance_walked={stats?.total_distance_walked || 0}
        total_full_lines={stats?.total_full_lines || 0}
      />
      <Suspense fallback={<LastWalksSkeleton />}>
        <LastWalks username={username} year={searchParams["year"]} />
      </Suspense>
    </div>
  );
}
