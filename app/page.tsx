import { Inter } from "next/font/google";

import supabase from "@/utils/supabase";
import Highline from "../components/Highline";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  // Had to manually declare all fields on highline because highline(*) didn't worked
  const { data: sectors } = await supabase.from("sector").select(
    `
      *,
      highline (
        id,
        created_at,
        name,
        height,
        lenght, 
        main_webbing,
        backup_webbing,
        description, 
        sector_id,
        cover_image
        )
      `
  );

  return (
    <div className="mx-auto max-w-screen-xl">
      {sectors?.map((sector) => {
        let highlines = null;
        if (sector.highline) {
          highlines = highlines = Array.isArray(sector.highline)
            ? sector.highline
            : [sector.highline];
        }
        return (
          <section
            key={sector.id}
            className="flex-wrap gap-4 px-4 py-8 md:flex lg:px-6 lg:py-16"
          >
            <div className="mb-4 md:mb-0 min-w-[384px] flex-1">
              <h2
                className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                style={inter.style}
              >
                {sector.name}
              </h2>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {sector.description}
              </p>
            </div>
            <div className="flex flex-[1_0_0%] flex-col items-center space-y-9 ">
              {highlines?.map((highline) => (
                <Highline key={highline.id} highline={highline} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
