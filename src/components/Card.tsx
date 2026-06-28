import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <section className={`rounded-lg border border-white/10 bg-slate-950/72 p-5 shadow-2xl backdrop-blur ${className}`}>
      {children}
    </section>
  );
}
