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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  FormContent,
  SuccessAnimation,
} from "./ui/FormDialog";
import TextField from "./ui/TextField";
import TextArea from "./ui/TextArea";
import Dropzone from "./ui/Dropzone";
import Button from "./ui/Button";
import Link from "next/link";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3, "Deve conter ao menos 3 caracteres"),
  height: z
    .number({
      required_error: "Insira a altura do Highline",
      invalid_type_error: "Insira um número",
    })
    .positive("Altura não pode ser negativa"),
  lenght: z
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
  const [newHighlineUUID, setNewHighlineUUID] = useState<string | null>(null);

  const { register, handleSubmit, getValues, formState } = useForm<FormSchema>({
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
    <Dialog>
      <DialogTrigger label="Novo Highline" />
      <DialogContent>
        {isSuccess ? (
          <SuccessAnimation
            message="O Highline foi criado, agora é so registrar o seu rolê!"
            button={
              <Link
                href={`/${newHighlineUUID}`}
                className="block w-full rounded-lg border border-blue-600 bg-blue-700 px-4 py-2 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ver Highline
              </Link>
            }
          />
        ) : (
          <>
            <DialogHeader
              title="Registrar Highline"
              description="Adicione o seu Highline no aplicativo e tenha acesso ao histórico de rolês"
            />
            <FormContent onSubmit={handleSubmit(onSubmit, onError)}>
              <TextField
                id="name"
                label="Nome da via"
                placeholder="exemplo: Dedo de Jah"
                inputType="text"
                registerFunction={register("name")}
                errorMessage={formState.errors.name?.message}
                isDirty={formState.dirtyFields.name}
                touched={formState.touchedFields.name}
              />
              <TextField
                id="height"
                label="Altura"
                placeholder="Altura do Highline em metros"
                inputType="number"
                registerFunction={register("height", {
                  valueAsNumber: true,
                })}
                errorMessage={formState.errors.height?.message}
                isDirty={formState.dirtyFields.height}
                touched={formState.touchedFields.height}
              />
              <TextField
                id="length"
                label="Comprimento"
                placeholder="Comprimento do Highline em metros"
                inputType="number"
                registerFunction={register("lenght", {
                  valueAsNumber: true,
                })}
                errorMessage={formState.errors.lenght?.message}
                isDirty={formState.dirtyFields.lenght}
                touched={formState.touchedFields.lenght}
              />
              <TextField
                id="main_webbing"
                label="Fita principal"
                placeholder="exemplo: Sky 2 (Bera)"
                inputType="text"
                registerFunction={register("main_webbing")}
                errorMessage={formState.errors.main_webbing?.message}
                isDirty={formState.dirtyFields.main_webbing}
                touched={formState.touchedFields.main_webbing}
              />
              <TextField
                id="backup_webbing"
                label="Fita backup"
                placeholder="exemplo: Sky 2 (Bera) + Sky 3d (Bera)"
                inputType="text"
                registerFunction={register("backup_webbing")}
                errorMessage={formState.errors.backup_webbing?.message}
                isDirty={formState.dirtyFields.backup_webbing}
                touched={formState.touchedFields.backup_webbing}
              />
              <TextArea
                id="description"
                label="Descrição"
                placeholder="Fale um pouco sobre este Highline. Aqui é o lugar perfeito para dar informações de acesso, segurança, dica para montagem ou rolê, etc..."
                registerFunction={register("description")}
              />
              <Dropzone
                id="image"
                label="Clique para escolher a foto do Highline"
                file={getValues("image") ? getValues("image")[0] : undefined}
                registerFunction={register("image")}
                errorMessage={formState.errors.image?.message?.toString()}
              />

              <Button
                type="submit"
                label="Registrar"
                icon={<PlusSvg />}
                loading={isLoading}
              />
            </FormContent>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateHighline;
