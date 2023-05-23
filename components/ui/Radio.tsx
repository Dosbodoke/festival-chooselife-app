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
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
