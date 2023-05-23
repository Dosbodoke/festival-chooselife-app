interface Props {
  label: string;
  helperText?: string;
}

function Checkbox({ label, helperText }: Props) {
  return (
    <div className="flex">
      <div className="flex items-center h-5">
        <input
          id="helper-checkbox"
          aria-describedby="helper-checkbox-text"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="ml-2 text-sm">
        <label
          htmlFor="helper-checkbox"
          className="font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
        <p
          id="helper-checkbox-text"
          className="text-xs font-normal text-gray-500 dark:text-gray-300"
        >
          {helperText}
        </p>
      </div>
    </div>
  );
}

export default Checkbox;
