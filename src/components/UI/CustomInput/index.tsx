"use client";

import { useState } from "react";
import { InputProps } from "../Input";

interface PhoneInputProps {
  inputProps: InputProps;
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

export default function CustomInput(props: PhoneInputProps) {
  const { inputProps, error, errorMessage, label } = props;

  return (
    <div className='w-full max-w-sm'>
      {
        <label
          htmlFor='phone'
          className='block text-right text-sm font-medium text-gray-700 mb-2'
        >
          {label}
        </label>
      }

      <div className='relative'>
        <input
          dir='ltr'
          className={`
            w-full px-4 py-3 border rounded-lg text-left
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}
          `}
          {...inputProps}
        />

        {error && errorMessage ? (
          <p className='text-red-500 text-sm mt-2 text-right'>{errorMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
