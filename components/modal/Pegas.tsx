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
    <div className="border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 shadow-sm p-4 space-y-3">
      <Radio
        id="entry"
        label="Entrada"
        value="entry"
        helperText="Você deu um rolê na fita, especifique a quantidade de metros andados a seguir."
        registerFunction={radio.registerFunction}
      />
      <Radio
        id="crossing"
        label="Travessia"
        value="crossing"
        helperText="Você atravessou e voltou com quedas."
        registerFunction={radio.registerFunction}
      />
      <Radio
        id="cadena"
        label="Cadena"
        value="cadena"
        helperText="Você dropou no começo e foi até o final da fita sem cair, no final pode descer no drop e sentar na fita."
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
        label="Distância"
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
        placeholder="Tempo da travessia, exemplo: 2:59"
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
