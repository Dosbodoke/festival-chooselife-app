import { Player } from "@lottiefiles/react-lottie-player";
import PrimaryButton from "../PrimaryButton";

interface Props {
  closeModal: () => void;
}

function SuccessAnimation({ closeModal }: Props) {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">BOA CHOOSEN</h1>
      <span className="block text-center"> 🆑 🆑 🆑 🆑 🆑</span>
      <p className="text-center text-lg mt-3">
        Seu rolê está registrado e será usado para calcular as suas estatística
        no festival.
      </p>
      <Player
        src="https://assets2.lottiefiles.com/datafiles/jXqHQIXI6oO6V47/data.json"
        className="w-full h-max"
        autoplay
        keepLastFrame
      />
      <PrimaryButton label="fechar" onClick={() => closeModal()} />
    </div>
  );
}

export default SuccessAnimation;
