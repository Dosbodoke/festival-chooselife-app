import Image from "next/image";
import supabase from "@/utils/supabase";

import Tabs from "@/components/tabs/Tabs";
import Modal from "@/components/Modal";

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
    <div className="mx-auto my-8 md:my-16 w-full max-w-screen-md rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
      <div className="w-full relative h-64 md:h-96 rounded">
        <Image
          src="https://dummyimage.com/400x400"
          alt="highline"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="px-2 pb-4 md:px-4 md:pb-6 h-full w-full">
        <h1 className="my-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {highline.name}
        </h1>
        <Modal />
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
    </div>
  );
}
