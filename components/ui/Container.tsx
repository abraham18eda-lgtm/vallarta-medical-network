import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}