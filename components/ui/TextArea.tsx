import * as React from "react";

import { cn } from "@/utils/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };

// import { UseFormRegisterReturn } from "react-hook-form";

// interface Props {
//   id: string;
//   label: string;
//   placeholder: string;
//   required?: boolean;
//   registerFunction: UseFormRegisterReturn;
// }

// function TextArea({
//   id,
//   label,
//   placeholder,
//   required,
//   registerFunction,
// }: Props) {
//   return (
//     <div>
//       <label
//         htmlFor={id}
//         className="mb-2 block text-base font-medium text-gray-900 dark:text-white"
//       >
//         {label}
//       </label>
//       <textarea
//         id={id}
//         rows={4}
//         placeholder={placeholder}
//         required={required}
//         {...registerFunction}
//         className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
//       />
//     </div>
//   );
// }

// export default TextArea;
