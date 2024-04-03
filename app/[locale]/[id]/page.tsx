import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { getHighline } from "@/app/actions/getHighline";
import CreateHighline from "@/components/CreateHighline";

import GoBack from "./_components/GoBack";
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

  const queryClient = new QueryClient();

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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["highline", id],
    queryFn: () => getHighline({ id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto w-full max-w-xl overflow-hidden">
        <GoBack />
        <HighlineCard id={id} />
      </div>
      <CreateHighline
        mapIsOpen={false}
        location={searchParams["location"] || null}
      />
    </HydrationBoundary>
  );
}
