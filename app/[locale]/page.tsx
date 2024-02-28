import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getHighline } from "@/app/actions/getHighline";
import CreateHighline from "@/components/CreateHighline";

import { HighlineList, pageSize } from "./_components/HighlineList";
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
    queryFn: ({ pageParam }) =>
      getHighline({ pageParam, searchValue, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return lastPage.data?.length === pageSize ? nextPage : undefined;
    },
    pages: 2,
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
