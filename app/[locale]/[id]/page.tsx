import { unstable_setRequestLocale } from "next-intl/server";

import HighlineImage from "@/components/HighlineImage";
import RegistryEntry from "@/components/RegistryEntry";
import Tabs from "@/components/tabs/Tabs";
import supabase from "@/utils/supabase";

import GoBack from "./_components/GoBack";

export const dynamic = "force-dynamic";

export default async function Highline({
  params: { locale, id },
}: {
  params: { locale: "en" | "pt"; id: string };
}) {
  unstable_setRequestLocale(locale);
  const { data: highline } = await supabase
    .from("highline")
    .select()
    .match({ id })
    .single();

  if (!highline) return null;

  return (
    <div className="relative mx-auto max-w-screen-md space-y-2">
      <GoBack />
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
          <Tabs highline={highline} />
        </div>
      </div>
    </div>
  );
}
