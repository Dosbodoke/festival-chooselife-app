"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GoogleIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import useSupabaseBrowser from "@/utils/supabase/client";

const formSchema = z.object({
  email: z.string().email(),
});

type FormSchema = z.infer<typeof formSchema>;

function SignUp() {
  const supabase = useSupabaseBrowser();
  const t = useTranslations();
  const [step, setStep] = useState<"initial" | "email" | "inbox">("initial");
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?redirect_to=${location.href}`,
      },
    });
  }

  async function onSubmit(data: FormSchema) {
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${location.origin}/auth/callback?redirect_to=${location.href}`,
      },
    });

    if (!error) {
      setStep("inbox");
    }
  }

  const dialogContentInitial = () => (
    <>
      <DialogHeader>
        <DialogTitle>{t("signUp.initial.title")}</DialogTitle>
        <DialogDescription>{t("signUp.initial.description")}</DialogDescription>
      </DialogHeader>
      <Button onClick={signInWithGoogle}>
        <GoogleIcon className="-ml-1 mr-2 h-5 w-5" />
        {t("signUp.initial.google")}
      </Button>
      <Button variant="link" onClick={() => setStep("email")}>
        {t("signUp.email.buttonLabel")}
      </Button>
    </>
  );

  const dialogContentEmail = () => (
    <>
      <DialogHeader>
        <DialogTitle>{t("signUp.email.title")}</DialogTitle>
        <DialogDescription>{t("signUp.email.description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("signUp.email.placeholder")}
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage translatedMessage={t("signUp.email.invalid")} />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("initial")}
            >
              {t("signUp.email.back")}
            </Button>
            <Button type="submit">{t("signUp.email.submit")}</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );

  const dialogContentInbox = () => (
    <>
      <DialogHeader>
        <DialogTitle>{t("signUp.inbox.title")}</DialogTitle>
        <DialogDescription>
          {t("signUp.inbox.preDescription")}
          <span className="font-bold"> {form.getValues("email")} </span>
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
        <Button size="default">{t("signUp.trigger")}</Button>
      </DialogTrigger>
      <DialogContent className="left-[50%] top-[50%] h-max translate-x-[-50%] translate-y-[-50%] grid-flow-row auto-rows-max rounded-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        {dialogContent[step]()}
      </DialogContent>
    </Dialog>
  );
}

export default SignUp;
