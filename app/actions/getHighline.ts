"use server";

import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database } from "@/utils/supabase/database.types";

export const getHighline = async ({
  pageParam,
  searchValue,
  pageSize,
}: {
  pageParam: number;
  searchValue: string;
  pageSize: number;
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("highline")
    .select("*, favorite_highline(profile_id)")
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1)
    .ilike("name", `%${searchValue || ""}%`);

  return {
    data: data?.map((high) => ({
      ...high,
      is_favorite: !!high.favorite_highline.find(
        (fav) => fav.profile_id === user?.id
      ),
    })),
  };
};
