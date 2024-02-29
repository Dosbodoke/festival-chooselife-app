"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { useState } from "react";

import { Toaster } from "@/components/ui/sonner";

interface Props {
  locale: "en" | "pt";
  messages: AbstractIntlMessages | undefined;
  children: ReactNode;
}
function Providers({ locale, messages, children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={"America/Sao_Paulo"}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
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
