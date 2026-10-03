"use client";

import { motion } from "motion/react";
import { useState } from "react";

// The first page load is not animated: the server HTML paints immediately
// (protects LCP). Client-side navigations after that get a short rise-and-fade.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === "undefined") return false;
    const should = hasMounted;
    hasMounted = true;
    return should;
  });
  return (
    <motion.div
      initial={animate ? { opacity: 0.001, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
