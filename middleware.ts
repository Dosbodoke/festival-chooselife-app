import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { locales } from "./navigation";
import { Database } from "./utils/database.types";

export default async function middleware(req: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale: "pt",
    localePrefix: "as-needed",
  });
  const res = handleI18nRouting(req);

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });
  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  return res;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
