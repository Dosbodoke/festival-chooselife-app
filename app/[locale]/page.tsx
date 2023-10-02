import Highline from "@/components/Highline";
import supabase from "@/utils/supabase";

import Search from "./_components/search";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as { [key: string]: string };
  const highlines = searchValue
    ? (
        await supabase
          .from("highline")
          .select("*")
          .ilike("name", `%${searchValue}%`)
      ).data
    : (await supabase.from("highline").select("*").limit(10)).data;

  return (
    <main className="container mx-auto mt-4 space-y-12 ">
      <Search />
      <section className="flex flex-wrap justify-center gap-6">
        {highlines && highlines?.length > 0
          ? highlines.map((highline) => (
              <Highline key={highline.id} highline={highline} />
            ))
          : null}
      </section>
    </main>
  );
}
