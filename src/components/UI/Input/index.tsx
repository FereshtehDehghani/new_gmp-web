import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isError?: boolean;
  description?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, error, isError, description, ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <Label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            {label}
          </Label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-white  text-primary px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground   disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            label ? "mt-1" : "",
            isError && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Description */}
        {description && !error && (
          <p className='text-sm text-muted-foreground mt-1'>{description}</p>
        )}

        {/* Error Message */}
        {error && isError && (
          <p className='text-sm text-red-500 mt-1'>{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
