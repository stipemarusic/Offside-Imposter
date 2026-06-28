import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

const variantClasses = {
  primary: "bg-emerald-400 text-slate-950 shadow-glow hover:bg-emerald-300",
  secondary: "bg-white/10 text-white hover:bg-white/15",
  danger: "bg-red-500/15 text-red-100 ring-1 ring-red-400/30 hover:bg-red-500/25",
  ghost: "bg-transparent text-emerald-100 underline-offset-4 hover:underline",
};

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`min-h-12 w-full rounded-lg px-5 py-3 text-base font-bold transition disabled:cursor-not-allowed disabled:opacity-45 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
