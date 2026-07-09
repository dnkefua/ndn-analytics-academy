import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: MotionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } },
};

export function FadeInStagger({ children, className }: MotionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStaggerItem({ children, className }: MotionProps) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function BentoCard({ children, className, span }: MotionProps & { span?: number }) {
  return (
    <motion.div
      variants={staggerItemVariants}
      whileHover={{ y: -5, scale: 1.01, transition: { type: "spring", bounce: 0.4 } }}
      className={cn(
        "rounded-2xl border border-white/12 bg-white/5 backdrop-blur-md p-6 shadow-xl transition-colors hover:bg-white/10 hover:border-cyan-500/30 overflow-hidden relative",
        span === 2 && "sm:col-span-2",
        span === 3 && "lg:col-span-3",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 transition-opacity hover:opacity-100 pointer-events-none" />
      {children}
    </motion.div>
  );
}
