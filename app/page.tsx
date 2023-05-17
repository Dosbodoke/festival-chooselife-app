import { Inter } from "next/font/google";

import supabase from "@/utils/supabase";
import Highline from "../components/Highline";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const { data: highlines } = await supabase.from("highline").select("*");

  return (
    <section className="mx-auto max-w-screen-xl flex-wrap gap-4 px-4 py-8 md:flex lg:px-6 lg:py-16">
      <div className="mb-4 md:mb-0 min-w-[384px] flex-1">
        <h2
          className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          style={inter.style}
        >
          SETOR VEREDÃO
        </h2>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Setor da cachoeira veredinha. Tem acesso para o Highline mais alto do
          festival e também à cachoeira pra curtir aquela vibe
        </p>
      </div>
      <div className="flex flex-[1_0_0%] flex-col items-center space-y-9 ">
        {highlines &&
          highlines.map((highline) => (
            <Highline key={highline.id} highline={highline} />
          ))}
      </div>
    </section>
  );
}
