"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionSectionProps extends HTMLMotionProps<"section"> {
  children: ReactNode;
  delay?: number;
}

export default function MotionSection({ children, delay = 0, ...props }: MotionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
