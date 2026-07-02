import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export function Button({
  className,
  variant = "primary",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition-all duration-300",

        variant === "primary" &&
          "bg-[#0F4C81] text-white hover:bg-[#0B3558] shadow-sm hover:shadow-lg",

        variant === "secondary" &&
          "bg-blue-100 text-[#0F4C81] hover:bg-blue-200",

        variant === "outline" &&
          "border border-slate-300 bg-white hover:border-[#0F4C81]",

        variant === "ghost" &&
          "hover:bg-slate-100",

        className
      )}
      {...props}
    />
  );
}