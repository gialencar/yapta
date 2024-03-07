import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`${className} bg-white/20 px-4 py-2 rounded-2xl shadow-glass
      backdrop-blur-sm border-[1px] border-white/30 flex-1 hover:bg-white/30
      hover:border-white/50 text-nordWhite font-semibold`}
      {...rest}
    >
      {children}
    </button>
  );
};
