"use client";

import { useEffect, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import supabase from "@/utils/supabase";
import { transformTimeStringToSeconds } from "@/utils/helperFunctions";

import { PlusSvg } from "@/assets";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  FormContent,
  SuccessAnimation,
} from "./ui/FormDialog";
import Checkbox from "./ui/Checkbox";
import TextField from "./ui/TextField";
import TextArea from "./ui/TextArea";
import Button from "./ui/Button";
import Radio from "./ui/Radio";

const formSchema = z.object({
  instagram: z
    .string()
    .startsWith("@", "O usuário deve começar com @")
    .min(3, "Deve conter ao menos 3 caracteres"),
  isNotHighliner: z.boolean(),
  pegas: z
    .object({
      type: z
        .enum(["entry", "crossing", "cadena", "fullLine"] as const)
        .nullable(),
      distance: z
        .number({
          required_error: "Insira quantos metros você andou",
          invalid_type_error: "Insira um número",
        })
        .positive("Distância não pode ser negativa"),
      time: z
        .string()
        .refine(
          (value) => /^([0-9]|[0-5][0-9]):[0-5][0-9]$/.test(value),
          "Inválido, use o formato mm:ss"
        ),
    })
    .optional(),
  comment: z.string().nullable(),
  witness: z
    .string()
    .refine(
      (value) => /^(?=.*@[^,\s]+,.*@[^,\s]+).*$/.test(value),
      "Inválido, coloque o instagram de duas pessoas, separado por vírgula."
    )
    .optional(),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  highlineId: string;
  highlineDistance: number;
}

const CreateHighline = ({ highlineId, highlineDistance }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, watch, setValue } =
    useForm<FormSchema>({
      mode: "onTouched",
      resolver: zodResolver(formSchema),
      shouldUnregister: true,
      defaultValues: {
        isNotHighliner: false,
      },
    });

  const watchPegaType = watch("pegas.type");
  const watchIsNotHighliner = watch("isNotHighliner");

  useEffect(() => {
    if (watchPegaType === "entry") {
      setValue("pegas.distance", 0);
      return;
    }
    // If any other radio type, the person has walked the entire
    if (watchPegaType) {
      setValue("pegas.distance", highlineDistance * 2);
    }
  }, [watchPegaType, setValue, highlineDistance]);

  const createRecord = async (formData: FormSchema) => {
    return supabase.from("entry").insert([
      {
        instagram: formData.instagram.toLowerCase(),
        crossing_time: formData.pegas
          ? transformTimeStringToSeconds(formData.pegas.time)
          : null,
        highline_id: highlineId,
        is_cadena: formData.pegas?.type === "cadena",
        is_full_line: formData.pegas?.type === "fullLine",
        comment: formData.comment,
        witness: formData.witness?.replace(" ", "").split(","),
        is_highliner: !formData.isNotHighliner,
        distance_walked: formData.pegas?.distance,
      },
    ]);
  };

  const { mutate, isLoading, error, isSuccess } = useMutation(createRecord, {
    onError: (e) => {
      console.log("Error");
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entry"] });
    },
  });

  const onSubmit = (formData: FormSchema) => {
    mutate(formData);
  };

  const onError = (e: unknown) => {
    console.log("Error");
    console.log(e);
  };

  function closeDialog() {
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger label="Registrar Rolê" />
      <DialogContent>
        {isSuccess ? (
          <SuccessAnimation
            message="Seu rolê está registrado e será usado para calcular as suas estatística no festival."
            button={<Button label="fechar" onClick={closeDialog} />}
          />
        ) : (
          <>
            <DialogHeader
              title="Registrar rolê"
              description="Registre como foi o seu rolê e tenha acesso as suas estatísticas."
            />
            <FormContent onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="space-y-2">
                <TextField
                  id="name-text"
                  label="Instagram"
                  placeholder="Seu @ do instragram"
                  inputType="text"
                  registerFunction={register("instagram")}
                  errorMessage={formState.errors.instagram?.message}
                  isDirty={formState.dirtyFields.instagram}
                  touched={formState.touchedFields.instagram}
                />

                <Checkbox
                  id="isHighliner"
                  label="Não sou highliner"
                  helperText="Veio dar um rolê para curtir esse paraíso 🌎? deixe registrado também"
                  registerFunction={register("isNotHighliner")}
                />

                {watchIsNotHighliner === false && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        Pegas
                      </label>
                      {/* <p className="text-gray-600 text-sm">
                Caso tenha dado mais de um role clique em{" "}
                <span className="font-medium">registrar mais uma volta</span>{" "}
                para registrar todos.
              </p> */}

                      <Pegas
                        radio={{ registerFunction: register(`pegas.type`) }}
                        distance={{
                          registerFunction: register(`pegas.distance`, {
                            valueAsNumber: true,
                          }),
                          errorMessage:
                            formState.errors.pegas?.distance?.message,
                          isDirty: formState.dirtyFields.pegas?.distance,
                          touched: formState.touchedFields.pegas?.distance,
                        }}
                        time={{
                          registerFunction: register(`pegas.time`),
                          errorMessage: formState.errors.pegas?.time?.message,
                          isDirty: formState.dirtyFields.pegas?.time,
                          touched: formState.touchedFields.pegas?.time,
                        }}
                      />

                      {/* <button
                onClick={(e) => {
                  e.preventDefault();
                  append(emptyPega);
                }}
                className="w-full text-center text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                registrar mais uma volta
              </button> */}
                    </div>
                    <TextField
                      id="witness"
                      label="Testemunhas"
                      placeholder="Ao menos duas testemunhas, exemplo: @festivalchooselife, @juangsandrade"
                      inputType="text"
                      registerFunction={register("witness")}
                      errorMessage={formState.errors.witness?.message}
                      isDirty={formState.dirtyFields.witness}
                      touched={formState.touchedFields.witness}
                    />
                  </>
                )}

                <TextArea
                  id="comment"
                  label="Comentário"
                  placeholder="Boa choosen 🤘🆑 Conta pra gente como foi ese rolê, o que achou da fita, da conexão..."
                  registerFunction={register("comment")}
                />

                <Button
                  type="submit"
                  label="Registrar"
                  icon={<PlusSvg />}
                  loading={isLoading}
                />
              </div>
            </FormContent>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateHighline;

type InputProps = {
  registerFunction: UseFormRegisterReturn;
  errorMessage?: string;
  touched?: boolean;
  isDirty?: boolean;
};

interface PegasProps {
  radio: InputProps;
  time: InputProps;
  distance: InputProps;
}

function Pegas({ radio, time, distance }: PegasProps) {
  return (
    <div className="space-y-3 border bg-gray-50 p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700">
      <Radio
        id="entry"
        label="Pega"
        value="entry"
        helperText="Curtiu um rolêzão na fita"
        registerFunction={radio.registerFunction}
      />
      <Radio
        id="crossing"
        label="Travessia"
        value="crossing"
        helperText="Você atravessou e voltou a fita inteira, porém com quedas."
        registerFunction={radio.registerFunction}
      />
      <Radio
        id="cadena"
        label="Cadena"
        value="cadena"
        helperText="Você dropou no começo e foi até o final da fita sem cair."
        registerFunction={radio.registerFunction}
      />
      <Radio
        id="fullLine"
        label="Full line"
        value="fullLine"
        helperText="Você cadenou a ida e a volta, sem descer na virada."
        registerFunction={radio.registerFunction}
      />
      <TextField
        id="distance"
        label="Distância caminhada"
        placeholder="Quantos metros você andou"
        inputType="number"
        registerFunction={distance.registerFunction}
        errorMessage={distance.errorMessage}
        isDirty={distance.isDirty}
        touched={distance.touched}
      />
      <TextField
        id="time"
        label="Tempo"
        placeholder="Seu melhor tempo para o ranking do Speedline nesta via, exemplo: 2:59"
        inputType="text"
        registerFunction={time.registerFunction}
        errorMessage={time.errorMessage}
        isDirty={time.isDirty}
        touched={time.touched}
      />
    </div>
  );
}
