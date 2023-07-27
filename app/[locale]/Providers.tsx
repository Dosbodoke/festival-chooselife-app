"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

import { ReactQueryProvider } from "@/components/ReactQueryProvider";

interface Props {
  locale: "en" | "pt";
  messages: AbstractIntlMessages;
  children: ReactNode;
}
function Providers({ locale, messages, children }: Props) {
  return (
    <ReactQueryProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}

export default Providers;
