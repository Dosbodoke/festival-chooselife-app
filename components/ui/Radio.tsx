import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  value: string;
  helperText?: string;
  registerFunction: UseFormRegisterReturn;
}

function Radio({ id, label, value, helperText, registerFunction }: Props) {
  return (
    <div className="flex">
      <div className="flex items-center h-5">
        <input
          id={id}
          type="radio"
          value={value}
          {...registerFunction}
          className="w-4 h-4 accent-blue-600"
        />
      </div>
      <div className="ml-2 text-sm">
        <label
          htmlFor={id}
          className="font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
        <p className="text-xs font-normal text-gray-500 dark:text-gray-300">
          {helperText}
        </p>
      </div>
    </div>
  );
}

export default Radio;
