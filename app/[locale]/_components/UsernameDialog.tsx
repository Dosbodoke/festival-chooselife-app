"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
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
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Database } from "@/utils/database.types";

const formSchema = z.object({
  username: z
    .string()
    .min(3)
    .refine((val) => val.startsWith("@"), {
      message: "Username must start with a @",
    }),
  displayName: z.string().min(3),
});

type FormSchema = z.infer<typeof formSchema>;

export default function UsernameDialog() {
  const t = useTranslations("usernameDialog");
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      // TODO: When user signUp with Google, prefill name from user_metadata `full_name`
      displayName: "",
    },
  });

  async function onSubmit(data: FormSchema) {
    if (user === null) return;

    const { error } = await supabase
      .from("profiles")
      .update({ username: data.username, name: data.displayName })
      .eq("id", user.id);

    // Since `username` is unique, the error 235050 will be raised when you try to add a username
    // that already exists
    if (error?.code === "23505") {
      form.setError("username", {
        message: t("fields.username.errors.alreadyExits"),
      });
      return;
    }

    if (!error) {
      const {
        data: { user: userData },
      } = await supabase.auth.updateUser({
        data,
      });
      setUser(userData);
    }
  }

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // If the user is logged in and do not have an username show the modal requesting it
      setUser(session?.user || null);
    }
    getUser();
  }, [supabase.auth]);

  return (
    <Dialog open={user ? !user.user_metadata["username"] : false}>
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
                  <FormMessage />
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
                  <FormMessage />
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
