"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Database } from "@/utils/database.types";

const formSchema = z.object({
  username: z.string(),
  displayName: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function UsernameDialog() {
  const t = useTranslations("usernameDialog");
  const supabase = createClientComponentClient<Database>();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      // TODO: When user signUp with Google, prefill name from user_metadata `full_name`
      displayName: "",
    },
  });

  async function onSubmit(data: FormSchema) {
    const { data: userData } = await supabase.auth.updateUser({
      data,
    });
    if (userData.user) {
      await supabase
        .from("profiles")
        .update({ username: data.username })
        .eq("id", userData.user.id);
      setOpen(false);
    }
  }

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // If the user is logged in and do not have an username show the modal requesting it
      if (user && !user.user_metadata["username"]) {
        setOpen(true);
      }
    }
    getUser();
  }, [supabase.auth]);

  return (
    <Dialog open={open}>
      <DialogContent className="left-[50%] top-[50%] h-max translate-x-[-50%] translate-y-[-50%] grid-flow-row auto-rows-max rounded-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
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
