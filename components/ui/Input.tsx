import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all",
        "focus:border-[#0F4C81]",
        "focus:ring-4",
        "focus:ring-blue-100",
        className
      )}
      {...props}
    />
  );
}