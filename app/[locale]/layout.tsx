import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { notFound } from "next/navigation";
import { useLocale, useMessages } from "next-intl";

import Providers from "./Providers";
import Footer from "@/components/Footer";
import NavBar from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Festival Chooselife",
  description: "Site oficial do festival Chooselife",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: "en" | "pt" };
}) {
  const locale = useLocale();
  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  const messages = useMessages();

  return (
    // suppressHydrationWarning because of `next-themes`
    // refer to https://github.com/pacocoursey/next-themes#with-app
    <html lang={locale} suppressHydrationWarning>
      <body
        className="min-h-screen bg-gradient-to-b from-white via-transparent to-gray-300 dark:from-gray-900 dark:to-black md:px-0"
        style={inter.style}
      >
        <Providers locale={locale} messages={messages}>
          <main className="flex flex-col">
            {/* @ts-expect-error Server Component */}
            <NavBar />
            {children}
            <Footer />
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
