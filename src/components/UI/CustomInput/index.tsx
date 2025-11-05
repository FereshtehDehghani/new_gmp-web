"use client";

import { useState } from "react";


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: boolean;
}

export default function CustomInput(props: InputProps) {
  const { error, errorMessage, label,...rest } = props;

  return (
    <div className='w-ful'>
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
          {...rest}
        />

        {error && errorMessage ? (
          <p className='text-red-500 text-sm mt-2 text-right'>{errorMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
