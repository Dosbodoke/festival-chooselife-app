import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  placeholder: string;
  inputType: "number" | "text";
  required?: boolean;
  registerFunction: UseFormRegisterReturn;
  errorMessage?: string;
  touched?: boolean;
  isDirty?: boolean;
}

function TextField({
  id,
  label,
  placeholder,
  inputType,
  required,
  registerFunction,
  errorMessage,
  touched,
  isDirty,
}: Props) {
  function getStatusClass(classes: {
    neutral: string;
    error: string;
    success: string;
  }): string {
    if (touched && errorMessage) return classes.error;
    if (isDirty && !errorMessage) return classes.success;
    return classes.neutral;
  }

  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-2 block text-sm font-medium ${getStatusClass({
          error: "text-red-700 dark:text-red-500",
          neutral: "text-gray-900 dark:text-white",
          success: "text-green-700 dark:text-green-500",
        })}`}
      >
        {label}
      </label>
      <input
        type={inputType}
        id={id}
        placeholder={placeholder}
        required={required}
        {...registerFunction}
        className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-0 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
        ${getStatusClass({
          error: "border-red-500 dark:border-red-400  ",
          neutral:
            "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500  dark:focus:ring-blue-500",
          success: "border-green-500  dark:border-green-400",
        })}`}
        // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {errorMessage}
      </p>
    </div>
  );
}

export default TextField;
