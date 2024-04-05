import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { getHighline } from "@/app/actions/getHighline";
import CreateHighline from "@/components/CreateHighline";
import { getQueryClient } from "@/lib/query";

import HighlineCard from "./_components/HighlineCard";

export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const queryClient = getQueryClient();

  const { data: highlines } = await queryClient.fetchQuery({
    queryKey: ["highline", id],
    queryFn: () => getHighline({ id }),
  });
  if (!highlines || highlines.length === 0) return notFound();
  const highline = highlines[0];

  return {
    title: highline.name,
    description: highline.description,
  };
}

export default async function Highline({
  params: { id },
  searchParams,
}: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["highline", id],
    queryFn: () => getHighline({ id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto w-full max-w-xl overflow-hidden">
        <HighlineCard id={id} />
      </div>
      <CreateHighline
        mapIsOpen={false}
        location={searchParams["location"] || null}
      />
    </HydrationBoundary>
  );
}
