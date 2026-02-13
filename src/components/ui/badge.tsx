"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "indigo" | "green" | "amber" | "red";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-neutral-800 text-neutral-300": variant === "default",
          "bg-indigo-500/15 text-indigo-400": variant === "indigo",
          "bg-emerald-500/15 text-emerald-400": variant === "green",
          "bg-amber-500/15 text-amber-400": variant === "amber",
          "bg-red-500/15 text-red-400": variant === "red",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
