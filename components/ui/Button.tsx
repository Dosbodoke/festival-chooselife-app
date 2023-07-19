import React from "react";

import { LoadingIcon } from "../../assets";

type ButtonVariant = "filled" | "outlined";
type ButtonColor = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  icon?: JSX.Element;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  widthFit?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      loading,
      icon,
      variant = "filled",
      color = "primary",
      size = "md",
      disabled = false,
      widthFit,
      ...props
    },
    forwardedRef
  ) => {
    const baseStyles =
      "border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
    const widthStyle = widthFit ? "w-fit" : "w-full";
    const disabledStyles = "cursor-not-allowed opacity-50";
    const sizeStyles = {
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-4",
      lg: "py-3 px-6 text-lg",
    };
    const colorStyles = {
      primary: {
        filled:
          "bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-blue-600",
        outlined:
          "bg-white dark:bg-gray-800 hover:bg-blue-100 text-blue-500 border-blue-500 focus:ring-blue-300",
      },
      secondary: {
        filled: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-400",
        outlined:
          "text-gray-500 dark:text-gray-400 dark:fill-gray-400 dark:focus:ring-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:border-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-100 text-gray-900 border-gray-300 focus:ring-gray-200",
      },
    };
    const buttonStyles = `${baseStyles} ${widthStyle} ${sizeStyles[size]} ${
      colorStyles[color][variant]
    } ${disabled ? disabledStyles : ""}`;

    return (
      <button
        className={buttonStyles}
        disabled={disabled}
        ref={forwardedRef}
        {...props}
      >
        {loading ? (
          <LoadingIcon className="mr-3 inline h-4 w-4 animate-spin text-white" />
        ) : (
          <span className="flex flex-row items-center justify-center gap-2">
            {icon} {label}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
