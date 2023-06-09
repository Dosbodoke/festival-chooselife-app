import { UseFormRegisterReturn } from "react-hook-form";

import Radio from "../ui/Radio";
import TextField from "../ui/TextField";

type InputProps = {
  registerFunction: UseFormRegisterReturn;
  errorMessage?: string;
  touched?: boolean;
  isDirty?: boolean;
};

interface Props {
  radio: InputProps;
  time: InputProps;
  distance: InputProps;
}

function Pegas({ radio, time, distance }: Props) {
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

export default Pegas;
