import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getHighline } from "@/app/actions/getHighline";
import CreateHighline from "@/components/CreateHighline";

import HighlineList from "./_components/HighlineList";
import Search from "./_components/search";

export default async function Home({
  params: { locale },
  searchParams,
}: {
  params: { locale: "en" | "pt" };
  searchParams: { [key: string]: string | undefined };
}) {
  const searchValue = searchParams["q"] || "";
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["highlines", { searchValue }],
    queryFn: ({ pageParam }) => getHighline({ pageParam, searchValue }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextCursor,
    pages: 3,
  });

  return (
    <div className="relative mx-2 max-w-screen-xl space-y-4 md:mx-auto">
      <Search />
      <CreateHighline />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HighlineList />
      </HydrationBoundary>
    </div>
  );
}
