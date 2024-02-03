import { cookies } from "next/headers";

import Highline from "@/components/Highline";
import { useSupabaseServer } from "@/utils/supabase/server";

export async function HighlineList({
  searchValue,
}: {
  searchValue: string | null;
}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const highlines = searchValue
    ? (
        await supabase
          .from("highline")
          .select("*")
          .ilike("name", `%${searchValue}%`)
      ).data
    : (await supabase.from("highline").select("*").limit(10)).data;

  return (
    <section className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
      {highlines && highlines?.length > 0
        ? highlines.map((highline) => (
            <Highline key={highline.id} highline={highline} />
          ))
        : null}
    </section>
  );
}
