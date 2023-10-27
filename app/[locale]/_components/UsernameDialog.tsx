"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Database } from "@/utils/database.types";

const formSchema = z.object({
  username: z.string(),
  displayName: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  hasUsername: boolean;
}
export default function UsernameDialog({ hasUsername }: Props) {
  const supabase = createClientComponentClient<Database>();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      displayName: "",
    },
  });

  async function onSubmit(data: FormSchema) {
    const { data: userData } = await supabase.auth.updateUser({
      data,
    });
    if (userData.user) {
      await supabase
        .from("profiles")
        .update({ username: data.username })
        .eq("id", userData.user.id);
      setOpen(false);
    }
  }

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // If the user is logged in and do not have an username show the modal requesting it
      if (user && !user.user_metadata["username"]) {
        setOpen(true);
      }
    }
    getUser();
  }, [supabase.auth]);

  return (
    <Dialog open={open}>
      <DialogContent className="left-[50%] top-[50%] h-max translate-x-[-50%] translate-y-[-50%] grid-flow-row auto-rows-max rounded-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <DialogHeader>
          <DialogTitle>Bem vindo ao APP CHOOSELIFE 👋</DialogTitle>
          <DialogDescription>
            Nos só precimaos de alguns detalhes para terminar de criar sua
            conta.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de usuário</FormLabel>
                  <FormControl>
                    <Input placeholder={"Seu @usuário único"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu perfil</FormLabel>
                  <FormControl>
                    <Input placeholder={"Seu nome completo"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              label={"Continuar"}
              // icon={<PlusSvg />}
              // loading={formMutation.isLoading}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
