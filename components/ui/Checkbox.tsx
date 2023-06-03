import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  helperText?: string;
  registerFunction: UseFormRegisterReturn;
}

function Checkbox({ id, label, helperText, registerFunction }: Props) {
  return (
    <div className="flex">
      <div className="flex h-5 items-center">
        <input
          id={id}
          aria-describedby="helper-checkbox-text"
          type="checkbox"
          {...registerFunction}
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
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

export default Checkbox;
