"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useRouter } from "@/navigation";
import useSupabaseBrowser from "@/utils/supabase/client";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "minLength")
    .refine((val) => val.startsWith("@"), {
      message: "startWith@",
    }),
  displayName: z.string().min(3, "minLength"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function UsernameDialog() {
  const supabase = useSupabaseBrowser();

  const t = useTranslations("usernameDialog");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      displayName: "",
    },
  });

  async function onSubmit(data: FormSchema) {
    if (user === null) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        username: data.username,
        name: data.displayName,
        // TODO: This is triggered only on the username setup, if user change profile picture lately it will not be updated on `profiles` table
        profile_picture: user.user_metadata["picture"] || "",
      })
      .eq("id", user.id);

    // Since `username` is unique, the error 235050 will be raised when you try to add a username
    // that already exists
    if (error?.code === "23505") {
      form.setError("username", {
        message: "alreadyExits",
      });
      return;
    }

    if (!error) {
      const {
        data: { user: userData },
      } = await supabase.auth.updateUser({
        data,
      });
      await supabase.auth.refreshSession();
      setUser(userData);
      router.push(`/profile/${data.username.replace("@", "")}`);
    }
  }

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      form.setValue(
        "displayName",
        session?.user.user_metadata["full_name"] || ""
      );
    }
    getUser();
  }, [supabase.auth, form]);

  return (
    // If the user is logged in and do not have an username show the modal requesting it
    <Dialog open={user ? !user.user_metadata["username"] : false}>
      <DialogContent className="left-[50%] top-[50%] h-max translate-x-[-50%] translate-y-[-50%] grid-flow-row auto-rows-max rounded-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
          <Alert variant="info" className="break-before-all text-left">
            <AlertDescription>{t("alert")}</AlertDescription>
          </Alert>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.username.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("fields.username.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    translatedMessage={
                      form.formState.errors.username?.message
                        ? t(
                            // @ts-ignore: Workaround for error translations
                            `fields.username.errors.${form.formState.errors.username.message}`
                          )
                        : undefined
                    }
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.displayName.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("fields.displayName.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    translatedMessage={
                      form.formState.errors.displayName?.message
                        ? t(
                            // @ts-ignore: Workaround for error translations
                            `fields.displayName.errors.${form.formState.errors.displayName.message}`
                          )
                        : undefined
                    }
                  />
                </FormItem>
              )}
            />
            <Button type="submit" label={t("submit")} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
