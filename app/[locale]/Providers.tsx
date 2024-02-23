"use client";

import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

interface Props {
  locale: "en" | "pt";
  messages: AbstractIntlMessages | undefined;
  children: ReactNode;
}
function Providers({ locale, messages, children }: Props) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={"America/Sao_Paulo"}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <Toaster />
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}

export default Providers;
