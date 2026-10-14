import type React from "react"
// import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "secondary"
}

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = "default" }) => {
  return (
    <span
    //   className={cn(
    //     "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full",
    //     variant === "default" && "bg-[#0EA5E9] text-white",
    //     variant === "secondary" && "bg-[#1F2937] text-[#A3A3A3]",
    //     className,
    //   )}
    >
      {children}
    </span>
  )
}
