"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, ButtonLoading } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
  profile,
}: {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}) {
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
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">{t("trigger")}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="scrollbar mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-[10px] p-4">
          <DrawerHeader>
            <DrawerTitle>{t("title")}</DrawerTitle>
          </DrawerHeader>
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
              <DrawerFooter className="p-0">
                {profileMutation.isLoading ? (
                  <ButtonLoading />
                ) : (
                  <>
                    <Button type="submit">{t("fields.submit")}</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </>
                )}
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
