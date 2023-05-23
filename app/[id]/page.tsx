import Image from "next/image";
import supabase from "@/utils/supabase";

import Tabs from "@/components/tabs/Tabs";
import RegistryEntry from "@/components/RegistryEntry";

export async function generateStaticParams() {
  const { data: highlines } = await supabase.from("highline").select("id");
  return highlines ?? [];
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

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
    <div className="relative mx-auto w-full h-full max-w-screen-md">
      <div className="rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        <div className="w-full relative h-64 md:h-96 rounded">
          <Image
            src="https://dummyimage.com/400x400"
            alt="highline"
            fill
            priority
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            className="object-cover object-center"
          />
        </div>
        <div className="px-2 pb-4 md:px-4 md:pb-6 h-full w-full">
          <h1 className="my-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {highline.name}
          </h1>
          <RegistryEntry
            highlineId={highline.id}
            highlineDistace={highline.lenght}
          />
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
    </div>
  );
}
