"use client";

import {
  motion,
  useScroll,
  useSpring,
} from "motion/react";

export default function PageProgress() {
  const {
    scrollYProgress,
  } = useScroll();

  const progress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 120,
        damping: 28,
        mass: 0.25,
      }
    );

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX:
          progress,
        transformOrigin:
          "0% 50%",
      }}
      className="fixed left-0 top-0 z-[500] h-[2px] w-full bg-[var(--gold)]"
    />
  );
}