import { Suspense } from "react";

import { HighlineList } from "./_components/HighlineList";
import { HighlineListSkeleton } from "./_components/HighlineListSkeleton";
import Search from "./_components/search";

export default async function Home({
  params: { locale },
  searchParams,
}: {
  params: { locale: "en" | "pt" };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="mt-2 space-y-6 px-2">
      <Search />
      <Suspense fallback={<HighlineListSkeleton />}>
        <HighlineList searchValue={searchParams["nameFilter"]} />
      </Suspense>
    </div>
  );
}
