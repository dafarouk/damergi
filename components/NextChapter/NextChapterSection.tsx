"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  MapPin,
  Sparkles,
} from "lucide-react";

import {
  motion,
} from "motion/react";

import {
  useState,
} from "react";

import type {
  Language,
} from "@/data/timeline";

type RoleNode = {
  label: string;
  x: number;
  y: number;
  path: string;
  position: string;
};

const roles: RoleNode[] = [
  {
    label:
      "Data Analyst",

    x:
      150,

    y:
      92,

    path:
      "M450 270 C350 230 270 155 150 92",

    position:
      "left-[16.7%] top-[17%]",
  },

  {
    label:
      "BI Analyst",

    x:
      750,

    y:
      92,

    path:
      "M450 270 C555 220 650 145 750 92",

    position:
      "left-[83.3%] top-[17%]",
  },

  {
    label:
      "Business Data Analyst",

    x:
      790,

    y:
      245,

    path:
      "M450 270 C565 255 680 250 790 245",

    position:
      "left-[87.8%] top-[45.4%]",
  },

  {
    label:
      "Business Analyst",

    x:
      700,

    y:
      445,

    path:
      "M450 270 C555 335 635 405 700 445",

    position:
      "left-[77.8%] top-[82.4%]",
  },

  {
    label:
      "Product Data Analyst",

    x:
      450,

    y:
      505,

    path:
      "M450 270 C450 350 450 430 450 505",

    position:
      "left-[50%] top-[93.5%]",
  },

  {
    label:
      "Performance Analyst",

    x:
      200,

    y:
      445,

    path:
      "M450 270 C350 335 270 405 200 445",

    position:
      "left-[22.2%] top-[82.4%]",
  },

  {
    label:
      "Data Quality Analyst",

    x:
      110,

    y:
      245,

    path:
      "M450 270 C330 255 220 250 110 245",

    position:
      "left-[12.2%] top-[45.4%]",
  },

  {
    label:
      "Data Governance Analyst",

    x:
      450,

    y:
      50,

    path:
      "M450 270 C450 205 450 120 450 50",

    position:
      "left-[50%] top-[9.3%]",
  },
];

