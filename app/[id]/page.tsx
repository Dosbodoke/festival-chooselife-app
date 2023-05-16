import Image from "next/image";
import supabase from "@/utils/supabase";

import Tabs from "@/components/tabs/Tabs";

export async function generateStaticParams() {
  const { data: highlines } = await supabase.from("highline").select("id");
  return highlines ?? [];
}

export default async function Highline({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: highline } = await supabase
    .from("highline")
    .select()
    .match({ id })
    .single();

  if (!highline) return null;

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-1 items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
      <div className="flex min-h-[32rem] w-full max-w-screen-md flex-wrap-reverse rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 w-full px-2 lg:mb-0 lg:w-1/2 lg:py-6 lg:pr-10">
          <h1 className="my-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {highline.name}
          </h1>
          <Tabs
            tabs={[
              {
                id: "info",
                label: "Informações",
              },
              {
                id: "reviews",
                label: "Reviews",
              },
              {
                id: "ranking",
                label: "Ranking",
              },
            ]}
            highline={highline}
          />
        </div>
        <div className="relative h-64 w-full rounded lg:h-auto lg:w-1/2">
          <Image
            src="https://dummyimage.com/400x400"
            alt="highline"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
