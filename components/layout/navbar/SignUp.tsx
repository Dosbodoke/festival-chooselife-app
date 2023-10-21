"use client";

import { useState } from "react";

import { GoogleIcon } from "@/assets";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import supabase from "@/utils/supabase";
import { useTranslations } from "next-intl";

function SignUp() {
  const t = useTranslations();
  const [withEmail, setWithEmail] = useState(false);

  async function handleSignInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button label={t("signUp.trigger")} widthFit size="sm" />
      </DialogTrigger>
      <DialogContent className="h-max grid-flow-row auto-rows-max">
        {withEmail ? (
          <>
            <DialogHeader>
              <DialogTitle>{t("signUp.email.title")}</DialogTitle>
              <DialogDescription>
                {t("signUp.email.description")}
              </DialogDescription>
            </DialogHeader>
            <div>
              <Input placeholder="Input your email" disabled />
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("signUp.title")}</DialogTitle>
              <DialogDescription>{t("signUp.description")}</DialogDescription>
            </DialogHeader>
            <Button
              label={t("signUp.google")}
              icon={<GoogleIcon className="-ml-1 mr-2 h-5 w-5" />}
              variant="outlined"
              color="secondary"
              onClick={handleSignInWithGoogle}
            />
            <button onClick={() => setWithEmail(true)}>
              {t("signUp.email.buttonLabel")}
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SignUp;
