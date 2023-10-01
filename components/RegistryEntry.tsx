"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PlusSvg } from "@/assets";
import { transformTimeStringToSeconds } from "@/utils/helperFunctions";
import supabase from "@/utils/supabase";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/Form";
import { Input } from "./ui/Input";
import NumberPicker from "./ui/NumberPicker";
import { TextArea } from "./ui/TextArea";

const formSchema = z.object({
  instagram: z
    .string()
    .startsWith("@", "O usuário deve começar com @")
    .min(3, "Deve conter ao menos 3 caracteres"),
  cadenas: z.number().nonnegative(),
  full_lines: z.number().nonnegative(),
  distance: z.coerce
    .number({
      required_error: "Insira quantos metros você andou",
      invalid_type_error: "Insira um número",
    })
    .positive("Distância não pode ser negativa"),
  time: z
    .string()
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        value === "" ||
        /^([0-9]|[0-5][0-9]):[0-5][0-9]$/.test(value),
      "Inválido, use o formato mm:ss"
    ),
  witness: z
    .string()
    .refine(
      (w) => /^(?=.*@[^,\s]+,.*@[^,\s]+).*$/.test(w),
      "Inválido, coloque o instagram de duas pessoas, separado por vírgula."
    ),
  comment: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  highlineId: string;
  highlineDistance: number;
}

const CreateHighline = ({ highlineId, highlineDistance }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const t = useTranslations("highline.registry");
  const queryClient = useQueryClient();

  const entryForm = useForm<FormSchema>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
    defaultValues: {
      instagram: "",
      cadenas: 0,
      full_lines: 0,
      distance: 0,
      time: "",
      witness: "",
      comment: "",
    },
  });

  const watchCadenas = entryForm.watch("cadenas");
  const watchFullLines = entryForm.watch("full_lines");

  useEffect(() => {
    const totalLeaps = watchCadenas + watchFullLines * 2;
    const totalDistance = highlineDistance * totalLeaps;
    if (totalDistance) entryForm.setValue("distance", totalDistance);
  }, [watchCadenas, watchFullLines, highlineDistance, entryForm]);

  const createRecord = async (formData: FormSchema) => {
    const response = await supabase.from("entry").insert([
      {
        highline_id: highlineId,
        instagram: formData.instagram.toLowerCase(),
        cadenas: formData.cadenas,
        full_lines: formData.full_lines,
        distance_walked: formData.distance,
        crossing_time: formData.time
          ? transformTimeStringToSeconds(formData.time)
          : null,
        comment: formData.comment,
        witness: formData.witness?.replace(" ", "").split(","),
        is_highliner: true, // TODO: Remove this field from database
      },
    ]);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  };

  const formMutation = useMutation(createRecord, {
    onError: (e) => {
      console.log("Error");
      console.log(e);
    },
    onSuccess: (data) => {
      console.log({ data });
      console.log("Success");
      queryClient.invalidateQueries({ queryKey: ["entry"] });
    },
  });

  const onSubmit = (formData: FormSchema) => {
    formMutation.mutate(formData);
  };

  const onError = (e: unknown) => {
    console.log("Error");
    console.log(e);
  };

  function closeDialog() {
    setDialogOpen(false);
    formMutation.reset();
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen} modal>
      <DialogTrigger asChild>
        <Button label={t("trigger")} widthFit />
      </DialogTrigger>

      {formMutation.isSuccess ? (
        <DialogContent className="h-fit">
          <SuccessAnimation
            header={t("success.header")}
            message={t("success.message")}
            button={<Button label="fechar" onClick={closeDialog} />}
          />
        </DialogContent>
      ) : (
        <DialogContent className="h-5/6">
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
          </DialogHeader>
          <Form {...entryForm}>
            <form
              onSubmit={entryForm.handleSubmit(onSubmit, onError)}
              className="space-y-6"
            >
              <FormField
                control={entryForm.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("instagram.placeholder")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={entryForm.control}
                name="cadenas"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between gap-4">
                      <div>
                        <FormLabel>{t("cadenas.label")}</FormLabel>
                        <FormDescription>
                          {t("cadenas.description")}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <NumberPicker
                          value={field.value}
                          onChange={field.onChange}
                          className="self-end"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={entryForm.control}
                name="full_lines"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between gap-4">
                      <div>
                        <FormLabel>Full lines</FormLabel>
                        <FormDescription>
                          {t("fullLines.description")}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <NumberPicker
                          value={field.value}
                          onChange={field.onChange}
                          className="self-end"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={entryForm.control}
                name="distance"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel>{t("distance.label")}</FormLabel>
                      <FormDescription>
                        {t("distance.description")}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("distance.placeholder")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={entryForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel optional>Speedline</FormLabel>
                      <FormDescription>
                        {t("speedline.description")}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        placeholder={t("speedline.placeholder")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={entryForm.control}
                name="witness"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel>{t("witness.label")}</FormLabel>
                      <FormDescription>
                        {t("witness.description")}
                      </FormDescription>
                    </div>

                    <FormControl>
                      <Input
                        placeholder={t("witness.placeholder")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={entryForm.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel optional>{t("comment.label")}</FormLabel>
                    <FormControl>
                      <TextArea
                        {...field}
                        placeholder={t("comment.placeholder")}
                        rows={3}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                label={t("submit")}
                icon={<PlusSvg />}
                loading={formMutation.isLoading}
              />
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default CreateHighline;
