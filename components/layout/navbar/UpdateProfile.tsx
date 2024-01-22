"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { useRouter } from "@/navigation";
import useSupabaseBrowser from "@/utils/supabase/client";
import { Database } from "@/utils/supabase/database.types";

const formSchema = z.object({
  name: z.string().min(3, "Deve conter ao menos 3 caracteres"),
  description: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function UpdateProfile({
  user,
  profile,
}: {
  user: User | null;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}) {
  const [open, setOpen] = useState(false);

  const t = useTranslations("updateProfile");
  const router = useRouter();
  const supabase = useSupabaseBrowser();
  const profileForm = useForm<FormSchema>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name || "",
      description: profile.description || "",
    },
  });

  async function updateProfile(formData: FormSchema) {
    const { error } = await supabase
      .from("profiles")
      .update({
        description: formData.description,
        name: formData.name,
      })
      .eq("id", profile.id);

    await supabase.auth.updateUser({
      data: {
        displayName: formData.name,
      },
    });
    if (error) throw error;
  }

  const profileMutation = useMutation(updateProfile, {
    onSuccess: () => {
      router.refresh();
      setOpen(false);
    },
    onError: (e) => {
      profileForm.setError("root", {
        message: "Error on upadting the profile, try again later!",
      });
    },
  });

  const onSubmit = (data: FormSchema) => {
    profileMutation.mutate(data);
  };

  const onError = (e: unknown) => {
    console.log("Invalid form");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (o) {
          profileForm.reset();
        }
        setOpen(o);
      }}
    >
      <DialogTrigger asChild>
        <Button color="secondary" widthFit label={t("trigger")} />
      </DialogTrigger>
      <DialogContent className="h-fit">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <p className={"text-sm font-medium text-red-700 dark:text-red-500"}>
            {profileForm.formState.errors.root?.message}
          </p>
        </DialogHeader>
        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <FormField
              control={profileForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.name.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("fields.name.placeholder")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.description.label")}</FormLabel>
                  <FormControl>
                    <TextArea
                      {...field}
                      placeholder={t("fields.description.placeholder")}
                      rows={3}
                      className="resize-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              label={t("fields.submit")}
              loading={profileMutation.isLoading}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
