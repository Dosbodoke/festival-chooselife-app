import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { useMessages } from "next-intl";

import Footer from "@/components/Footer";
import NavBar from "@/components/layout/navbar";
import { locales } from "@/navigation";

import UsernameDialog from "./_components/UsernameDialog";
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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: "en" | "pt" };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();
  const messages = useMessages();

  return (
    // suppressHydrationWarning because of `next-themes`
    // refer to https://github.com/pacocoursey/next-themes#with-app
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`min-h-screen bg-gray-50 dark:bg-gray-900 md:px-0 ${inter.variable} font-sans`}
      >
        <Providers locale={locale} messages={messages}>
          <div className="flex h-full min-h-screen flex-col">
            <NavBar />
            <main className="container mx-auto flex-1">
              <UsernameDialog />
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
