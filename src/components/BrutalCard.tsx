import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BrutalCardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
  hover?: boolean;
}

export function BrutalCard({
  className,
  accent = false,
  hover = false,
  ...props
}: BrutalCardProps) {
  return (
    <div
      className={cn(
        "border-2 border-foreground p-5 transition-all duration-150",
        accent ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground",
        "shadow-[8px_8px_0_0_var(--foreground)]",
        hover &&
          "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--foreground)]",
        className,
      )}
      {...props}
    />
  );
}