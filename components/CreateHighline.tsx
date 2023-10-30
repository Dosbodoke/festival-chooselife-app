"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { PlusSvg } from "@/assets";
import { Link } from "@/navigation";
import supabase, {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "@/utils/supabase";

import { SuccessAnimation } from "./animations/SuccessAnimation";
import Button from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import Dropzone from "./ui/Dropzone";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/Form";
import { Input } from "./ui/Input";
import { TextArea } from "./ui/TextArea";

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
    defaultValues: {
      name: "",
      height: undefined,
      lenght: undefined,
      backup_webbing: "",
      main_webbing: "",
      image: "",
      description: "",
    },
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
    let imageID: string | null = null;
    if (image && image.length > 0) {
      const file = image[0];
      const extension = file.type.split("/")[1];
      imageID = `${uuidv4()}.${extension}`;
      // Create a new Blob from the file
      const blob = new Blob([await file.arrayBuffer()], { type: file.type });
      // Upload the blob
      const { error } = await supabase.storage
        .from("images")
        .upload(imageID, blob);
      if (error) throw new Error("Couldn't upload the image");
    }
    const { data, error } = await supabase
      .from("highline")
      .insert([
        {
          name,
          height,
          lenght,
          main_webbing,
          backup_webbing,
          description,
          cover_image: imageID,
        },
      ])
      .select();
    if (!data || data.length !== 1) {
      throw new Error("Error when creating the highline");
    }
    return data[0].id;
  };

  const { mutate, isLoading, isSuccess } = useMutation(createHighline, {
    onError: (e: Error) => {
      console.log(e.message);
    },
    onSuccess: (data) => {
      setNewHighlineUUID(data);
    },
  });

  const onSubmit = (formData: FormSchema) => {
    mutate(formData);
  };

  const onError = (e: unknown) => {
    console.log("Invalid form");
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
                        value={field.value || ""}
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
                        value={field.value || ""}
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
