"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDot,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createPortal,
} from "react-dom";

import type {
  Language,
} from "@/data/timeline";

type Props = {
  language: Language;
};

type RoleFit = {
  role: string;
  fit: string;
  strengths: string[];
  development: string;
};

export default function NextChapterRadarController({
  language,
}: Props) {
  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);

  const isFr =
    language === "fr";

  const roles =
    useMemo<
      RoleFit[]
    >(
      () => [
        {
          role:
            "Data Analyst",

          fit:
            isFr
              ? "Très fort"
              : "Very strong",

          strengths: [
            "SQL",
            "Python",
            "Excel",
            "Power BI",

            isFr
              ? "Qualité des données"
              : "Data quality",
          ],

          development:
            isFr
              ? "Approfondir les méthodes statistiques avancées lorsque le poste l'exige."
              : "Deepen advanced statistical methods when the role requires them.",
        },

        {
          role:
            "BI Analyst",

          fit:
            isFr
              ? "Très fort"
              : "Very strong",

          strengths: [
            "Power BI",
            "DAX",
            "Power Query",
            "SAP BO",
            "Tableau",
          ],

          development:
            isFr
              ? "Adapter rapidement la pratique BI aux stacks cloud propres à chaque entreprise."
              : "Quickly adapt BI practice to each company's cloud stack.",
        },

        {
          role:
            "Business Data Analyst",

          fit:
            isFr
              ? "Très fort"
              : "Very strong",

          strengths: [
            "KPI",
            "Performance",
            "Reporting",

            isFr
              ? "Analyse métier"
              : "Business analysis",

            isFr
              ? "Aide à la décision"
              : "Decision support",
          ],

          development:
            isFr
              ? "Monter vite en profondeur sur le domaine métier spécifique de l'équipe."
              : "Build deeper expertise quickly in the team's specific business domain.",
        },

        {
          role:
            isFr
              ? "Analyste Performance"
              : "Performance Analyst",

          fit:
            isFr
              ? "Très fort"
              : "Very strong",

          strengths: [
            "KPI",

            isFr
              ? "Opérations"
              : "Operations",

            isFr
              ? "Automatisation"
              : "Automation",

            "Power BI",

            isFr
              ? "Pilotage"
              : "Performance steering",
          ],

          development:
            isFr
              ? "Renforcer la modélisation financière si le périmètre du poste l'impose."
              : "Strengthen financial modelling if the role requires it.",
        },

        {
          role:
            "Product Data Analyst",

          fit:
            isFr
              ? "Fort"
              : "Strong",

          strengths: [
            "SQL",
            "Python",
            "KPI",

            isFr
              ? "Analyse comportementale"
              : "Behavioural analysis",

            isFr
              ? "Storytelling data"
              : "Data storytelling",
          ],

          development:
            isFr
              ? "Développer davantage l'expérimentation produit et les métriques produit dédiées."
              : "Build more hands-on product experimentation and dedicated product metrics experience.",
        },

        {
          role:
            "Data Quality Analyst",

          fit:
            isFr
              ? "Fort"
              : "Strong",

          strengths: [
            isFr
              ? "Fiabilisation"
              : "Data reliability",

            "SQL",

            isFr
              ? "Contrôles"
              : "Controls",

            isFr
              ? "Automatisation"
              : "Automation",

            isFr
              ? "Expérience qualité"
              : "Quality background",
          ],

          development:
            isFr
              ? "Formaliser encore davantage les frameworks de Data Quality à grande échelle."
              : "Further formalise large-scale Data Quality frameworks.",
        },

        {
          role:
            "Data Governance Analyst",

          fit:
            isFr
              ? "En progression"
              : "Developing fit",

          strengths: [
            isFr
              ? "Qualité"
              : "Quality",

            isFr
              ? "Processus"
              : "Processes",

            isFr
              ? "Parties prenantes"
              : "Stakeholders",

            isFr
              ? "Fiabilité"
              : "Reliability",

            isFr
              ? "Documentation"
              : "Documentation",
          ],

          development:
            isFr
              ? "Approfondir catalogage, lineage et frameworks de gouvernance dédiés."
              : "Deepen data cataloguing, lineage and dedicated governance frameworks.",
        },
      ],
      [
        isFr,
      ]
    );

  const selectedRole =
    roles[
      selectedIndex
    ];

  useEffect(() => {
    setMounted(true);

    return () =>
      setMounted(false);
  }, []);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }

    window.addEventListener(
      "damergi:open-job-radar",
      handleOpen
    );

    return () =>
      window.removeEventListener(
        "damergi:open-job-radar",
        handleOpen
      );
  }, []);

  /* DEEP LINKS */

  useEffect(() => {
    if (!mounted)
      return;

    const params =
      new URLSearchParams(
        window.location.search
      );

    if (
      params.get(
        "radar"
      ) === "1"
    ) {
      window.setTimeout(
        () =>
          setOpen(
            true
          ),
        350
      );

      window.history.replaceState(
        {},
        "",
        "/"
      );
    }

    const chapter =
      params.get(
        "chapter"
      );

    if (chapter) {
      const order = [
        "intro",
        "licence",
        "biat-db",
        "biat-dev",
        "freelance",
        "teleperformance",
        "concentrix",
        "transition-data",
        "esb",
        "aycode",
        "cytech",
        "airfrance",
        "next",
      ];

      const index =
        order.indexOf(
          chapter
        );

      if (index >= 0) {
        window.setTimeout(
          () => {
            const desktop =
              window.matchMedia(
                "(min-width: 1024px)"
              ).matches;

            if (desktop) {
              const items =
                document.querySelectorAll<HTMLElement>(
                  ".story-scroll .story-chapter"
                );

              items[
                index
              ]?.scrollIntoView({
                behavior:
                  "smooth",

                block:
                  "center",
              });
            } else if (
              index >
              0
            ) {
              const trigger =
                document.querySelector<HTMLButtonElement>(
                  '[aria-controls="mobile-journey"]'
                );

              if (
                trigger &&
                trigger.getAttribute(
                  "aria-expanded"
                ) !==
                  "true"
              ) {
                trigger.click();
              }

              window.setTimeout(
                () => {
                  const items =
                    document.querySelectorAll<HTMLElement>(
                      "#mobile-journey article"
                    );

                  items[
                    index -
                      1
                  ]?.scrollIntoView({
                    behavior:
                      "smooth",

                    block:
                      "center",
                  });
                },
                350
              );
            }
          },
          450
        );
      }

      window.history.replaceState(
        {},
        "",
        "/"
      );
    }
  }, [mounted]);

  /* TURN LAST TIMELINE CARD INTO TRIGGER */

  useEffect(() => {
    if (!mounted)
      return;

    const cleanups:
      (() => void)[] =
        [];

    const hints:
      HTMLElement[] =
        [];

    function attach(
      target:
        HTMLElement | null,

      id:
        string
    ) {
      if (!target)
        return;

      target.classList.add(
        "next-radar-target"
      );

      target.id =
        id;

      target.setAttribute(
        "title",
        isFr
          ? "Ouvrir le job-fit radar"
          : "Open the job-fit radar"
      );

      function targetClick(
        event: Event
      ) {
        const clicked =
          event.target as HTMLElement;

        if (
          clicked.closest(
            "button"
          ) ||
          clicked.closest(
            "a"
          )
        ) {
          return;
        }

        setOpen(
          true
        );
      }

      target.addEventListener(
        "click",
        targetClick
      );

      cleanups.push(
        () =>
          target.removeEventListener(
            "click",
            targetClick
          )
      );

      const card =
        Array.from(
          target.children
        ).find(
          (
            child
          ) =>
            child.tagName ===
            "DIV"
        ) as
          | HTMLElement
          | undefined;

      if (
        card &&
        !card.querySelector(
          ".next-radar-hint"
        )
      ) {
        const hint =
          document.createElement(
            "button"
          );

        hint.type =
          "button";

        hint.className =
          "next-radar-hint";

        hint.innerHTML = `${
          isFr
            ? "Explorer mon job-fit radar"
            : "Explore my job-fit radar"
        } <span>↗</span>`;

        hint.addEventListener(
          "click",
          (
            event
          ) => {
            event.stopPropagation();

            setOpen(
              true
            );
          }
        );

        card.appendChild(
          hint
        );

        hints.push(
          hint
        );
      }
    }

    const timer =
      window.setTimeout(
        () => {
          attach(
            document.querySelector<HTMLElement>(
              ".story-scroll .story-chapter:last-child"
            ),
            "next-chapter-radar"
          );

          attach(
            document.querySelector<HTMLElement>(
              "#mobile-journey article:last-of-type"
            ),
            "next-chapter-radar-mobile"
          );
        },
        120
      );

    return () => {
      window.clearTimeout(
        timer
      );

      cleanups.forEach(
        (
          cleanup
        ) =>
          cleanup()
      );

      hints.forEach(
        (
          hint
        ) =>
          hint.remove()
      );

      document
        .querySelectorAll(
          ".next-radar-target"
        )
        .forEach(
          (
            target
          ) =>
            target.classList.remove(
              "next-radar-target"
            )
        );
    };
  }, [
    isFr,
    mounted,
  ]);

  useEffect(() => {
    if (!open)
      return;

    const previous =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event:
        KeyboardEvent
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
        previous;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  const positions = [
    "left-1/2 top-[2%] -translate-x-1/2",
    "right-[6%] top-[18%]",
    "right-[0%] bottom-[27%]",
    "right-[24%] bottom-[2%]",
    "left-[24%] bottom-[2%]",
    "left-[0%] bottom-[27%]",
    "left-[6%] top-[18%]",
  ];

  const modal = (
    <AnimatePresence>

      {open && (
        <motion.div
          className="fixed inset-0 z-[10020] flex items-start justify-center overflow-y-auto bg-[#070b12]/80 px-3 py-5 backdrop-blur-md sm:px-6 sm:py-8 lg:items-center"
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
            className="relative my-auto w-full max-w-[1180px] overflow-hidden rounded-[30px] border border-white/10 bg-[#111827] text-white shadow-[0_40px_140px_rgba(0,0,0,0.58)]"
          >

            <div className="pointer-events-none absolute inset-0">

              <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bc965d]/10" />

              <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.05]" />

            </div>

            <div className="relative flex items-start justify-between gap-5 border-b border-white/10 px-5 py-5 sm:px-8 sm:py-6">

              <div>

                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d2ad73]">

                  <CircleDot
                    size={15}
                  />

                  {isFr
                    ? "Prochain chapitre · Février 2027"
                    : "Next chapter · February 2027"}

                </div>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-4xl">

                  {isFr
                    ? "Mon job-fit radar"
                    : "My job-fit radar"}

                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/50 sm:text-base">

                  {isFr
                    ? "Pas un score automatique : une lecture transparente des rôles qui correspondent le mieux à mon profil aujourd'hui, avec mes points forts et ce que je continue à développer."
                    : "Not an automated score: a transparent view of the roles that fit my profile best today, with my strengths and what I am still developing."}

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

            <div className="relative grid gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-9">

              <div>

                {/* DESKTOP RADAR */}

                <div className="relative hidden h-[540px] lg:block">

                  <div className="absolute left-1/2 top-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />

                  <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#bc965d]/15" />

                  <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#bc965d]/30 bg-[#bc965d]/[0.08] text-center shadow-[0_0_60px_rgba(188,150,93,0.08)]">

                    <BriefcaseBusiness
                      size={24}
                      className="text-[#d2ad73]"
                    />

                    <p className="mt-3 text-sm font-semibold">
                      Ahmed-Farouk
                    </p>

                    <p className="mt-1 px-4 text-[10px] uppercase tracking-[0.14em] text-white/40">
                      Data & Business Analyst
                    </p>

                  </div>

                  {roles.map(
                    (
                      role,
                      index
                    ) => (
                      <button
                        key={
                          role.role
                        }
                        type="button"
                        onClick={() =>
                          setSelectedIndex(
                            index
                          )
                        }
                        className={`absolute max-w-[175px] rounded-2xl border px-4 py-3 text-left transition duration-300 ${
                          positions[
                            index
                          ]
                        } ${
                          selectedIndex ===
                          index
                            ? "border-[#bc965d]/55 bg-[#bc965d]/15 text-white shadow-[0_0_28px_rgba(188,150,93,0.14)]"
                            : "border-white/10 bg-[#172131]/95 text-white/58 hover:border-white/20 hover:text-white"
                        }`}
                      >

                        <span className="block text-xs font-semibold leading-4">
                          {
                            role.role
                          }
                        </span>

                        <span className="mt-1 block text-[9px] uppercase tracking-[0.12em] text-[#d2ad73]">
                          {
                            role.fit
                          }
                        </span>

                      </button>
                    )
                  )}

                </div>

                {/* MOBILE */}

                <div className="grid grid-cols-2 gap-2 lg:hidden">

                  {roles.map(
                    (
                      role,
                      index
                    ) => (
                      <button
                        key={
                          role.role
                        }
                        type="button"
                        onClick={() =>
                          setSelectedIndex(
                            index
                          )
                        }
                        className={`rounded-2xl border p-3 text-left transition ${
                          selectedIndex ===
                          index
                            ? "border-[#bc965d]/50 bg-[#bc965d]/12 text-white"
                            : "border-white/10 bg-white/[0.03] text-white/55"
                        }`}
                      >

                        <span className="block text-xs font-semibold leading-4">
                          {
                            role.role
                          }
                        </span>

                        <span className="mt-1 block text-[9px] uppercase tracking-[0.1em] text-[#d2ad73]">
                          {
                            role.fit
                          }
                        </span>

                      </button>
                    )
                  )}

                </div>

              </div>

              <motion.aside
                key={
                  selectedRole.role
                }
                initial={{
                  opacity:
                    0,

                  x:
                    10,
                }}
                animate={{
                  opacity:
                    1,

                  x:
                    0,
                }}
                transition={{
                  duration:
                    0.22,
                }}
                className="self-center rounded-[26px] border border-white/10 bg-white/[0.035] p-5 sm:p-6"
              >

                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d2ad73]">

                  {isFr
                    ? "Lecture du fit"
                    : "Fit readout"}

                </span>

                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                  {
                    selectedRole.role
                  }
                </h3>

                <div className="mt-3 inline-flex rounded-full border border-[#bc965d]/30 bg-[#bc965d]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d2ad73]">
                  {
                    selectedRole.fit
                  }
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">

                  {isFr
                    ? "Forces principales"
                    : "Core strengths"}

                </p>

                <div className="mt-3 space-y-2">

                  {selectedRole.strengths.map(
                    (
                      strength
                    ) => (
                      <div
                        key={
                          strength
                        }
                        className="flex items-center gap-2 text-sm text-white/68"
                      >

                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-[#d2ad73]"
                        />

                        {
                          strength
                        }

                      </div>
                    )
                  )}

                </div>

                <div className="mt-6 rounded-2xl border border-white/[0.08] bg-black/10 p-4">

                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">

                    {isFr
                      ? "À développer"
                      : "Still developing"}

                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {
                      selectedRole.development
                    }
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(
                      false
                    );

                    window.setTimeout(
                      () => {
                        window.dispatchEvent(
                          new Event(
                            "damergi:open-recruiter"
                          )
                        );
                      },
                      120
                    );
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#bc965d] px-4 py-2.5 text-xs font-semibold text-[#111827] transition hover:bg-[#d2ad73]"
                >

                  {isFr
                    ? "Voir le résumé recruteur"
                    : "View recruiter summary"}

                  <ArrowUpRight
                    size={14}
                  />

                </button>

              </motion.aside>

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