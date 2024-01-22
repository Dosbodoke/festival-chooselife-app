import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { Database } from "@/utils/database.types";

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
  return {
    title: `Perfil de @${params.username}`,
    description: "User profile",
  };
}

export default async function Profile({ params: { username } }: Props) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

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
    <div className="mx-auto max-w-screen-md space-y-4 rounded-lg px-2 pb-2 pt-0 md:space-y-6 md:pt-8">
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
