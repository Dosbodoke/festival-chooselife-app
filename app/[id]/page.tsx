import Image from "next/image";
import supabase from "@/utils/supabase";

import Tabs from "@/components/tabs/Tabs";
import RegistryEntry from "@/components/RegistryEntry";
import HighlineImage from "@/components/HighlineImage";

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
    <div className="relative mx-auto w-full h-full max-w-screen-md">
      <div className="rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        <div className="w-full relative h-64 md:h-96 rounded">
          <HighlineImage coverImageId={highline.cover_image} />
        </div>
        <div className="px-2 pb-4 md:px-4 md:pb-6 h-full w-full">
          <h1 className="my-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {highline.name}
          </h1>
          <RegistryEntry
            highlineId={highline.id}
            highlineDistace={highline.lenght}
          />
          <Tabs
            tabs={[
              {
                id: "info",
                label: "Informações",
              },
              {
                id: "reviews",
                label: "Reviews",
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
