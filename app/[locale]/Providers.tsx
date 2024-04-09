"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useSearchParams } from "next/navigation";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { getQueryClient } from "@/lib/query";

interface Props {
  locale: "en" | "pt";
  messages: AbstractIntlMessages | undefined;
  children: ReactNode;
}

function Providers({ locale, messages, children }: Props) {
  const searchParams = useSearchParams();
  const queryClient = getQueryClient();
  const now = new Date();

  const forcedThemeFromSearchParams =
    searchParams.get("view") === "map" ? "light" : undefined;

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        now={now}
        timeZone="America/Sao_Paulo"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          forcedTheme={forcedThemeFromSearchParams}
        >
          <Toaster />
          <SpeedInsights />
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default Providers;
