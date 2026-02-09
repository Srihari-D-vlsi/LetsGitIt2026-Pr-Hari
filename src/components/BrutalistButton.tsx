import React from 'react';

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({
  href,
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 font-bold uppercase text-xl border-4 border-black transition-all duration-100 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:-translate-y-1 hover:translate-x-1";

  const variantStyles = {
    primary: "bg-[var(--accent)] text-black shadow-[var(--shadow-hard)] hover:shadow-[8px_8px_0px_0px_black]",
    secondary: "bg-[var(--secondary)] text-black shadow-[var(--shadow-hard)] hover:shadow-[8px_8px_0px_0px_black]"
  };

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
