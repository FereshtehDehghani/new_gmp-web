import { convertToPersianNumbers } from '@/lib/utils';
import React from 'react';

// Define our extended props
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Text content */
  children: React.ReactNode;
  /** Predefined size variants */
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3';
  /** Color variants */
  color?:
    | 'primary'
    | 'secondary'
    | 'white'
    | 'darkGrey'
    | 'lightGrey'
    | 'error'
    | 'light'
    | 'info';
  /** Text alignment */
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  /** Additional styles */
  className?: string;
  /** Decoration */
  decoration?: 'none' | 'underline' | 'line-through' | 'underline-line-through';
  /** HTML element type */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
}

const Typography: React.FC<TextProps> = ({
  children,
  type = 'body1',
  color = 'primary',
  align = 'right',
  decoration = 'none',
  as: Component = 'p',
  className = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = 'font-irsans include-font-padding text-right rtl';

  // Type classes
  const typeClasses = {
    h1: 'text-3xl font-semibold',
    h2: 'text-2xl font-semibold leading-5',
    h3: 'text-xl font-semibold leading-6',
    h4: 'text-lg font-semibold leading-7',
    body1: 'text-base leading-8 font-normal',
    body2: 'text-sm leading-8 font-normal',
    body3: 'text-xs leading-8 font-normal',
  };

  // Color classes
  const colorClasses = {
    primary: 'text-[#1C2B3A]',
    secondary: 'text-[#6F6F6F]',
    white: 'text-[#F0F0F0]',
    light: 'text-[#bce2e7]',
    darkGrey: 'text-[#1E1E1E]',
    lightGrey: 'text-[#636D73]',
    info: 'text-[#0096FF]',
    error: 'text-[#dd1010]',
  };

  // Alignment classes
  const alignClasses = {
    auto: 'text-auto',
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
    justify: 'text-justify',
  };

  // Decoration classes
  const decorationClasses = {
    none: 'no-underline',
    underline: 'underline',
    'line-through': 'line-through',
    'underline-line-through': 'underline line-through',
  };

  // Build the final className string
  const finalClassName = [
    baseClasses,
    typeClasses[type],
    colorClasses[color],
    alignClasses[align],
    decorationClasses[decoration],
    className,
  ].join(' ');

  return (
    <Component className={finalClassName} {...rest}>
      {convertToPersianNumbers(children as string)}
    </Component>
  );
};

export default Typography;