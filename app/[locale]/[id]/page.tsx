import { notFound } from "next/navigation";
import { cache } from "react";

import { getHighline } from "@/app/actions/getHighline";

import HighlineCard from "./_components/HighlineCard";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const getHigh = cache(async ({ id }: { id: string }) => {
  const result = await getHighline({
    id: [id],
  });
  return result.data;
});

export default async function Highline(props: Props) {
  const params = await props.params;

  const {
    id
  } = params;

  const highlines = await getHigh({ id });

  if (!highlines || highlines.length === 0) return notFound();
  const highline = highlines[0];

  return <HighlineCard highline={highline} />;
}