export default function NextChapterSection({
  language,
}: {
  language: Language;
}) {
  const [
    activeRole,
    setActiveRole,
  ] = useState(0);

  const isFr =
    language === "fr";

  function openRecruiterMode() {
    window.dispatchEvent(
      new Event(
        "damergi:open-recruiter"
      )
    );
  }

  return (
    <section
      id="next-chapter"
      className="relative overflow-hidden border-t border-white/10 bg-[#0f1622] px-5 pb-28 pt-24 text-white sm:px-8 lg:px-14 lg:pb-36 lg:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 44%, rgba(188,150,93,0.14), transparent 27%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",

          backgroundSize:
            "auto, 72px 72px, 72px 72px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none text-[clamp(120px,22vw,360px)] font-semibold leading-none tracking-[-0.08em] text-white/[0.018]"
      >
        2027
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <motion.div
          initial={{
            opacity:
              0,

            y:
              26,
          }}
          whileInView={{
            opacity:
              1,

            y:
              0,
          }}
          viewport={{
            once:
              true,

            amount:
              0.2,
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
          className="mx-auto max-w-[850px] text-center"
        >
          <div className="mx-auto flex w-fit items-center gap-3">
            <span className="h-px w-9 bg-[#bc965d]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d2ad73]">
              {isFr
                ? "Prochain chapitre"
                : "Next chapter"}
            </p>

            <span className="h-px w-9 bg-[#bc965d]" />
          </div>

          <h2 className="mt-6 text-[42px] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-[68px]">
            {isFr
              ? "Le prochain objectif est clair."
              : "The next objective is clear."}
          </h2>

          <p className="mx-auto mt-6 max-w-[720px] text-[16px] font-light leading-8 text-white/60 lg:text-lg">
            {isFr
              ? "À partir de février 2027, je cherche un CDI où je peux continuer à relier données, performance et besoins métier. Paris / Île-de-France en priorité, avec mobilité pour une belle opportunité."
              : "From February 2027, I am looking for a permanent role where I can keep connecting data, performance and business needs. Paris / Île-de-France preferred, with relocation open for the right opportunity."}
          </p>
        </motion.div>

        {/* MOBILE / TABLET */}
        <div className="mt-14 lg:hidden">
          <motion.div
            initial={{
              opacity:
                0,

              scale:
                0.96,
            }}
            whileInView={{
              opacity:
                1,

              scale:
                1,
            }}
            viewport={{
              once:
                true,

              amount:
                0.2,
            }}
            transition={{
              duration:
                0.65,
            }}
            className="mx-auto flex h-[210px] w-[210px] flex-col items-center justify-center rounded-full border border-[#bc965d]/35 bg-[#111827] text-center shadow-[0_0_70px_rgba(188,150,93,0.12)]"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#bc965d] opacity-35" />

              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#bc965d]" />
            </span>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d2ad73]">
              {isFr
                ? "Disponible"
                : "Available"}
            </p>

            <p className="mt-2 text-2xl font-semibold">
              Fév. 2027
            </p>

            <p className="mt-1 text-xs text-white/45">
              CDI · Permanent role
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {roles.map(
              (
                role,
                index
              ) => (
                <button
                  key={
                    role.label
                  }
                  type="button"
                  aria-pressed={
                    activeRole ===
                    index
                  }
                  onClick={() =>
                    setActiveRole(
                      index
                    )
                  }
                  className={`rounded-2xl border px-3 py-3 text-xs transition ${
                    activeRole ===
                    index
                      ? "border-[#bc965d]/55 bg-[#bc965d]/12 text-[#e0bd88]"
                      : "border-white/10 bg-white/[0.035] text-white/55"
                  }`}
                >
                  {
                    role.label
                  }
                </button>
              )
            )}
          </div>
        </div>

        {/* DESKTOP NETWORK */}
        <div className="relative mx-auto mt-12 hidden h-[540px] max-w-[1060px] lg:block">
          <svg
            viewBox="0 0 900 540"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            {roles.map(
              (
                role,
                index
              ) => {
                const active =
                  activeRole ===
                  index;

                return (
                  <g
                    key={
                      role.label
                    }
                  >
                    <motion.path
                      id={`next-role-path-${index}`}
                      d={
                        role.path
                      }
                      fill="none"
                      stroke={
                        active
                          ? "#bc965d"
                          : "rgba(255,255,255,0.10)"
                      }
                      strokeWidth={
                        active
                          ? 1.8
                          : 1.15
                      }
                      initial={{
                        pathLength:
                          0,

                        opacity:
                          0,
                      }}
                      whileInView={{
                        pathLength:
                          1,

                        opacity:
                          1,
                      }}
                      viewport={{
                        once:
                          true,
                      }}
                      transition={{
                        duration:
                          1.1,

                        delay:
                          index *
                          0.06,
                      }}
                    />

                    <circle
                      r={
                        active
                          ? 3.2
                          : 2.2
                      }
                      fill={
                        active
                          ? "#d2ad73"
                          : "rgba(255,255,255,0.28)"
                      }
                    >
                      <animateMotion
                        dur={`${4.4 + index * 0.18}s`}
                        repeatCount="indefinite"
                        path={
                          role.path
                        }
                      />
                    </circle>
                  </g>
                );
              }
            )}
          </svg>

          <motion.div
            initial={{
              opacity:
                0,

              scale:
                0.88,
            }}
            whileInView={{
              opacity:
                1,

              scale:
                1,
            }}
            viewport={{
              once:
                true,
            }}
            transition={{
              duration:
                0.75,

              delay:
                0.2,
            }}
            className="absolute left-1/2 top-1/2 flex h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#bc965d]/38 bg-[#111827]/95 text-center shadow-[0_0_90px_rgba(188,150,93,0.14)] backdrop-blur"
          >
            <div className="absolute inset-[15px] rounded-full border border-dashed border-white/10" />

            <div className="absolute inset-[32px] rounded-full border border-[#bc965d]/16" />

            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#bc965d] opacity-35" />

              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#bc965d]" />
            </span>

            <p className="relative mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d2ad73]">
              {isFr
                ? "Disponible"
                : "Available"}
            </p>

            <p className="relative mt-2 text-[30px] font-semibold tracking-[-0.04em]">
              Fév. 2027
            </p>

            <p className="relative mt-1 text-[11px] text-white/40">
              CDI · Permanent role
            </p>
          </motion.div>

          {roles.map(
            (
              role,
              index
            ) => {
              const active =
                activeRole ===
                index;

              return (
                <button
                  key={
                    role.label
                  }
                  type="button"
                  aria-pressed={
                    active
                  }
                  onMouseEnter={() =>
                    setActiveRole(
                      index
                    )
                  }
                  onFocus={() =>
                    setActiveRole(
                      index
                    )
                  }
                  onClick={() =>
                    setActiveRole(
                      index
                    )
                  }
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[11px] font-medium transition duration-300 ${role.position} ${
                    active
                      ? "scale-105 border-[#bc965d]/65 bg-[#bc965d]/14 text-[#e0bd88] shadow-[0_0_28px_rgba(188,150,93,0.12)]"
                      : "border-white/10 bg-[#111827]/88 text-white/50 hover:border-white/20 hover:text-white/75"
                  }`}
                >
                  {
                    role.label
                  }
                </button>
              );
            }
          )}
        </div>

        <motion.div
          initial={{
            opacity:
              0,

            y:
              20,
          }}
          whileInView={{
            opacity:
              1,

            y:
              0,
          }}
          viewport={{
            once:
              true,

            amount:
              0.3,
          }}
          transition={{
            duration:
              0.65,

            delay:
              0.15,
          }}
          className="mx-auto mt-8 grid max-w-[1040px] gap-3 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
            <BriefcaseBusiness
              size={
                18
              }
              strokeWidth={
                1.7
              }
              className="mx-auto text-[#d2ad73]"
            />

            <p className="mt-2 text-sm font-semibold">
              CDI · Fév. 2027
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
            <MapPin
              size={
                18
              }
              strokeWidth={
                1.7
              }
              className="mx-auto text-[#d2ad73]"
            />

            <p className="mt-2 text-sm font-semibold">
              Paris · Île-de-France
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
            <Sparkles
              size={
                18
              }
              strokeWidth={
                1.7
              }
              className="mx-auto text-[#d2ad73]"
            />

            <p className="mt-2 text-sm font-semibold">
              {isFr
                ? "Mobilité possible"
                : "Open to relocation"}
            </p>
          </div>
        </motion.div>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={
              openRecruiterMode
            }
            className="inline-flex items-center gap-2 rounded-full bg-[#bc965d] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:-translate-y-0.5 hover:bg-[#d2ad73] hover:shadow-[0_14px_38px_rgba(188,150,93,0.16)]"
          >
            <BriefcaseBusiness
              size={
                16
              }
              strokeWidth={
                1.8
              }
            />

            {isFr
              ? "Mode recruteur · 60 sec"
              : "Recruiter mode · 60 sec"}
          </button>

          <a
            href="/cv/CV-Ahmed-Farouk-Damergi.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/75 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
          >
            <FileText
              size={
                16
              }
              strokeWidth={
                1.8
              }
            />

            {isFr
              ? "Voir mon CV"
              : "View my CV"}

            <ArrowUpRight
              size={
                14
              }
              strokeWidth={
                1.7
              }
            />
          </a>
        </div>
      </div>
    </section>
  );
}