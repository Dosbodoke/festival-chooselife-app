import { notFound } from "next/navigation";

import { getHighline } from "@/app/actions/getHighline";
import HighlineImage from "@/components/HighlineImage";
import { RegistryEntry } from "@/components/RegistryEntry";
import Tabs from "@/components/tabs/Tabs";

import { FavoriteHighline } from "../_components/FavoriteHighline";
import GoBack from "./_components/GoBack";

export const dynamic = "force-dynamic";

export default async function Highline({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: highline } = await getHighline({ id });

  if (!highline || highline.length === 0) return notFound();

  return (
    <div className="relative mx-2 max-w-screen-md space-y-2 md:mx-auto">
      <GoBack />
      <div className="rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        <div className="relative h-64 w-full rounded md:h-96">
          <HighlineImage coverImageId={highline[0].cover_image} />
          <FavoriteHighline
            id={highline[0].id}
            isFavorite={highline[0].is_favorite}
          />
        </div>
        <div className="h-full w-full space-y-2 px-2 pb-4 md:px-4 md:pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {highline[0].name}
          </h1>
          <RegistryEntry
            highlineId={highline[0].id}
            highlineDistance={highline[0].lenght}
          />
          <Tabs highline={highline[0]} />
        </div>
      </div>
    </div>
  );
}
