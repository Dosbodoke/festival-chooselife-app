import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { getHighline } from "@/app/actions/getHighline";
import HighlineImage from "@/components/HighlineImage";
import { RegistryEntry } from "@/components/RegistryEntry";
import Tabs from "@/components/tabs/Tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FavoriteHighline } from "../_components/FavoriteHighline";
import GoBack from "./_components/GoBack";
import { HighlineHeader } from "./_components/HighlineHeader";

export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const { data: highlines } = await getHighline({ id });
  if (!highlines || highlines.length === 0) return notFound();
  const highline = highlines[0];

  return {
    title: highline.name,
    description: highline.description,
  };
}

export default async function Highline({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: highlines } = await getHighline({ id });
  if (!highlines || highlines.length === 0) return notFound();
  const highline = highlines[0];

  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden">
      <GoBack />
      <Card className="mx-auto flex w-full max-w-xl flex-col overflow-hidden">
        <div className="relative h-48 w-full">
          <HighlineImage coverImageId={highline.cover_image} />
          <FavoriteHighline
            id={highline.id}
            isFavorite={highline.is_favorite}
          />
        </div>
        <HighlineHeader highline={highline} />
        <CardContent>
          <Tabs highline={highline} />
        </CardContent>
      </Card>
    </div>
  );
}
