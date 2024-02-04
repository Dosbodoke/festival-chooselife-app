import type { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { useSupabaseServer } from "@/utils/supabase/server";

import GoBack from "./_components/GoBack";
import LastWalks, { LastWalksSkeleton } from "./_components/LastWalks";
import Stats from "./_components/Stats";
import UserHeader from "./_components/UserHeader";
import UserNotFound from "./_components/UserNotFound";

export const dynamic = "force-dynamic";

type Props = {
  params: { locale: string; username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations("profileMetadata");
  return {
    title: t("title", { username: `@${params.username}` }),
    description: t("description"),
  };
}

export default async function Profile({ params: { username } }: Props) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", `@${username}`)
    .single();

  const { data } = await supabase
    .rpc("profile_stats", {
      username: `@${username}`,
    })
    .single();

  if (
    !profile &&
    (!data || Object.values(data).every((value) => value === null))
  ) {
    return (
      <div className="mx-auto max-w-screen-md">
        <UserNotFound username={username} />
      </div>
    );
  }

  return (
    <div className="mx-2 max-w-screen-md space-y-4 pt-0 md:mx-auto md:space-y-6 md:pt-8">
      <GoBack />
      <UserHeader user={user} profile={profile} username={username} />
      <Stats
        total_cadenas={data?.total_cadenas || 0}
        total_distance_walked={data?.total_distance_walked || 0}
        total_full_lines={data?.total_full_lines || 0}
      />
      <Suspense fallback={<LastWalksSkeleton />}>
        <LastWalks username={username} />
      </Suspense>
    </div>
  );
}
