"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

import { PlusSvg } from "@/assets";
import Pegas from "./Pegas";
import TextField from "../ui/TextField";
import TextArea from "../ui/TextArea";
import Header from "./Header";
import { transformTimeStringToSeconds } from "@/utils/helperFunctions";
import Checkbox from "../ui/Checkbox";
import SuccessAnimation from "./SuccessAnimation";
import PrimaryButton from "../PrimaryButton";

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
  closeModal: () => void;
  highlineId: string;
  highlineDistance: number;
}

function Modal({ closeModal, highlineId, highlineDistance }: Props) {
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
    return supabase.from("role").insert([
      {
        name: formData.instagram,
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
  });

  const onSubmit = (formData: FormSchema) => {
    mutate(formData);
  };

  const onError = (e: unknown) => {
    console.log("Error");
    console.log(e);
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 bg-gray-700 bg-opacity-50">
      <div className="relative mx-4 p-4 w-full max-w-2xl h-5/6 overflow-y-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        {isSuccess ? (
          <SuccessAnimation closeModal={closeModal} />
        ) : (
          <>
            <Header closeModal={closeModal} />
            <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                  label="Comentário"
                  placeholder="Boa choosen 🤘🆑 Conta pra gente como foi ese rolê, o que achou da fita, da conexão..."
                  registerFunction={register("comment")}
                />

                <PrimaryButton
                  label="Registrar"
                  icon={<PlusSvg />}
                  loading={isLoading}
                />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
