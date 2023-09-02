"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/utils/database.types";

import { GoogleIcon } from "@/assets";
import Button from "@/components/ui/Button";

export default function GoogleAuthLogin() {
  const supabase = createClientComponentClient<Database>();

  async function handleSignInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Button
      label="Sign in with Google"
      icon={<GoogleIcon className="-ml-1 mr-2 h-5 w-5" />}
      variant="outlined"
      color="secondary"
      onClick={handleSignInWithGoogle}
    />
  );
}
