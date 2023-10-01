"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "../../utils/cn";

const Popover = PopoverPrimitive.Root;

const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverTrigger = PopoverPrimitive.Trigger;

interface PopoverContentProp
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  className?: string;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProp
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border border-gray-300 bg-gray-50 p-4 shadow-md outline-none dark:border-gray-500 dark:bg-gray-700",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
