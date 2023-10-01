import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { useLocale, useMessages } from "next-intl";

import Footer from "@/components/Footer";
import NavBar from "@/components/layout/navbar";

import Providers from "./Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
        className={`min-h-screen bg-gray-50 dark:bg-gray-900 md:px-0 ${inter.variable}`}
      >
        <Providers locale={locale} messages={messages}>
          <div className="flex h-full min-h-screen flex-col">
            <NavBar />
            {children}
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
