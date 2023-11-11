// Refer to the following documentation for more context
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { Database } from "@/utils/database.types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirect_to");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(redirectTo || requestUrl.origin);
}
