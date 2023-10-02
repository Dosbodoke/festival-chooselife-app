import createMiddleware from "next-intl/middleware";

import { locales } from "./navigation";

export default createMiddleware({
  locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "pt",
  localePrefix: "as-needed",
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
