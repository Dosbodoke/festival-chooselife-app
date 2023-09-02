/** ****************************************************************************
 * Copyright (c) 2023 - Fundação CERTI
 * All rights reserved.
 ******************************************************************************/

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { cn } from "../../utils/cn";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string;
}
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 rounded border border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500  data-[state=checked]:bg-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:data-[state=checked]:bg-blue-500",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <CheckIcon className="text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;

interface CheckboxItemProps {
  id: string;
  checked: boolean;
  label: string;
  value?: string;
  onCheckedChange: (value: boolean) => void;
}
export const CheckboxItem = ({
  id,
  checked,
  label,
  value,
  onCheckedChange,
}: CheckboxItemProps) => {
  return (
    <li key={id}>
      <label
        htmlFor={`column-${id}`}
        className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-500"
      >
        <Checkbox
          id={`column-${id}`}
          checked={checked}
          onCheckedChange={onCheckedChange}
          value={value}
        />
        <span className="flex-1 rounded text-sm font-medium text-gray-500 dark:text-gray-300">
          {label}
        </span>
      </label>
    </li>
  );
};
