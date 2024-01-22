import { cookies } from "next/headers";

import Highline from "@/components/Highline";
import { useSupabaseServer } from "@/utils/supabase/server";

import Search from "./_components/search";

export const dynamic = "force-dynamic";

export default async function Home({
  params: { locale },
  searchParams,
}: {
  params: { locale: "en" | "pt" };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { q: searchValue } = searchParams as {
    [key: string]: string;
  };
  const highlines = searchValue
    ? (
        await supabase
          .from("highline")
          .select("*")
          .ilike("name", `%${searchValue}%`)
      ).data
    : (await supabase.from("highline").select("*").limit(10)).data;

  return (
    <div className="mt-2 space-y-6 px-2">
      <Search />
      <section className="flex flex-wrap justify-center gap-6">
        {highlines && highlines?.length > 0
          ? highlines.map((highline) => (
              <Highline key={highline.id} highline={highline} />
            ))
          : null}
      </section>
    </div>
  );
}
