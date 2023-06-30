import HighlineSearch from "@/components/HighlineSearch";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Festival Chooselife",
  description: "Aplicativo de Highline do Festival Chooselife",
  applicationName: "Festival Chooselife",
  appleWebApp: {
    capable: true,
    title: "Festival Chooselife",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#FFFFFF",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  manifest: "/manifest.json",
  keywords: ["highline", "chooselife"],
};

export default function Home() {
  return (
    <main className="container mx-auto ">
      <HighlineSearch />
    </main>
  );
}
