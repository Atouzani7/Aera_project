import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = {
    step: Step
    index: number
    isActive: boolean
    isCompleted: boolean
    onStepClick?: (step: Step) => void
}

export function StepCircle({
    step,
    index,
    isActive,
    isCompleted,
    onStepClick,
}: Props) {
    return (
        <motion.button
            whileHover={step.isClickable ? { scale: 1.05 } : {}}
            whileTap={step.isClickable ? { scale: 0.95 } : {}}
            onClick={() => step.isClickable && onStepClick?.(step)}
            disabled={!step.isClickable}
            className={cn(
                "relative w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-medium transition-colors",
                {
                    "bg-primary border-primary text-white": isCompleted || isActive,
                    "border-muted text-muted-foreground": step.status === "PENDING",
                    "cursor-pointer": step.isClickable,
                    "cursor-not-allowed opacity-50": !step.isClickable,
                }
            )}
        >
            {isCompleted ? "✓" : index + 1}

            {/* animation active */}
            {isActive && (
                <motion.span
                    className="absolute inset-0 rounded-full border border-primary"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                />
            )}
        </motion.button>
    )
}
