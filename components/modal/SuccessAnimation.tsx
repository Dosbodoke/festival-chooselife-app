import { Player } from "@lottiefiles/react-lottie-player";
import PrimaryButton from "../PrimaryButton";

interface Props {
  closeModal: () => void;
}

function SuccessAnimation({ closeModal }: Props) {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-20">
        🆑 BOA CHOOSEN 🆑
      </h1>
      <p className="text-center text-lg mt-3">
        Seu rolê está registrado e será usado para calcular as suas estatística
        no festival.
      </p>
      <Player
        src="https://assets2.lottiefiles.com/datafiles/jXqHQIXI6oO6V47/data.json"
        className="w-96 h-96"
        autoplay
        keepLastFrame
      />
      <PrimaryButton label="fechar" onClick={() => closeModal()} />
    </div>
  );
}

export default SuccessAnimation;
