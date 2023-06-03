import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  placeholder: string;
  required?: boolean;
  registerFunction: UseFormRegisterReturn;
}

function TextArea({ label, placeholder, required, registerFunction }: Props) {
  return (
    <div>
      <label
        htmlFor="description"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id="description"
        rows={4}
        placeholder={placeholder}
        required={required}
        {...registerFunction}
        className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  );
}

export default TextArea;
