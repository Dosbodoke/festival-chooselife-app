import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

import succesAnimation from "@/assets/success-animation.json";

interface SuccessProps {
  header: string;
  message: string;
  button: React.ReactNode;
}
export function SuccessAnimation({ header, message, button }: SuccessProps) {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">{header}</h1>
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
