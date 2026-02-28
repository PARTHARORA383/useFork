"use client"

import React, { ReactNode, HTMLAttributes, useState } from "react"

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    onSubmit?: () => void

    idleText: string
    loadingText: string
    doneText: string

    idleIcon?: ReactNode
    loadingIcon?: ReactNode
    doneIcon?: ReactNode
}

export function Toast({
    className,
    onSubmit,
    idleText = 'Promise',
    loadingText = 'Processing',
    doneText = 'Your data has been processed and saved successfully.',
    idleIcon,
    loadingIcon,
    doneIcon,
    ...props
}: ToastProps) {

    const [toastState, setToastState] =
        useState<'idle' | 'loading' | 'active'>('idle')

    const handleClick = () => {
        setToastState("loading")

        setTimeout(() => {
            setToastState("active")
            onSubmit?.()
        }, 3000)
    }

    return (
        <div className={className} {...props}>
            <button
                onClick={handleClick}
                className="cursor-pointer active:scale-95"
            >

                {toastState === "idle" && (
                    <div className="py-1.5 px-6 rounded-full bg-muted-foreground flex items-center gap-2">
                        {idleIcon}
                        {idleText}
                    </div>
                )}

                {toastState === "loading" && (
                    <div className="py-1.5 px-6 rounded-full bg-muted-foreground flex items-center gap-2">
                        {loadingIcon}
                        {loadingText}
                    </div>
                )}

                {toastState === "active" && (
                    <div className="py-3 px-8 rounded-full bg-muted-foreground text-sm font-medium flex items-center gap-2">
                        {doneIcon}
                        {doneText}
                    </div>
                )}

            </button>
        </div>
    )
}


interface ToastIdleProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    className?: string
}

export function ToastIdle({ children, className, ...props }: ToastLoadingProps) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}
interface ToastLoadingProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    className?: string
}

export function ToastLoading({ children, className, ...props }: ToastLoadingProps) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}

interface ToastActiveProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    className?: string
}
export function ToastActive({ children, className, ...props }: ToastActiveProps) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}
