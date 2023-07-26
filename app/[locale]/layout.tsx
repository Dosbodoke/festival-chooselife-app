import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { notFound } from "next/navigation";

import Providers from "./Providers";
import Footer from "@/components/Footer";
import NavBar from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Festival Chooselife",
  description: "Site oficial do festival Chooselife",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: "en" | "pt" };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    // suppressHydrationWarning because of `next-themes`
    // refer to https://github.com/pacocoursey/next-themes#with-app
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`min-h-screen bg-white px-2 text-gray-700 dark:bg-gray-900 dark:text-gray-400 md:px-0 ${inter.className}`}
      >
        <Providers locale={locale} messages={messages}>
          <>
            <NavBar />
            {children}
            <Footer />
          </>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
