"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import supabase from "@/utils/supabase";
import { transformTimeStringToSeconds } from "@/utils/helperFunctions";

import { PlusSvg } from "@/assets";
import { SuccessAnimation } from "./animations/SuccessAnimation";
import { TextArea } from "./ui/TextArea";
import Button from "./ui/Button";
import NumberPicker from "./ui/NumberPicker";
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
        value == null ||
        value === "" ||
        /^([0-9]|[0-5][0-9]):[0-5][0-9]$/.test(value),
      "Inválido, use o formato mm:ss"
    ),
  witness: z
    .string()
    .refine(
      (value) => /^(?=.*@[^,\s]+,.*@[^,\s]+).*$/.test(value),
      "Inválido, coloque o instagram de duas pessoas, separado por vírgula."
    )
    .optional(),
  comment: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  highlineId: string;
  highlineDistance: number;
}

const CreateHighline = ({ highlineId, highlineDistance }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const entryForm = useForm<FormSchema>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
    defaultValues: {
      cadenas: 0,
      full_lines: 0,
      distance: 0,
      comment: "",
    },
  });

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
        <Button label="Registrar Rolê" widthFit />
      </DialogTrigger>

      {formMutation.isSuccess ? (
        <DialogContent className="h-fit">
          <SuccessAnimation
            message="Seu rolê está registrado e será usado para calcular as suas estatística no festival."
            button={<Button label="fechar" onClick={closeDialog} />}
          />
        </DialogContent>
      ) : (
        <DialogContent className="h-5/6">
          <DialogHeader>
            <DialogTitle>Registrar rolê</DialogTitle>
            <DialogDescription>
              Registre como foi o seu rolê e tenha acesso as suas estatísticas.
            </DialogDescription>
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
                      <Input placeholder="Seu @ do instragram" {...field} />
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
                        <FormLabel>Cadenas</FormLabel>
                        <FormDescription>
                          Você dropou no começo e foi até o final da fita sem
                          cair.
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
                          Você cadenou a ida e a volta, sem descer na virada.
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
                      <FormLabel>Distância caminhada</FormLabel>
                      <FormDescription>
                        Quantos metros você andou no total
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="exemplo: 150"
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
                        Seu melhor tempo para o ranking do Speedline nesta via
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input placeholder="Exemplo: 2:59" {...field} />
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
                      <FormLabel>Testemunhas</FormLabel>
                      <FormDescription>
                        Insira o instagram de duas pessoas, separado por
                        vírgula.
                      </FormDescription>
                    </div>

                    <FormControl>
                      <Input
                        placeholder="exemplo: @festivalchooselife, @testemunha2"
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
                    <FormLabel optional>Comentário</FormLabel>
                    <FormControl>
                      <TextArea
                        {...field}
                        placeholder="Boa choosen 🤘🆑 Conta pra gente como foi ese rolê, o que achou da fita, da conexão..."
                        rows={3}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                label="Registrar"
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
