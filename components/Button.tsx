import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 uppercase tracking-widest text-xs font-semibold transition-all duration-300 ease-in-out border border-transparent";
  
  const variants = {
    primary: "bg-asl-brown text-asl-cream hover:bg-asl-gold hover:text-asl-brown",
    secondary: "bg-asl-gold text-asl-brown hover:bg-asl-brown hover:text-asl-gold",
    outline: "bg-transparent border-asl-brown text-asl-brown hover:bg-asl-brown hover:text-asl-cream"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};