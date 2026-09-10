"use client";

import {
  motion,
} from "motion/react";

import {
  usePathname,
} from "next/navigation";

export default function Template({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  const pathname =
    usePathname();

  return (
    <motion.div
      key={
        pathname
      }
      initial={{
        opacity:
          0,

        y:
          8,

        scale:
          0.997,
      }}
      animate={{
        opacity:
          1,

        y:
          0,

        scale:
          1,
      }}
      transition={{
        duration:
          0.34,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="min-h-screen"
    >
      {
        children
      }
    </motion.div>
  );
}