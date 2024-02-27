"use server";

import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database } from "@/utils/supabase/database.types";

// export const getHighline = async (offset: number, limit: number) => {
export const getHighline = async ({
  pageParam,
  searchValue,
}: {
  pageParam: number;
  searchValue: string;
}) => {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  let profileId = "";

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    .range(pageParam, pageParam + 5)
    .ilike("name", `%${searchValue || ""}%`);

  return { data, nextCursor: pageParam + 5 };
};
