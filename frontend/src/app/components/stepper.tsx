"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { StepCircle } from "./stepCircle"

type StepperProps = {
    steps: Step[]
    onStepClick?: (step: Step) => void
}

export function Stepper({ steps, onStepClick }: StepperProps) {
    if (!steps.length) return null

    return (
        <div className="w-full">
            {/* DESKTOP (horizontal) */}
            <div className="hidden md:flex items-center w-full">
                {steps.map((step, index) => {
                    const isCompleted = step.status === "COMPLETED"
                    const isActive = step.status === "ACTIVE"

                    return (
                        <div key={step.id} className="flex  items-center w-full">

                            <StepCircle
                                step={step}
                                index={index}
                                isActive={isActive}
                                isCompleted={isCompleted}
                                onStepClick={onStepClick}
                            />

                            {index < steps.length - 1 && (
                                <div
                                    className={cn(
                                        "flex-1 h-1 mx-2",
                                        isCompleted ? "bg-primary" : "bg-button"
                                    )}
                                />
                            )}
                            <p className="text-sm text-muted-foreground">step name</p>
                        </div>
                    )
                })}
            </div>

            {/* MOBILE (vertical) */}
            <div className="md:hidden flex flex-col gap-4">
                {steps.map((step, index) => {
                    const isCompleted = step.status === "COMPLETED"
                    const isActive = step.status === "ACTIVE"

                    return (
                        <div key={step.id} className="flex items-start gap-4">
                            {/* colonne cercles + lignes */}
                            <div className="flex flex-col items-center">
                                <StepCircle
                                    step={step}
                                    index={index}
                                    isActive={isActive}
                                    isCompleted={isCompleted}
                                    onStepClick={onStepClick}
                                />

                                {index < steps.length - 1 && (
                                    <motion.div
                                        layout
                                        className={cn(
                                            "w-1 h-10 my-2 rounded",
                                            isCompleted ? "bg-primary" : "bg-muted"
                                        )}
                                    />
                                )}
                            </div>

                            {/* label */}
                            <div className="pt-2">
                                <p
                                    className={cn(
                                        "text-sm font-medium",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {step.label}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
