import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-toss-blue-100 text-toss-blue-900",
        secondary:
          "border-transparent bg-toss-gray-100 text-toss-gray-900",
        success:
          "border-transparent bg-green-100 text-green-800",
        warning:
          "border-transparent bg-orange-100 text-orange-800",
        error:
          "border-transparent bg-red-100 text-red-800",
        outline: "text-toss-gray-900 border border-toss-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }