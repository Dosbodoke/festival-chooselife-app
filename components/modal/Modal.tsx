"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import supabase from "@/utils/supabase";

import { PlusSvg } from "@/assets";
import Pegas from "./Pegas";
import TextField from "../ui/TextField";
import TextArea from "../ui/TextArea";
import Header from "./Header";
import { transformTimeStringToSeconds } from "@/utils/helperFunctions";

const formSchema = z.object({
  instagram: z
    .string()
    .startsWith("@", "O usuário deve começar com @")
    .min(3, "Deve conter ao menos 3 caracteres"),
  pegas: z.object({
    type: z.enum(["cadena", "fullLine"] as const).nullable(),
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
  }),
  comment: z.string().nullable(),
  witness: z
    .string()
    .refine(
      (value) => /^(?=.*@[^,\s]+,.*@[^,\s]+).*$/.test(value),
      "Inválido, coloque o instagram de duas pessoas, separado por vírgula."
    ),
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
    });

  const watchPegaType = watch("pegas.type");

  useEffect(() => {
    if (watchPegaType === "cadena") {
      setValue("pegas.distance", highlineDistance);
    } else if (watchPegaType === "fullLine") {
      setValue("pegas.distance", highlineDistance * 2);
    }
  }, [watchPegaType, setValue, highlineDistance]);

  const onSubmit = async (formData: FormSchema) => {
    const { error, status } = await supabase.from("role").insert([
      {
        name: formData.instagram,
        crossing_time: transformTimeStringToSeconds(formData.pegas.time),
        highline_id: highlineId,
        is_cadena: formData.pegas.type === "cadena",
        comment: formData.comment,
        witness: formData.witness.replace(" ", "").split(","),
      },
    ]);
    if (status === 201) {
      closeModal();
    } else {
      console.log(error);
    }
  };

  const onError = (e: unknown) => {
    console.log("Error");
    console.log(e);
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 bg-gray-700 bg-opacity-50">
      <div className="relative mx-4 p-4 w-full max-w-2xl h-5/6 overflow-y-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
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

            <div className="space-y-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                  errorMessage: formState.errors.pegas?.distance?.message,
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

            <TextArea
              label="Comentário"
              placeholder="Boa choosen 🤘🤘. Conta pra gente como foi ese rolê, o que achou da fita, da conexão..."
              registerFunction={register("comment")}
            />
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

            <button
              type="submit"
              className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <PlusSvg />
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
