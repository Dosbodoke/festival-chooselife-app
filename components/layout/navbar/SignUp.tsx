"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { GoogleIcon } from "@/assets";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import supabase from "@/utils/supabase";

function SignUp() {
  const t = useTranslations();
  const [step, setStep] = useState<"initial" | "email" | "inbox">("initial");
  const [email, setEmail] = useState("");

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (!error) {
      setStep("inbox");
    }
  }

  const dialogContentInitial = () => (
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
        onClick={signInWithGoogle}
      />
      <button onClick={() => setStep("email")}>
        {t("signUp.email.buttonLabel")}
      </button>
    </>
  );

  const dialogContentEmail = () => (
    <>
      <DialogHeader>
        <DialogTitle>{t("signUp.email.title")}</DialogTitle>
        <DialogDescription>{t("signUp.email.description")}</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithEmail();
        }}
        className="space-y-4"
      >
        <div>
          <Input
            placeholder={t("signUp.email.placeholder")}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            label={t("signUp.email.back")}
            variant="outlined"
            color="secondary"
            widthFit
            onClick={() => setStep("initial")}
          />
          <Button type="submit" label={t("signUp.email.submit")} widthFit />
        </DialogFooter>
      </form>
    </>
  );

  const dialogContentInbox = () => (
    <>
      <DialogHeader>
        <DialogTitle>{t("signUp.inbox.title")}</DialogTitle>
        <DialogDescription>
          {t("signUp.inbox.preDescription")}
          <span className="font-bold"> {email} </span>
          {t("signUp.inbox.postDescription")}
        </DialogDescription>
      </DialogHeader>
    </>
  );

  const dialogContent = {
    initial: dialogContentInitial,
    email: dialogContentEmail,
    inbox: dialogContentInbox,
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setStep("initial");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button label={t("signUp.trigger")} widthFit size="sm" />
      </DialogTrigger>
      <DialogContent className="left-[50%] top-[50%] h-max translate-x-[-50%] translate-y-[-50%] grid-flow-row auto-rows-max rounded-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        {dialogContent[step]()}
      </DialogContent>
    </Dialog>
  );
}

export default SignUp;
