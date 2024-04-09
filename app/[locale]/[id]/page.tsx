import { notFound } from "next/navigation";
import { cache } from "react";

import { getHighline } from "@/app/actions/getHighline";
import CreateHighline from "@/components/CreateHighline";

import HighlineCard from "./_components/HighlineCard";

export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
};

type getProps = {
  id?: string;
  searchValue?: string;
  pageParam?: number;
  pageSize?: number;
};

const getHigh = cache(
  async ({ pageParam, searchValue, pageSize, id }: getProps) => {
    const result = await getHighline({ pageParam, searchValue, pageSize, id });
    return result.data;
  }
);

export default async function Highline({
  params: { id },
  searchParams,
}: Props) {
  const highlines = await getHigh({ id });

  if (!highlines || highlines.length === 0) return notFound();
  const highline = highlines[0];

  return (
    <>
      <div className="mx-auto w-full max-w-xl overflow-hidden">
        <HighlineCard highline={highline} />
      </div>
      <CreateHighline
        mapIsOpen={false}
        location={searchParams["location"] || null}
      />
    </>
  );
}
