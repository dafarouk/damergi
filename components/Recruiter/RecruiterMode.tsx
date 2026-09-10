"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import type {
  Language,
} from "@/data/timeline";

type RecruiterModeProps = {
  language: Language;
};

export default function RecruiterMode({
  language,
}: RecruiterModeProps) {
  const pathname =
    usePathname();

  const [
    open,
    setOpen,
  ] = useState(false);

  const isFr =
    language === "fr";

  useEffect(() => {
    function openRecruiterMode() {
      setOpen(true);
    }

    window.addEventListener(
      "damergi:open-recruiter",
      openRecruiterMode
    );

    return () => {
      window.removeEventListener(
        "damergi:open-recruiter",
        openRecruiterMode
      );
    };
  }, []);

  useEffect(() => {
    if (!open)
      return;

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        setOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  function goToContact() {
    setOpen(false);

    const mobile =
      window.matchMedia(
        "(max-width: 1023px)"
      ).matches;

    const targetId =
      mobile
        ? "mobile-contact-panel"
        : "contact-panel";

    if (
      pathname !== "/"
    ) {
      window.location.href =
        `/#${targetId}`;

      return;
    }

    window.setTimeout(
      () => {
        const target =
          document.getElementById(
            targetId
          );

        if (!target)
          return;

        target.scrollIntoView({
          behavior:
            "smooth",

          block:
            "center",
        });

        target.classList.remove(
          "contact-focus"
        );

        requestAnimationFrame(
          () =>
            target.classList.add(
              "contact-focus"
            )
        );

        window.setTimeout(
          () =>
            target.classList.remove(
              "contact-focus"
            ),
          1400
        );
      },
      160
    );
  }

  const roles = [
    "Data Analyst",
    "BI Analyst",
    "Business Data Analyst",
    "Business Analyst",
    "Product Data Analyst",
    "Performance Analyst",
    "Data Quality Analyst",
    "Data Governance Analyst",
  ];

  const skills = [
    "Power BI · DAX · Power Query",
    "SQL · MySQL · PL/SQL",
    "Python · Excel · VBA",
    "Tableau · Talend · dbt",
    "SAP BO · Salesforce",
    "SharePoint · Power Automate · Jira",
  ];

  const metrics =
    isFr
      ? [
          [
            "20+",
            "dashboards, pages ou visuels Power BI créés / améliorés",
          ],

          [
            "10+",
            "processus ou outils automatisés / développés",
          ],

          [
            "15+",
            "parties prenantes atteintes sur certains reportings",
          ],

          [
            "70%",
            "de travail manuel en moins sur certains processus récurrents",
          ],
        ]
      : [
          [
            "20+",
            "Power BI dashboards, pages or visuals created / improved",
          ],

          [
            "10+",
            "processes or internal tools automated / developed",
          ],

          [
            "15+",
            "stakeholders reached on selected reporting",
          ],

          [
            "70%",
            "less manual work on selected recurring processes",
          ],
        ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-[#070b12]/76 p-3 backdrop-blur-md sm:p-5"
          initial={{
            opacity:
              0,
          }}
          animate={{
            opacity:
              1,
          }}
          exit={{
            opacity:
              0,
          }}
          onMouseDown={
            (
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setOpen(
                  false
                );
              }
            }
          }
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruiter-mode-title"
            initial={{
              opacity:
                0,

              y:
                24,

              scale:
                0.985,
            }}
            animate={{
              opacity:
                1,

              y:
                0,

              scale:
                1,
            }}
            exit={{
              opacity:
                0,

              y:
                16,

              scale:
                0.99,
            }}
            transition={{
              duration:
                0.26,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="relative max-h-[92dvh] w-full max-w-[1120px] overflow-y-auto rounded-[30px] border border-white/10 bg-[#111827] text-white shadow-[0_38px_140px_rgba(0,0,0,0.52)]"
          >
            <button
              type="button"
              onClick={() =>
                setOpen(
                  false
                )
              }
              aria-label={
                isFr
                  ? "Fermer"
                  : "Close"
              }
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 backdrop-blur transition hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
            >
              <X
                size={
                  18
                }
              />
            </button>

            <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
              <div className="relative overflow-hidden border-b border-white/10 p-6 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, rgba(188,150,93,0.18), transparent 32%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",

                    backgroundSize:
                      "auto, 54px 54px, 54px 54px",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex w-fit items-center gap-2 rounded-full border border-[#bc965d]/30 bg-[#bc965d]/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d2ad73]">
                    <BriefcaseBusiness
                      size={
                        14
                      }
                      strokeWidth={
                        1.8
                      }
                    />

                    {isFr
                      ? "Mode recruteur · 60 sec"
                      : "Recruiter mode · 60 sec"}
                  </div>

                  <h2
                    id="recruiter-mode-title"
                    className="mt-7 text-3xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-4xl"
                  >
                    {isFr
                      ? "L'essentiel de mon profil, sans parcourir toute la timeline."
                      : "The essentials of my profile, without scrolling the full timeline."}
                  </h2>

                  <div className="mt-7 rounded-2xl border border-[#bc965d]/25 bg-[#bc965d]/[0.08] p-4">
                    <div className="flex items-start gap-3">
                      <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#bc965d] opacity-35" />

                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#bc965d]" />
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {isFr
                            ? "Recherche CDI à partir de février 2027"
                            : "Seeking a permanent role from February 2027"}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-white/50">
                          {isFr
                            ? "Paris / Île-de-France en priorité · mobilité pour une belle opportunité"
                            : "Paris / Île-de-France preferred · open to relocation for the right opportunity"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4 text-sm leading-6 text-white/65">
                    <div className="flex items-start gap-3">
                      <BriefcaseBusiness
                        size={
                          17
                        }
                        strokeWidth={
                          1.7
                        }
                        className="mt-1 shrink-0 text-[#d2ad73]"
                      />

                      <span>
                        <strong className="font-semibold text-white/90">
                          {isFr
                            ? "Actuellement :"
                            : "Currently:"}
                        </strong>{" "}

                        {isFr
                          ? "Stagiaire Data & Performance Analyst chez Air France, Roissy-CDG · juil. 2026 → jan. 2027."
                          : "Data & Performance Analyst Intern at Air France, Roissy-CDG · Jul. 2026 → Jan. 2027."}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin
                        size={
                          17
                        }
                        strokeWidth={
                          1.7
                        }
                        className="mt-1 shrink-0 text-[#d2ad73]"
                      />

                      <span>
                        {isFr
                          ? "Profil Data + Business orienté analyse, BI, performance, qualité de données, reporting et automatisation."
                          : "Data + Business profile focused on analysis, BI, performance, data quality, reporting and automation."}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {roles.map(
                      (
                        role
                      ) => (
                        <span
                          key={
                            role
                          }
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/60"
                        >
                          {
                            role
                          }
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-9 lg:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d2ad73]">
                  {isFr
                    ? "Preuves rapides"
                    : "Quick proof"}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {metrics.map(
                    (
                      [
                        value,
                        label,
                      ]
                    ) => (
                      <div
                        key={
                          label
                        }
                        className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                      >
                        <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                          {value ===
                            "70%" &&
                          isFr
                            ? "Jusqu'à "
                            : value ===
                                "70%"
                              ? "Up to "
                              : ""}

                          {
                            value
                          }
                        </p>

                        <p className="mt-2 text-xs leading-5 text-white/45">
                          {
                            label
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>

                <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d2ad73]">
                  {isFr
                    ? "Stack principal"
                    : "Core stack"}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {skills.map(
                    (
                      skill
                    ) => (
                      <div
                        key={
                          skill
                        }
                        className="flex items-start gap-2 rounded-xl border border-white/[0.08] px-3 py-2.5 text-xs text-white/60"
                      >
                        <CheckCircle2
                          size={
                            14
                          }
                          strokeWidth={
                            1.7
                          }
                          className="mt-0.5 shrink-0 text-[#d2ad73]"
                        />

                        {
                          skill
                        }
                      </div>
                    )
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/cv/CV-Ahmed-Farouk-Damergi.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#bc965d] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:-translate-y-0.5 hover:bg-[#d2ad73]"
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
                  </a>

                  <button
                    type="button"
                    onClick={
                      goToContact
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                  >
                    <Mail
                      size={
                        16
                      }
                      strokeWidth={
                        1.8
                      }
                    />

                    {isFr
                      ? "Me contacter"
                      : "Contact me"}
                  </button>

                  <a
                    href="https://linkedin.com/in/farouk-damergi"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm text-white/65 transition hover:border-white/30 hover:text-white"
                  >
                    LinkedIn

                    <ArrowUpRight
                      size={
                        14
                      }
                    />
                  </a>

                  <a
                    href="https://github.com/dafarouk"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm text-white/65 transition hover:border-white/30 hover:text-white"
                  >
                    GitHub

                    <ArrowUpRight
                      size={
                        14
                      }
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}