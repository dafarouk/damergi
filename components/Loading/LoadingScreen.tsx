"use client";

import Image from "next/image";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";

import type {
  Language,
} from "@/data/timeline";

type LoadingScreenProps = {
  visible: boolean;
  language: Language;
  durationMs: number;
};

const microLabels = [
  "DATA",
  "BUSINESS",
  "PERFORMANCE",
  "AUTOMATION",
];

export default function LoadingScreen({
  visible,
  language,
  durationMs,
}: LoadingScreenProps) {
  const duration =
    Math.max(
      0.7,
      durationMs / 1000
    );

  const [
    microIndex,
    setMicroIndex,
  ] = useState(0);

  useEffect(() => {
    if (!visible)
      return;

    setMicroIndex(
      0
    );

    const stepDuration =
      durationMs >
      1500
        ? 480
        : 210;

    const interval =
      window.setInterval(
        () => {
          setMicroIndex(
            (
              current
            ) =>
              (
                current +
                1
              ) %
              microLabels.length
          );
        },
        stepDuration
      );

    return () =>
      window.clearInterval(
        interval
      );
  }, [
    visible,
    durationMs,
  ]);

  return (
    <AnimatePresence>

      {visible && (
        <motion.div
          initial={{
            opacity:
              1,
          }}
          exit={{
            opacity:
              0,

            scale:
              1.015,

            filter:
              "blur(8px)",
          }}
          transition={{
            duration:
              0.65,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#111827] text-white"
        >

          <div className="pointer-events-none absolute inset-0">

            <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]" />

            <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.05]" />

            <motion.div
              animate={{
                rotate:
                  360,
              }}
              transition={{
                duration:
                  20,

                repeat:
                  Infinity,

                ease:
                  "linear",
              }}
              className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-t border-[var(--gold)]/30"
            />

          </div>

          <div className="relative flex flex-col items-center">

            <motion.div
              initial={{
                opacity:
                  0,

                scale:
                  0.82,

                y:
                  12,
              }}
              animate={{
                opacity:
                  1,

                scale:
                  1,

                y:
                  0,
              }}
              transition={{
                duration:
                  Math.min(
                    0.8,
                    duration *
                      0.36
                  ),

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >

              <motion.div
                animate={{
                  y: [
                    0,
                    -4,
                    0,
                  ],
                }}
                transition={{
                  duration:
                    2.2,

                  repeat:
                    Infinity,

                  ease:
                    "easeInOut",
                }}
              >

                <Image
                  src="/images/branding/afd-white.png"
                  alt="AFD"
                  width={145}
                  height={145}
                  priority
                  className="h-[105px] w-auto object-contain sm:h-[118px]"
                />

              </motion.div>

            </motion.div>

            <motion.p
              initial={{
                opacity:
                  0,

                y:
                  8,
              }}
              animate={{
                opacity:
                  1,

                y:
                  0,
              }}
              transition={{
                delay:
                  duration >
                  1
                    ? 0.32
                    : 0.08,

                duration:
                  0.5,
              }}
              className="mt-2 text-center text-[11px] font-light uppercase tracking-[0.32em] text-white/75 sm:text-[13px] sm:tracking-[0.36em]"
            >
              Ahmed Farouk Damergi
            </motion.p>

            <motion.p
              initial={{
                opacity:
                  0,
              }}
              animate={{
                opacity:
                  1,
              }}
              transition={{
                delay:
                  duration >
                  1
                    ? 0.55
                    : 0.16,

                duration:
                  0.45,
              }}
              className="mt-3 text-[9px] font-medium uppercase tracking-[0.4em] text-[var(--gold)] sm:text-[10px]"
            >
              Portfolio
            </motion.p>

            <div className="mt-4 h-4 overflow-hidden sm:mt-5">

              <AnimatePresence
                mode="wait"
              >

                <motion.span
                  key={
                    microLabels[
                      microIndex
                    ]
                  }
                  initial={{
                    opacity:
                      0,

                    y:
                      7,

                    letterSpacing:
                      "0.46em",
                  }}
                  animate={{
                    opacity:
                      0.58,

                    y:
                      0,

                    letterSpacing:
                      "0.34em",
                  }}
                  exit={{
                    opacity:
                      0,

                    y:
                      -7,
                  }}
                  transition={{
                    duration:
                      0.18,
                  }}
                  className="block text-[8px] font-medium uppercase text-white sm:text-[9px]"
                >
                  {
                    microLabels[
                      microIndex
                    ]
                  }
                </motion.span>

              </AnimatePresence>

            </div>

            <div className="mt-5 h-[1px] w-44 overflow-hidden bg-white/10 sm:mt-7 sm:w-52">

              <motion.div
                key={
                  durationMs
                }
                initial={{
                  width:
                    "0%",
                }}
                animate={{
                  width:
                    "100%",
                }}
                transition={{
                  duration,

                  ease:
                    "linear",
                }}
                className="h-full bg-[var(--gold)]"
              />

            </div>

            <motion.p
              initial={{
                opacity:
                  0,
              }}
              animate={{
                opacity: [
                  0.25,
                  0.65,
                  0.25,
                ],
              }}
              transition={{
                duration:
                  1.5,

                repeat:
                  Infinity,
              }}
              className="mt-4 text-[8px] uppercase tracking-[0.25em] text-white/35 sm:text-[9px]"
            >

              {language ===
              "fr"
                ? "Chargement du portfolio"
                : "Loading portfolio"}

            </motion.p>

          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}