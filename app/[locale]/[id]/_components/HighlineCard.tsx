"use client";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { getHighline } from "@/app/actions/getHighline";
import CreateHighline from "@/components/CreateHighline";
import HighlineImage from "@/components/HighlineImage";
import Tabs from "@/components/tabs/Tabs";
import { Card, CardContent } from "@/components/ui/card";

import { FavoriteHighline } from "../../_components/FavoriteHighline";
import Loading from "../loading";
import GoBack from "./GoBack";
import { HighlineHeader } from "./HighlineHeader";

function HighlineCard({ id }: { id: string }) {
  const { data: highlines, isLoading } = useQuery({
    queryKey: ["highline", id],
    queryFn: async () => await getHighline({ id }),
  });

  if (isLoading) return <Loading></Loading>;

  if (!highlines?.data || highlines.data.length === 0) return notFound();
  const highline = highlines.data[0];

  return (
    <Card className="mx-auto flex w-full max-w-xl flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <HighlineImage coverImageId={highline.cover_image} />
        <FavoriteHighline id={highline.id} isFavorite={highline.is_favorite} />
      </div>
      <HighlineHeader highline={highline} />
      <CardContent>
        <Tabs highline={highline} />
      </CardContent>
    </Card>
  );
}

export default HighlineCard;
