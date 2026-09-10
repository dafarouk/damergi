"use client";

import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Gauge,
  MapPin,
  Sparkles,
  X,
  Zap,
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
  createPortal,
} from "react-dom";

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
    mounted,
    setMounted,
  ] = useState(false);

  const [
    open,
    setOpen,
  ] = useState(false);

  const isFr =
    language === "fr";

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }

    window.addEventListener(
      "damergi:open-recruiter",
      handleOpen
    );

    return () => {
      window.removeEventListener(
        "damergi:open-recruiter",
        handleOpen
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

  function goToHomeTarget(
    id: string
  ) {
    setOpen(false);

    if (pathname !== "/") {
      window.location.href =
        `/#${id}`;

      return;
    }

    window.setTimeout(
      () => {
        document
          .getElementById(
            id
          )
          ?.scrollIntoView({
            behavior:
              "smooth",

            block:
              "start",
          });
      },
      120
    );
  }

  function goToContact() {
    const mobile =
      window.matchMedia(
        "(max-width: 1023px)"
      ).matches;

    goToHomeTarget(
      mobile
        ? "mobile-contact-panel"
        : "contact-panel"
    );
  }

  function openRadar() {
    setOpen(false);

    window.setTimeout(
      () => {
        if (
          pathname ===
          "/"
        ) {
          window.dispatchEvent(
            new Event(
              "damergi:open-job-radar"
            )
          );
        } else {
          window.location.href =
            "/?radar=1";
        }
      },
      120
    );
  }

  const metrics = [
    {
      value:
        "20+",

      label:
        isFr
          ? "dashboards, pages ou visuels créés / améliorés"
          : "dashboards, pages or visuals created / improved",
    },

    {
      value:
        "10+",

      label:
        isFr
          ? "processus ou outils de reporting automatisés / développés"
          : "reporting processes or tools automated / developed",
    },

    {
      value:
        "15+",

      label:
        isFr
          ? "parties prenantes sur certains reportings"
          : "stakeholders on selected reporting flows",
    },

    {
      value:
        "70%",

      label:
        isFr
          ? "jusqu'à moins de travail manuel sur certains traitements"
          : "up to less manual work on selected processes",
    },
  ];

  const whyMe = [
    {
      icon:
        Gauge,

      title:
        isFr
          ? "Je comprends la performance métier"
          : "I understand business performance",

      text:
        isFr
          ? "Mon parcours combine opérations, qualité, KPI, reporting et aide à la décision. Je ne regarde pas seulement la donnée : je cherche ce qu'elle change pour le métier."
          : "My background combines operations, quality, KPI reporting and decision support. I do not only look at data: I focus on what it changes for the business.",
    },

    {
      icon:
        BarChart3,

      title:
        isFr
          ? "Je transforme les données en outils utiles"
          : "I turn data into useful tools",

      text:
        isFr
          ? "Power BI, SQL, Excel, Python, SAP BO, Tableau : je peux passer de la donnée brute à un reporting exploitable et lisible."
          : "Power BI, SQL, Excel, Python, SAP BO and Tableau: I can move from raw data to usable, readable reporting.",
    },

    {
      icon:
        Zap,

      title:
        isFr
          ? "J'automatise ce qui mérite de l'être"
          : "I automate what should be automated",

      text:
        isFr
          ? "Je cherche les tâches répétitives, les points de friction et les risques d'erreur pour simplifier le travail avec VBA, Python, Power Automate ou des outils internes."
          : "I look for repetitive work, friction points and error risks, then simplify them with VBA, Python, Power Automate or internal tools.",
    },
  ];

  const modal = (
    <AnimatePresence>

      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-[#070b12]/78 px-3 py-5 backdrop-blur-md sm:px-6 sm:py-8 lg:items-center"
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
            initial={{
              opacity:
                0,

              y:
                18,

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
                10,

              scale:
                0.99,
            }}
            transition={{
              duration:
                0.28,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="relative my-auto w-full max-w-[1120px] overflow-hidden rounded-[30px] border border-white/10 bg-[#111827] text-white shadow-[0_40px_140px_rgba(0,0,0,0.55)]"
          >

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#bc965d]/10 blur-3xl" />

              <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-white/[0.025] blur-3xl" />

            </div>

            <div className="relative border-b border-white/10 px-5 py-5 sm:px-8 sm:py-6">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="rounded-full border border-[#bc965d]/35 bg-[#bc965d]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#d2ad73] sm:text-[10px]">

                      {isFr
                        ? "Mode recruteur · 60 sec"
                        : "Recruiter mode · 60 sec"}

                    </span>

                    <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-white/55 sm:text-[10px]">

                      <span className="relative flex h-2 w-2">

                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#bc965d] opacity-35" />

                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d2ad73]" />

                      </span>

                      {isFr
                        ? "Disponible dès fév. 2027"
                        : "Available from Feb. 2027"}

                    </span>

                  </div>

                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] sm:text-4xl">

                    {isFr
                      ? "Pourquoi Ahmed-Farouk DAMERGI ?"
                      : "Why Ahmed-Farouk DAMERGI?"}

                  </h2>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55 sm:text-base sm:leading-7">

                    {isFr
                      ? "Data & Business Analyst avec une trajectoire opérations → qualité → data → performance, actuellement en stage de fin d'études chez Air France."
                      : "Data & Business Analyst with an operations → quality → data → performance journey, currently completing a final internship at Air France."}

                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(
                      false
                    )
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:bg-white/10 hover:text-white"
                >
                  <X
                    size={18}
                  />
                </button>

              </div>

            </div>

            <div className="relative max-h-[76vh] overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {metrics.map(
                  (
                    metric
                  ) => (
                    <div
                      key={
                        metric.value
                      }
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >

                      <p className="text-2xl font-semibold tracking-[-0.04em] text-[#d2ad73] sm:text-3xl">
                        {
                          metric.value
                        }
                      </p>

                      <p className="mt-2 text-xs leading-5 text-white/45">
                        {
                          metric.label
                        }
                      </p>

                    </div>
                  )
                )}

              </div>

              <div className="mt-8">

                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d2ad73]">

                  <Sparkles
                    size={15}
                  />

                  {isFr
                    ? "Pourquoi moi ?"
                    : "Why me?"}

                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-3">

                  {whyMe.map(
                    (
                      item
                    ) => {
                      const Icon =
                        item.icon;

                      return (
                        <article
                          key={
                            item.title
                          }
                          className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#bc965d]/30 hover:bg-[#bc965d]/[0.045]"
                        >

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#bc965d]/25 bg-[#bc965d]/10 text-[#d2ad73]">

                            <Icon
                              size={19}
                              strokeWidth={
                                1.7
                              }
                            />

                          </div>

                          <h3 className="mt-4 text-base font-semibold text-white/90">
                            {
                              item.title
                            }
                          </h3>

                          <p className="mt-3 text-sm leading-6 text-white/48">
                            {
                              item.text
                            }
                          </p>

                        </article>
                      );
                    }
                  )}

                </div>

              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

                <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">

                  <div className="flex items-center gap-2 text-sm font-semibold text-white/85">

                    <BriefcaseBusiness
                      size={17}
                      className="text-[#d2ad73]"
                    />

                    {isFr
                      ? "Postes ciblés"
                      : "Target roles"}

                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {[
                      "Data Analyst",
                      "BI Analyst",
                      "Business Data Analyst",

                      isFr
                        ? "Analyste Performance"
                        : "Performance Analyst",

                      "Product Data Analyst",
                      "Data Quality Analyst",
                      "Data Governance Analyst",
                    ].map(
                      (
                        role
                      ) => (
                        <span
                          key={
                            role
                          }
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/60"
                        >
                          {
                            role
                          }
                        </span>
                      )
                    )}

                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#bc965d]/20 bg-[#bc965d]/[0.06] p-4">

                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-[#d2ad73]"
                    />

                    <p className="text-sm leading-6 text-white/55">

                      {isFr
                        ? "Paris / Île-de-France en priorité · mobilité pour une belle opportunité."
                        : "Paris / Île-de-France preferred · open to relocation for the right opportunity."}

                    </p>

                  </div>

                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">

                  <p className="text-sm font-semibold text-white/85">

                    {isFr
                      ? "Stack principale"
                      : "Core stack"}

                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/55">

                    {[
                      "Power BI",
                      "SQL",
                      "Python",
                      "Excel / VBA",
                      "SAP BO",
                      "Tableau",
                      "Power Automate",
                      "Talend",
                    ].map(
                      (
                        tool
                      ) => (
                        <div
                          key={
                            tool
                          }
                          className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5"
                        >

                          <CheckCircle2
                            size={13}
                            className="shrink-0 text-[#d2ad73]"
                          />

                          {
                            tool
                          }

                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

            </div>

            <div className="relative flex flex-wrap items-center gap-2 border-t border-white/10 px-5 py-4 sm:px-8">

              <button
                type="button"
                onClick={
                  openRadar
                }
                className="inline-flex items-center gap-2 rounded-full bg-[#bc965d] px-4 py-2.5 text-xs font-semibold text-[#111827] transition hover:-translate-y-0.5 hover:bg-[#d2ad73]"
              >

                {isFr
                  ? "Voir mon job-fit radar"
                  : "View my job-fit radar"}

                <ArrowUpRight
                  size={14}
                />

              </button>

              <a
                href="/cv/CV-Ahmed-Farouk-Damergi.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >

                <FileText
                  size={14}
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
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >

                {isFr
                  ? "Me contacter"
                  : "Contact me"}

              </button>

            </div>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );

  if (!mounted)
    return null;

  return createPortal(
    modal,
    document.body
  );
}