import { cookies } from "next/headers";

import { useSupabaseServer } from "@/utils/supabase/server";

import { Highline } from "./Highline";

export async function HighlineList({
  searchValue,
}: {
  searchValue: string | null;
}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profileId = "";
  if (user?.user_metadata["username"]) {
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", user.user_metadata["username"])
      .single();
    profileId = data?.id || "";
  }

  const { data } = await supabase
    .from("highline")
    .select("*, favorite_highline(profile_id)")
    .ilike("name", `%${searchValue || ""}%`);

  const highlines =
    data?.map((high) => ({
      ...high,
      is_favorite: !!high.favorite_highline.find(
        (fav) => fav.profile_id === profileId
      ),
    })) ?? [];

  // const { data: highlines } = await supabase
  // .from("highline")
  // .select("*, favorite_highlines")
  // .eq("favorite_highlines.profile_id", profileId)
  // .ilike("name", `%${searchValue}%`)
  // .limit(10)

  return (
    <section className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {highlines !== null && highlines.length > 0
        ? highlines.map((highline) => (
            <Highline key={highline.id} highline={highline} />
          ))
        : null}
    </section>
  );
}
