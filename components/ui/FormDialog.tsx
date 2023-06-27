import React, { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Player } from "@lottiefiles/react-lottie-player";

import succesAnimation from "@/assets/success-animation.json";
import Button from "./Button";

type DialogContentProps = {
  children: ReactNode;
};

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ children, ...props }: DialogContentProps, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-80" />
    <DialogPrimitive.Content
      {...props}
      ref={forwardedRef}
      className="fixed left-[50%] top-[50%] flex max-h-[85vh] w-11/12 max-w-md translate-x-[-50%] translate-y-[-50%] flex-col rounded-xl border border-gray-600 bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dark:bg-gray-800"
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DialogContent.displayName = "DialogContent";

export const Dialog = DialogPrimitive.Root;

interface DialogTriggerProps {
  label: string;
}
export const DialogTrigger = ({ label }: DialogTriggerProps) => (
  <DialogPrimitive.Trigger asChild>
    <Button label={label} widthFit />
  </DialogPrimitive.Trigger>
);

interface HeaderProps {
  title: string;
  description: string;
}
export const DialogHeader = ({ title, description }: HeaderProps) => (
  <header className="mb-4 border-b pb-4 dark:border-gray-600 sm:mb-5">
    <DialogPrimitive.Close
      className="absolute right-4 top-3"
      aria-label="Close"
    >
      <Cross1Icon className="h-5 w-5" />
    </DialogPrimitive.Close>
    <DialogPrimitive.Title className="text-lg font-semibold text-gray-900 dark:text-white">
      {title}
    </DialogPrimitive.Title>
    <DialogPrimitive.Description>{description}</DialogPrimitive.Description>
  </header>
);

type FormContentProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
};

export const FormContent = React.forwardRef<HTMLFormElement, FormContentProps>(
  ({ children, ...props }: FormContentProps, forwardedRef) => (
    <form
      ref={forwardedRef}
      {...props}
      className="scrollbar relative space-y-6 overflow-y-auto pb-4"
    >
      {children}
    </form>
  )
);

FormContent.displayName = "FormContent";

interface SuccessProps {
  message: string;
  button: ReactNode;
}
export function SuccessAnimation({ message, button }: SuccessProps) {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">BOA CHOOSEN</h1>
      <span className="block text-center"> 🆑 🆑 🆑 🆑 🆑</span>
      <p className="mt-3 text-center text-lg">{message}</p>
      <Player
        src={succesAnimation}
        className="h-max w-full"
        autoplay
        keepLastFrame
      />
      {button}
    </div>
  );
}
