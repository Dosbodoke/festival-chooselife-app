import { cookies } from "next/headers";

import Highline from "@/components/Highline";
import { useSupabaseServer } from "@/utils/supabase/server";

export async function HighlineList({
  searchValue,
}: {
  searchValue: string | undefined;
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
    <section className="flex flex-wrap justify-center gap-6">
      {highlines && highlines?.length > 0
        ? highlines.map((highline) => (
            <Highline key={highline.id} highline={highline} />
          ))
        : null}
    </section>
  );
}
