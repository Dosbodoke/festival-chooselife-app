"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import supabase, {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "@/utils/supabase";

import { PlusSvg } from "@/assets";
import { SuccessAnimation } from "./animations/SuccessAnimation";
import { Form, FormField, FormControl, FormItem, FormLabel } from "./ui/Form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import TextField from "./ui/TextField";
import { TextArea } from "./ui/TextArea";
import Dropzone from "./ui/Dropzone";
import Button from "./ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(3, "Deve conter ao menos 3 caracteres"),
  height: z.coerce
    .number({
      required_error: "Insira a altura do Highline",
      invalid_type_error: "Insira um número",
    })
    .positive("Altura não pode ser negativa"),
  lenght: z.coerce
    .number({
      required_error: "Insira o comprimento do Highline",
      invalid_type_error: "Insira um número",
    })
    .positive("Comprimento não pode ser negativo"),
  main_webbing: z.string().min(3, "Deve conter ao menos 3 caracteres"),
  backup_webbing: z.string().min(3, "Deve conter ao menos 3 caracteres"),
  description: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine(
      (files) => (files?.length > 0 ? files[0]?.size <= MAX_FILE_SIZE : true),
      `Tamanho máximo do arquivo é 6MB`
    )
    .refine(
      (files) =>
        files?.length > 0
          ? ACCEPTED_IMAGE_TYPES.includes(files[0]?.type)
          : true,
      "Formatos aceitos são: .jpg, .jpeg, .png e .webp"
    ),
});

type FormSchema = z.infer<typeof formSchema>;

const CreateHighline = () => {
  const t = useTranslations("home.newHighline");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newHighlineUUID, setNewHighlineUUID] = useState<string | null>(null);

  const highlineForm = useForm<FormSchema>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const createHighline = async ({
    name,
    height,
    lenght,
    main_webbing,
    backup_webbing,
    description,
    image,
  }: FormSchema) => {
    let imageName: string | null = null;
    if (image && image.length > 0) {
      const file = image[0];
      const extension = file.type.split("/")[1];
      imageName = `${uuidv4()}.${extension}`;
      // Create a new Blob from the file
      const blob = new Blob([await file.arrayBuffer()], { type: file.type });
      // Upload the blob
      const { error } = await supabase.storage
        .from("images")
        .upload(imageName, blob);
      if (error) throw new Error("Couldn't upload the image");
    }
    const { data } = await supabase
      .from("highline")
      .insert([
        {
          name,
          height,
          lenght,
          main_webbing,
          backup_webbing,
          description,
          cover_image: imageName,
        },
      ])
      .select();
    if (!data || data.length !== 1) {
      throw new Error("Error when creating the highline");
    }
    return data[0].id;
  };

  const { mutate, isLoading, error, isSuccess } = useMutation(createHighline, {
    onError: (e) => {
      console.log("Error");
      console.log(e);
    },
    onSuccess: (data) => {
      setNewHighlineUUID(data);
    },
  });

  const onSubmit = (formData: FormSchema) => {
    mutate(formData);
  };

  const onError = (e: unknown) => {
    console.log("Error");
    console.log(e);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen} modal>
      <DialogTrigger asChild>
        <Button label={t("trigger")} widthFit />
      </DialogTrigger>
      {isSuccess ? (
        <DialogContent className="h-fit">
          <SuccessAnimation
            header={t("success.header")}
            message={t("success.message")}
            button={
              <Link
                href={`/${newHighlineUUID}`}
                className="block w-full rounded-lg border border-blue-600 bg-blue-700 px-4 py-2 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {t("successLink")}
              </Link>
            }
          />
        </DialogContent>
      ) : (
        <DialogContent className="h-5/6">
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
          </DialogHeader>
          <Form {...highlineForm}>
            <form
              onSubmit={highlineForm.handleSubmit(onSubmit, onError)}
              className="space-y-6"
            >
              <FormField
                control={highlineForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name.label")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("name.placeholder")} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={highlineForm.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("height.label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("height.placeholder")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={highlineForm.control}
                name="lenght"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("length.label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("length.placeholder")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={highlineForm.control}
                name="main_webbing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("mainWebbing.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("mainWebbing.placeholder")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={highlineForm.control}
                name="backup_webbing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("backupWebbing.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("backupWebbing.placeholder")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={highlineForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("highlineDescription.label")}</FormLabel>
                    <FormControl>
                      <TextArea
                        {...field}
                        placeholder={t("highlineDescription.placeholder")}
                        rows={3}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={highlineForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Dropzone
                        id="image"
                        label={t("image.label")}
                        file={field.value}
                        errorMessage={highlineForm.formState.errors.image?.message?.toString()}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            // Call the provided onChange with the actual File object
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                label={t("submit")}
                icon={<PlusSvg />}
                loading={isLoading}
              />
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default CreateHighline;
