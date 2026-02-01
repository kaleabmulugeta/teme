"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
                    {
                        "bg-white text-black hover:bg-neutral-200 light:bg-black light:text-white light:hover:bg-neutral-800": variant === "primary",
                        "bg-transparent text-white border border-white hover:bg-white hover:text-black light:text-black light:border-black light:hover:bg-black light:hover:text-white":
                            variant === "secondary",
                        "bg-transparent text-white border border-white/20 hover:border-white light:text-black light:border-black/20 light:hover:border-black":
                            variant === "outline",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export default Button;
