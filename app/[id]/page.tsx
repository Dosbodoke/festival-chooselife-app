import Link from "next/link";

import supabase from "@/utils/supabase";
import Tabs from "@/components/tabs/Tabs";
import RegistryEntry from "@/components/RegistryEntry";
import HighlineImage from "@/components/HighlineImage";
import { ArrowLongLeftIcon } from "@/assets";

export async function generateStaticParams() {
  const { data: highlines } = await supabase.from("highline").select("id");
  return highlines ?? [];
}

export default async function Highline({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: highline } = await supabase
    .from("highline")
    .select()
    .match({ id })
    .single();

  if (!highline) return null;

  return (
    <div className="relative mx-auto h-full w-full max-w-screen-md">
      <Link href={"/"} className="my-4 flex gap-1">
        <ArrowLongLeftIcon className="inline-block h-6 w-6" />
        Ver todos os highlines
      </Link>
      <div className="rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        <div className="relative h-64 w-full rounded md:h-96">
          <HighlineImage coverImageId={highline.cover_image} />
        </div>
        <div className="h-full w-full space-y-2 px-2 pb-4 md:px-4 md:pb-6">
          <h1 className="my-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {highline.name}
          </h1>
          <RegistryEntry
            highlineId={highline.id}
            highlineDistance={highline.lenght}
          />
          <Tabs
            tabs={[
              {
                id: "info",
                label: "Informações",
              },
              {
                id: "reviews",
                label: "Comentários",
              },
              {
                id: "ranking",
                label: "Ranking",
              },
            ]}
            highline={highline}
          />
        </div>
      </div>
    </div>
  );
}
