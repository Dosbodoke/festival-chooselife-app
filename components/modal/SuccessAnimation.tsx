import { Player } from "@lottiefiles/react-lottie-player";

import succesAnimation from "@/assets/success-animation.json";
import PrimaryButton from "../PrimaryButton";

interface Props {
  closeModal: () => void;
}

function SuccessAnimation({ closeModal }: Props) {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">BOA CHOOSEN</h1>
      <span className="block text-center"> 🆑 🆑 🆑 🆑 🆑</span>
      <p className="mt-3 text-center text-lg">
        Seu rolê está registrado e será usado para calcular as suas estatística
        no festival.
      </p>
      <Player
        src={succesAnimation}
        className="h-max w-full"
        autoplay
        keepLastFrame
      />
      <PrimaryButton label="fechar" onClick={() => closeModal()} />
    </div>
  );
}

export default SuccessAnimation;
