"use server";

import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database, Tables } from "@/utils/supabase/database.types";

type Props = {
  id?: string;
  searchValue?: string;
  pageParam?: number;
  pageSize?: number;
};

export type Highline = Tables["highline"]["Row"] & {
  favorite_highline: Array<Tables["favorite_highline"]["Row"]>;
  is_favorite: boolean;
};

export const getHighline = async ({
  pageParam,
  searchValue,
  pageSize,
  id,
}: Props) => {
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

  let query = supabase
    .from("highline")
    .select("*, favorite_highline(profile_id)");

  if (id) {
    query = query.eq("id", id);
  }
  if (pageParam && pageSize) {
    query = query.range((pageParam - 1) * pageSize, pageParam * pageSize - 1);
  }
  if (searchValue) {
    query = query.ilike("name", `%${searchValue || ""}%`);
  }

  const { data } = await query;

  return {
    data: data?.map((high) => ({
      ...high,
      is_favorite: !!high.favorite_highline.find(
        (fav) => fav.profile_id === user?.id
      ),
    })),
  };
};
