import type { LabelHTMLAttributes, ReactNode } from "react";

type FieldProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label: string;
  children: ReactNode;
};

export function Field({ label, children, className = "", ...props }: FieldProps) {
  return (
    <label className={`block space-y-2 ${className}`} {...props}>
      <span className="text-sm font-semibold uppercase tracking-wide text-emerald-100/80">{label}</span>
      {children}
    </label>
  );
}
