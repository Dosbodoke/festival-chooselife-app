import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useMessages } from "next-intl";

import Footer from "@/components/Footer";
import NavBar from "@/components/layout/navbar";
import { locales } from "@/navigation";

import { PromptPwa } from "./_components/PromptPwa";
import UsernameDialog from "./_components/UsernameDialog";
import Providers from "./Providers";

const APP_NAME = "Chooselife";
const APP_DEFAULT_TITLE = "Chooselife";
const APP_TITLE_TEMPLATE = "%s - Chooselife";
const APP_DESCRIPTION = "O aplicativo feito para o Highliner";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
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
      <body className={`min-h-screen md:px-0 ${GeistSans.variable} font-sans`}>
        <Providers locale={locale} messages={messages}>
          <div className="relative flex h-full min-h-screen flex-col">
            <PromptPwa />
            <NavBar />
            <main className="flex-1">
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
