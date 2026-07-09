import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface UniswapButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "gold" | "outline";
  size?: "sm" | "md" | "lg";
  to?: string;
  className?: string;
  icon?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export const UniswapButton = React.forwardRef<HTMLButtonElement, UniswapButtonProps>(
  ({ children, variant = "primary", size = "md", to, className, icon, onClick, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center font-black transition-colors rounded-full shadow-lg overflow-hidden group outline-none";
    
    const sizeStyles = {
      sm: "px-4 py-2 text-xs gap-1.5",
      md: "px-6 py-3 text-sm gap-2",
      lg: "px-8 py-4 text-base gap-3",
    };

    const variantStyles = {
      primary: "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-pink-500/25 hover:from-pink-400 hover:to-purple-400",
      secondary: "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-cyan-500/25 hover:from-cyan-400 hover:to-indigo-400",
      gold: "bg-gradient-to-r from-[#F5B400] to-[#FFD166] text-slate-950 shadow-[#F5B400]/30 hover:from-[#FFD166] hover:to-[#FFE088]",
      outline: "bg-slate-900/50 text-white border border-white/10 hover:bg-white/10 backdrop-blur-md shadow-none",
    };

    const content = (
      <>
        {/* Soft inner glow overlay for depth */}
        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none mix-blend-overlay" />
        
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && (
            <span className="transition-transform group-hover:translate-x-1 group-active:translate-x-0">
              {icon}
            </span>
          )}
        </span>
      </>
    );

    const mergedClassName = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

    if (to) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } }}
          className="inline-block"
        >
          <Link to={to} className={mergedClassName} onClick={onClick as any}>
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 10 } }}
        className={mergedClassName}
        onClick={onClick as any}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

UniswapButton.displayName = "UniswapButton";
