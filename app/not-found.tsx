"use client";

import Image from "next/image";
import Link from "next/link";

import {
  DatabaseZap,
  Home,
} from "lucide-react";

import {
  motion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";

import type {
  Language,
} from "@/data/timeline";

export default function NotFound() {
  const [
    language,
    setLanguage,
  ] = useState<Language>(
    "fr"
  );

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "damergi-language"
      );

    if (
      savedLanguage ===
        "fr" ||
      savedLanguage ===
        "en"
    ) {
      setLanguage(
        savedLanguage
      );
    }
  }, []);

  const isFr =
    language === "fr";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111827] px-6 text-white">

      <div className="pointer-events-none absolute inset-0">

        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",

            backgroundSize:
              "68px 68px",

            maskImage:
              "radial-gradient(circle at center, black 0%, transparent 72%)",
          }}
        />

        <motion.div
          animate={{
            rotate:
              360,
          }}
          transition={{
            duration:
              24,

            repeat:
              Infinity,

            ease:
              "linear",
          }}
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#bc965d]/15"
        />

        {[
          0,
          1,
          2,
          3,
          4,
        ].map(
          (
            node
          ) => (
            <motion.span
              key={
                node
              }
              animate={{
                opacity: [
                  0.12,
                  0.65,
                  0.12,
                ],

                scale: [
                  0.8,
                  1.15,
                  0.8,
                ],
              }}
              transition={{
                duration:
                  2.3 +
                  node *
                    0.25,

                repeat:
                  Infinity,

                delay:
                  node *
                  0.2,
              }}
              className="absolute h-2.5 w-2.5 rounded-full bg-[#bc965d] shadow-[0_0_18px_rgba(188,150,93,0.55)]"
              style={{
                left:
                  `${
                    18 +
                    node *
                      16
                  }%`,

                top:
                  `${
                    node %
                      2 ===
                    0
                      ? 30
                      : 68
                  }%`,
              }}
            />
          )
        )}

      </div>

      <div className="relative z-10 max-w-3xl text-center">

        <motion.div
          initial={{
            opacity:
              0,

            y:
              14,
          }}
          animate={{
            opacity:
              1,

            y:
              0,
          }}
          transition={{
            duration:
              0.7,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          <Image
            src="/images/branding/afd-white.png"
            alt="AFD"
            width={120}
            height={120}
            className="mx-auto h-20 w-auto object-contain"
          />

          <div className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-full border border-[#bc965d]/25 bg-[#bc965d]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d2ad73]">

            <DatabaseZap
              size={14}
            />

            404 · Dataset mismatch

          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">

            {isFr
              ? "Cette donnée n'existe pas dans le dataset."
              : "This data point does not exist in the dataset."}

          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-7 text-white/50 sm:text-base">

            {isFr
              ? "La requête a retourné zéro ligne. Le portfolio, lui, fonctionne toujours correctement."
              : "The query returned zero rows. The portfolio itself is still running correctly."}

          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#bc965d] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:-translate-y-0.5 hover:bg-[#d2ad73]"
            >

              <Home
                size={15}
              />

              {isFr
                ? "Retour au portfolio"
                : "Back to portfolio"}

            </Link>

            <Link
              href="/cv-guide"
              className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"
            >

              {isFr
                ? "Besoin d'aide avec votre CV ?"
                : "Need help with your CV?"}

            </Link>

          </div>

          <p className="mt-10 text-[9px] uppercase tracking-[0.25em] text-white/20">

            {isFr
              ? "Indice : A · F · D"
              : "Hint: A · F · D"}

          </p>

        </motion.div>

      </div>

    </main>
  );
}