"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  Language,
} from "@/data/timeline";

type ExpertiseKey =
  | "analysis"
  | "bi"
  | "performance"
  | "quality"
  | "automation"
  | "decision"
  | "development";

type ExpertiseToolGroup = {
  label: string;
  tools: string[];
};

type ExpertiseItem = {
  key: ExpertiseKey;
  number: string;
  title: string;
  subtitle?: string;
  short: string;
  description: string;
  tools: string[];
  toolGroups?: ExpertiseToolGroup[];
};

type CursorState = {
  visible: boolean;
  x: number;
  y: number;
};

const networkPaths: Record<
  ExpertiseKey,
  string
> = {
  analysis:
    "M360 260 C290 230 220 175 120 110",

  bi:
    "M360 260 C430 210 510 130 640 100",

  performance:
    "M360 260 C455 250 540 240 650 235",

  quality:
    "M360 260 C455 285 540 330 650 350",

  automation:
    "M360 260 C300 325 235 385 140 400",

  decision:
    "M360 260 C270 260 195 255 100 250",

  development:
    "M360 260 C420 340 500 425 605 448",
};

const nodePositions: Record<
  ExpertiseKey,
  string
> = {
  analysis:
    "left-[15.8%] top-[21.2%]",

  bi:
    "left-[84.2%] top-[19.2%]",

  performance:
    "left-[85.5%] top-[45.2%]",

  quality:
    "left-[85.5%] top-[67.3%]",

  automation:
    "left-[18.4%] top-[76.9%]",

  decision:
    "left-[13.2%] top-[48.1%]",

  development:
    "left-[79.6%] top-[86.2%]",
};

const content: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    intro: string;
    networkLabel: string;
    centerTitle: string;
    centerSubtitle: string;
    resultsEyebrow: string;
    resultsTitle: string;
    cursor: string;

    expertise: ExpertiseItem[];

    metrics: {
      value: number;
      prefix?: string;
      suffix?: string;
      label: string;
    }[];
  }
> = {
  fr: {
    eyebrow:
      "Expertise",

    title:
      "Ce que je fais",

    intro:
      "Je transforme des données opérationnelles en informations fiables, compréhensibles et utiles à la décision. Mon approche se situe à l'intersection de la Data, de la Business Intelligence, de la performance et de l'automatisation.",

    networkLabel:
      "Mon écosystème Data & Business",

    centerTitle:
      "DATA & BUSINESS",

    centerSubtitle:
      "Analyse · BI · Performance",

    resultsEyebrow:
      "Impact récent",

    resultsTitle:
      "Quelques résultats chez Air France",

    cursor:
      "EXPLORER",

    expertise: [
      {
        key:
          "analysis",

        number:
          "01",

        title:
          "Data Analysis",

        short:
          "SQL · Python · Trends",

        description:
          "Extraire, nettoyer, transformer et analyser les données afin d'identifier tendances, variations et informations exploitables.",

        tools: [
          "SQL",
          "Python",
          "Data Preparation",
          "Trend Analysis",
        ],
      },

      {
        key:
          "bi",

        number:
          "02",

        title:
          "Business Intelligence",

        short:
          "Power BI · DAX · Tableau",

        description:
          "Construire des reportings et dashboards qui rendent la donnée lisible, interactive et immédiatement exploitable.",

        tools: [
          "Power BI",
          "DAX",
          "Power Query",
          "Tableau",
          "SAP BO",
        ],
      },

      {
        key:
          "performance",

        number:
          "03",

        title:
          "Performance Analytics",

        short:
          "KPI · Forecast · Operations",

        description:
          "Suivre les KPI, analyser les écarts et anticiper l'activité pour aider les équipes à piloter leur performance.",

        tools: [
          "KPI",
          "Forecasting",
          "Reporting",
          "Operational Analysis",
        ],
      },

      {
        key:
          "quality",

        number:
          "04",

        title:
          "Data Quality",

        short:
          "Reliability · Controls · Anomalies",

        description:
          "Contrôler la fiabilité et la complétude des données, détecter les anomalies et sécuriser les informations utilisées pour le reporting.",

        tools: [
          "Data Quality",
          "Controls",
          "Anomaly Analysis",
          "Reliability",
        ],
      },

      {
        key:
          "automation",

        number:
          "05",

        title:
          "Automation",

        short:
          "VBA · Power Automate · Python",

        description:
          "Réduire les traitements répétitifs grâce à des automatisations simples, robustes et adaptées aux besoins opérationnels.",

        tools: [
          "VBA",
          "Power Automate",
          "Python",
          "Excel",
        ],
      },

      {
        key:
          "decision",

        number:
          "06",

        title:
          "Decision Support",

        short:
          "Business · Reporting · Insights",

        description:
          "Relier le besoin métier à la donnée et présenter les bons indicateurs aux bonnes personnes pour faciliter la prise de décision.",

        tools: [
          "Business Needs",
          "Reporting",
          "Stakeholders",
          "Decision Support",
        ],
      },

      {
        key:
          "development",

        number:
          "07",

        title:
          "Développement & Prototypage",

        subtitle:
          "Outils & interfaces autour de la donnée",

        short:
          "TypeScript · JavaScript · React · Next.js",

        description:
          "Concevoir des interfaces, outils internes, prototypes et applications d'appui autour de la donnée avec Python · JavaScript · TypeScript · VBA · HTML5 · CSS3 · React · Next.js · Git · GitHub · VS Code. Ce portfolio démontre directement le volet TypeScript, React et Next.js.",

        tools: [],

        toolGroups: [
          {
            label:
              "Programmation / Scripting",

            tools: [
              "Python",
              "JavaScript",
              "TypeScript",
              "VBA",
            ],
          },

          {
            label:
              "Web / UI",

            tools: [
              "HTML5",
              "CSS3",
              "React",
              "Next.js",
            ],
          },

          {
            label:
              "Outils de développement",

            tools: [
              "Git",
              "GitHub",
              "VS Code",
            ],
          },
        ],
      },
    ],

    metrics: [
      {
        value:
          20,

        suffix:
          "+",

        label:
          "dashboards, pages ou visuels Power BI créés ou significativement améliorés",
      },

      {
        value:
          10,

        suffix:
          "+",

        label:
          "processus de reporting ou outils automatisés / développés",
      },

      {
        value:
          15,

        suffix:
          "+",

        label:
          "parties prenantes sur certains reportings",
      },

      {
        value:
          70,

        prefix:
          "Jusqu'à ",

        suffix:
          "%",

        label:
          "de travail manuel en moins sur certains processus récurrents",
      },
    ],
  },

  en: {
    eyebrow:
      "Expertise",

    title:
      "What I do",

    intro:
      "I turn operational data into reliable, understandable information that supports decisions. My approach sits at the intersection of Data, Business Intelligence, performance and automation.",

    networkLabel:
      "My Data & Business ecosystem",

    centerTitle:
      "DATA & BUSINESS",

    centerSubtitle:
      "Analytics · BI · Performance",

    resultsEyebrow:
      "Recent impact",

    resultsTitle:
      "A few results at Air France",

    cursor:
      "EXPLORE",

    expertise: [
      {
        key:
          "analysis",

        number:
          "01",

        title:
          "Data Analysis",

        short:
          "SQL · Python · Trends",

        description:
          "Extracting, cleaning, transforming and analysing data to identify trends, variations and actionable information.",

        tools: [
          "SQL",
          "Python",
          "Data Preparation",
          "Trend Analysis",
        ],
      },

      {
        key:
          "bi",

        number:
          "02",

        title:
          "Business Intelligence",

        short:
          "Power BI · DAX · Tableau",

        description:
          "Building reporting and dashboards that make data readable, interactive and immediately useful.",

        tools: [
          "Power BI",
          "DAX",
          "Power Query",
          "Tableau",
          "SAP BO",
        ],
      },

      {
        key:
          "performance",

        number:
          "03",

        title:
          "Performance Analytics",

        short:
          "KPI · Forecast · Operations",

        description:
          "Monitoring KPIs, analysing gaps and anticipating activity to help operational teams manage performance.",

        tools: [
          "KPI",
          "Forecasting",
          "Reporting",
          "Operational Analysis",
        ],
      },

      {
        key:
          "quality",

        number:
          "04",

        title:
          "Data Quality",

        short:
          "Reliability · Controls · Anomalies",

        description:
          "Checking data reliability and completeness, detecting anomalies and securing the information used for reporting.",

        tools: [
          "Data Quality",
          "Controls",
          "Anomaly Analysis",
          "Reliability",
        ],
      },

      {
        key:
          "automation",

        number:
          "05",

        title:
          "Automation",

        short:
          "VBA · Power Automate · Python",

        description:
          "Reducing repetitive work through simple, robust automation adapted to operational needs.",

        tools: [
          "VBA",
          "Power Automate",
          "Python",
          "Excel",
        ],
      },

      {
        key:
          "decision",

        number:
          "06",

        title:
          "Decision Support",

        short:
          "Business · Reporting · Insights",

        description:
          "Connecting business needs with data and presenting the right indicators to the right stakeholders to support decisions.",

        tools: [
          "Business Needs",
          "Reporting",
          "Stakeholders",
          "Decision Support",
        ],
      },

      {
        key:
          "development",

        number:
          "07",

        title:
          "Development & Prototyping",

        subtitle:
          "Tools & interfaces around data",

        short:
          "TypeScript · JavaScript · React · Next.js",

        description:
          "Building data-focused interfaces, internal tools, prototypes and supporting applications with Python · JavaScript · TypeScript · VBA · HTML5 · CSS3 · React · Next.js · Git · GitHub · VS Code. This portfolio directly demonstrates the TypeScript, React and Next.js side.",

        tools: [],

        toolGroups: [
          {
            label:
              "Programming / Scripting",

            tools: [
              "Python",
              "JavaScript",
              "TypeScript",
              "VBA",
            ],
          },

          {
            label:
              "Web / UI",

            tools: [
              "HTML5",
              "CSS3",
              "React",
              "Next.js",
            ],
          },

          {
            label:
              "Development tools",

            tools: [
              "Git",
              "GitHub",
              "VS Code",
            ],
          },
        ],
      },
    ],

    metrics: [
      {
        value:
          20,

        suffix:
          "+",

        label:
          "Power BI dashboards, pages or visuals created or significantly improved",
      },

      {
        value:
          10,

        suffix:
          "+",

        label:
          "reporting processes or internal tools automated / developed",
      },

      {
        value:
          15,

        suffix:
          "+",

        label:
          "stakeholders reached by some reporting",
      },

      {
        value:
          70,

        prefix:
          "Up to ",

        suffix:
          "%",

        label:
          "less manual work on some recurring processes",
      },
    ],
  },
};

export default function ExpertiseSection({
  language,
}: {
  language: Language;
}) {
  const copy =
    content[
      language
    ];

  const [
    activeKey,
    setActiveKey,
  ] =
    useState<ExpertiseKey>(
      "bi"
    );

  const [
    cursor,
    setCursor,
  ] =
    useState<CursorState>({
      visible: false,
      x: 0,
      y: 0,
    });

  return (
    <section
      id="expertise"
      className="expertise-section relative overflow-hidden px-5 pb-28 pt-24 sm:px-8 lg:px-14 lg:pb-36 lg:pt-32"
    >

      {/* AMBIENT BACKGROUND */}

      <div
        aria-hidden="true"
        className="expertise-ambient pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 mx-auto max-w-[1650px]">

        {/* HEADER */}

        <Reveal>

          <div className="max-w-[920px]">

            <div className="flex items-center gap-3">

              <span className="h-[1px] w-10 bg-[var(--gold)]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold-dark)]">

                {
                  copy.eyebrow
                }

              </p>

            </div>

            <h2 className="mt-6 text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--ink)] sm:text-5xl lg:text-[64px]">

              {
                copy.title
              }

            </h2>

            <p className="mt-6 max-w-[800px] text-[16px] font-light leading-8 text-[var(--body-text)] lg:text-lg">

              {
                copy.intro
              }

            </p>

          </div>

        </Reveal>

        {/* ===================================================
            MAIN GRID

            PHONE:
            Mobile ecosystem appears FIRST.

            TABLET/DESKTOP:
            Mobile ecosystem wrapper does NOT exist visually,
            therefore it cannot take a grid column.

            Desktop layout remains:
            CARDS LEFT / NETWORK RIGHT.
        =================================================== */}

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">

          {/* ===============================================
              PHONE ONLY:
              COOL STAR ECOSYSTEM FIRST

              IMPORTANT:
              md:hidden is on the OUTER wrapper.
              Therefore this wrapper takes ZERO grid space
              from 768px upward.
          =============================================== */}

          <div className="md:hidden">

            <Reveal>

              <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">

                {
                  copy.networkLabel
                }

              </p>

              <MobileNetwork
                items={
                  copy.expertise
                }
                activeKey={
                  activeKey
                }
                setActiveKey={
                  setActiveKey
                }
                centerTitle={
                  copy.centerTitle
                }
                centerSubtitle={
                  copy.centerSubtitle
                }
              />

            </Reveal>

          </div>

          {/* ===============================================
              EXPERTISE CARDS

              Desktop:
              original LEFT column.

              Phone:
              comes AFTER ecosystem.
          =============================================== */}

          <div className="grid gap-3">

            {copy.expertise.map(
              (
                item,
                index
              ) => (
                <Reveal
                  key={
                    item.key
                  }
                  delay={
                    index *
                    0.06
                  }
                >

                  <TiltExpertiseCard
                    item={
                      item
                    }
                    active={
                      activeKey ===
                      item.key
                    }
                    onActivate={() =>
                      setActiveKey(
                        item.key
                      )
                    }
                    onCursor={
                      setCursor
                    }
                  />

                </Reveal>
              )
            )}

          </div>

          {/* ===============================================
              TABLET + DESKTOP NETWORK

              This is the ORIGINAL desktop network.
              Desktop remains RIGHT of the boxes.
          =============================================== */}

          <Reveal
            delay={
              0.12
            }
          >

            <div className="hidden md:block">

              <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">

                {
                  copy.networkLabel
                }

              </p>

              <DesktopNetwork
                items={
                  copy.expertise
                }
                activeKey={
                  activeKey
                }
                setActiveKey={
                  setActiveKey
                }
                centerTitle={
                  copy.centerTitle
                }
                centerSubtitle={
                  copy.centerSubtitle
                }
              />

            </div>

          </Reveal>

        </div>

        {/* METRICS */}

        <div className="mt-24 lg:mt-32">

          <Reveal>

            <div className="mb-8">

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold-dark)]">

                {
                  copy.resultsEyebrow
                }

              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[var(--ink)] sm:text-3xl">

                {
                  copy.resultsTitle
                }

              </h3>

            </div>

          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

            {copy.metrics.map(
              (
                metric,
                index
              ) => (
                <Reveal
                  key={
                    metric.label
                  }
                  delay={
                    index *
                    0.07
                  }
                >

                  <MetricCard
                    {...metric}
                  />

                </Reveal>
              )
            )}

          </div>

        </div>

      </div>

      {/* CUSTOM DESKTOP CURSOR */}

      <motion.div
        aria-hidden="true"
        animate={{
          opacity:
            cursor.visible
              ? 1
              : 0,

          scale:
            cursor.visible
              ? 1
              : 0.7,
        }}
        transition={{
          duration:
            0.16,
        }}
        style={{
          left:
            cursor.x,

          top:
            cursor.y,
        }}
        className="expertise-cursor pointer-events-none fixed z-[600] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-[#111827]/94 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-white shadow-xl backdrop-blur-lg lg:block"
      >

        {
          copy.cursor
        }

      </motion.div>

    </section>
  );
}

/* =========================================================
   EXPERTISE CARD
========================================================= */

function TiltExpertiseCard({
  item,
  active,
  onActivate,
  onCursor,
}: {
  item: ExpertiseItem;
  active: boolean;
  onActivate: () => void;
  onCursor: (
    value: CursorState
  ) => void;
}) {
  const x =
    useMotionValue(0);

  const y =
    useMotionValue(0);

  const rotateX =
    useSpring(
      x,
      {
        stiffness:
          220,

        damping:
          24,
      }
    );

  const rotateY =
    useSpring(
      y,
      {
        stiffness:
          220,

        damping:
          24,
      }
    );

  function handleMove(
    event: React.PointerEvent<HTMLButtonElement>
  ) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const relativeX =
      (
        event.clientX -
        rect.left
      ) /
        rect.width -
      0.5;

    const relativeY =
      (
        event.clientY -
        rect.top
      ) /
        rect.height -
      0.5;

    rotateY.set(
      relativeX *
        4
    );

    rotateX.set(
      relativeY *
        -4
    );

    onCursor({
      visible:
        true,

      x:
        event.clientX +
        18,

      y:
        event.clientY +
        18,
    });
  }

  function reset() {
    rotateX.set(
      0
    );

    rotateY.set(
      0
    );

    onCursor({
      visible:
        false,

      x:
        0,

      y:
        0,
    });
  }

  return (
    <div className="expertise-card-shell">

      <motion.button
        type="button"
        onPointerMove={
          handleMove
        }
        onPointerEnter={(
          event
        ) => {
          onActivate();

          onCursor({
            visible:
              true,

            x:
              event.clientX +
              18,

            y:
              event.clientY +
              18,
          });
        }}
        onPointerLeave={
          reset
        }
        onBlur={
          reset
        }
        onFocus={
          onActivate
        }
        onClick={
          onActivate
        }
        aria-pressed={
          active
        }
        style={{
          rotateX,
          rotateY,
        }}
        className={`expertise-card group relative w-full overflow-hidden rounded-[22px] border p-5 text-left transition-colors duration-300 sm:p-6 ${
          active
            ? "border-[var(--gold)] bg-[var(--expertise-active)]"
            : "border-[var(--line)] bg-[var(--surface)]/70 hover:border-[var(--gold-soft)]"
        }`}
      >

        <div className="flex items-start gap-4">

          <span
            className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[9px] font-semibold transition ${
              active
                ? "border-[var(--gold)] bg-[var(--gold)] text-white"
                : "border-[var(--gold-soft)] text-[var(--gold-dark)]"
            }`}
          >

            {
              item.number
            }

          </span>

          <div className="min-w-0 flex-1">

            <div className="flex items-start justify-between gap-4">

              <div>

                <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--ink)]">

                  {
                    item.title
                  }

                </h3>

                <p className="mt-1 text-[11px] uppercase tracking-[0.11em] text-[var(--muted)]">

                  {
                    item.subtitle ??
                      item.short
                  }

                </p>

              </div>

              <span
                className={`mt-2 h-2 w-2 shrink-0 rounded-full transition-all ${
                  active
                    ? "scale-125 bg-[var(--gold)] shadow-[0_0_0_6px_var(--gold-halo)]"
                    : "bg-[var(--line)]"
                }`}
              />

            </div>

            <p className="mt-4 text-sm font-light leading-6 text-[var(--body-text)]">

              {
                item.description
              }

            </p>

            {item.toolGroups ? (
              <div className="mt-4 grid gap-3">

                {item.toolGroups.map(
                  (
                    group
                  ) => (
                    <div
                      key={
                        group.label
                      }
                    >

                      <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[var(--gold-dark)]">

                        {
                          group.label
                        }

                      </p>

                      <div className="mt-1.5 flex flex-wrap gap-1.5">

                        {group.tools.map(
                          (
                            tool
                          ) => (
                            <ToolChip
                              key={
                                tool
                              }
                              tool={
                                tool
                              }
                            />
                          )
                        )}

                      </div>

                    </div>
                  )
                )}

              </div>
            ) : (
              <div className="mt-4 flex flex-wrap gap-1.5">

                {item.tools.map(
                  (
                    tool
                  ) => (
                    <ToolChip
                      key={
                        tool
                      }
                      tool={
                        tool
                      }
                    />
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </motion.button>

    </div>
  );
}

function ToolChip({
  tool,
}: {
  tool: string;
}) {
  return (
    <span className="rounded-full border border-[var(--line)] bg-[var(--page)]/70 px-2.5 py-1 text-[9px] font-medium text-[var(--muted)]">

      {
        tool
      }

    </span>
  );
}

/* =========================================================
   DESKTOP LIVE NETWORK
   UNCHANGED
========================================================= */

function DesktopNetwork({
  items,
  activeKey,
  setActiveKey,
  centerTitle,
  centerSubtitle,
}: {
  items: ExpertiseItem[];
  activeKey: ExpertiseKey;
  setActiveKey: (
    key: ExpertiseKey
  ) => void;
  centerTitle: string;
  centerSubtitle: string;
}) {
  return (
    <div className="expertise-network relative mx-auto aspect-[760/520] w-full max-w-[820px] overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--network-bg)] shadow-[0_30px_90px_rgba(15,23,42,0.08)]">

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
      >

        <div className="network-grid absolute inset-0" />

      </div>

      <svg
        viewBox="0 0 760 520"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >

        {items.map(
          (
            item,
            index
          ) => {
            const path =
              networkPaths[
                item.key
              ];

            const active =
              activeKey ===
              item.key;

            return (
              <g
                key={
                  item.key
                }
              >

                <motion.path
                  d={
                    path
                  }
                  fill="none"
                  stroke={
                    active
                      ? "var(--gold)"
                      : "var(--network-line)"
                  }
                  strokeWidth={
                    active
                      ? 2.2
                      : 1.2
                  }
                  strokeLinecap="round"
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

                    amount:
                      0.25,
                  }}
                  transition={{
                    duration:
                      1.1,

                    delay:
                      index *
                      0.08,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                />

                <circle
                  r={
                    active
                      ? 4
                      : 3
                  }
                  fill={
                    active
                      ? "var(--gold)"
                      : "var(--network-particle)"
                  }
                  opacity="0.95"
                >

                  <animateMotion
                    dur={`${3.2 + index * 0.35}s`}
                    repeatCount="indefinite"
                    path={
                      path
                    }
                  />

                </circle>

                <circle
                  r="2"
                  fill="var(--network-particle)"
                  opacity="0.45"
                >

                  <animateMotion
                    dur={`${4.8 + index * 0.27}s`}
                    begin={`${index * 0.3}s`}
                    repeatCount="indefinite"
                    path={
                      path
                    }
                  />

                </circle>

              </g>
            );
          }
        )}

      </svg>

      {/* CENTER */}

      <div className="absolute left-[47.4%] top-1/2 z-20 w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-[var(--gold)] bg-[var(--network-center)] px-5 py-5 text-center shadow-[0_20px_70px_var(--gold-halo)]">

        <div className="mx-auto mb-3 h-2 w-2 rounded-full bg-[var(--gold)] shadow-[0_0_0_7px_var(--gold-halo)]" />

        <p className="text-[12px] font-semibold tracking-[0.05em] text-[var(--ink)]">

          {
            centerTitle
          }

        </p>

        <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]">

          {
            centerSubtitle
          }

        </p>

      </div>

      {/* NODES */}

      {items.map(
        (
          item
        ) => {
          const active =
            activeKey ===
            item.key;

          return (
            <button
              key={
                item.key
              }
              type="button"
              aria-pressed={
                active
              }
              onMouseEnter={() =>
                setActiveKey(
                  item.key
                )
              }
              onFocus={() =>
                setActiveKey(
                  item.key
                )
              }
              onClick={() =>
                setActiveKey(
                  item.key
                )
              }
              className={`absolute z-30 w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border px-4 py-3 text-left transition-all duration-300 ${nodePositions[item.key]} ${
                active
                  ? "scale-[1.04] border-[var(--gold)] bg-[var(--surface)] shadow-[0_14px_50px_var(--gold-halo)]"
                  : "border-[var(--line)] bg-[var(--surface)]/88 hover:border-[var(--gold-soft)]"
              }`}
            >

              <p className="text-[11px] font-semibold leading-4 text-[var(--ink)]">

                {
                  item.title
                }

              </p>

              <p className="mt-1 text-[8px] leading-3 text-[var(--muted)]">

                {
                  item.short
                }

              </p>

              <div className="mt-2 flex gap-1">

                {Array.from({
                  length:
                    active
                      ? 4
                      : 2,
                }).map(
                  (
                    _,
                    index
                  ) => (
                    <span
                      key={
                        index
                      }
                      className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
                    />
                  )
                )}

              </div>

            </button>
          );
        }
      )}

    </div>
  );
}

/* =========================================================
   PHONE COOL STAR NETWORK
   PHONE ONLY THROUGH PARENT md:hidden
========================================================= */

function MobileNetwork({
  items,
  activeKey,
  setActiveKey,
  centerTitle,
  centerSubtitle,
}: {
  items: ExpertiseItem[];
  activeKey: ExpertiseKey;
  setActiveKey: (
    key: ExpertiseKey
  ) => void;
  centerTitle: string;
  centerSubtitle: string;
}) {
  const mobilePaths: Record<
    ExpertiseKey,
    string
  > = {
    analysis:
      "M195 280 C168 218 128 150 78 92",

    bi:
      "M195 280 C222 218 262 150 312 92",

    performance:
      "M195 280 C240 270 283 258 326 248",

    quality:
      "M195 280 C225 340 265 395 307 424",

    automation:
      "M195 280 C165 340 125 395 83 424",

    decision:
      "M195 280 C150 270 107 258 64 248",

    development:
      "M195 280 C195 350 195 430 195 500",
  };

  const mobilePositions: Record<
    ExpertiseKey,
    string
  > = {
    analysis:
      "left-[20%] top-[16%]",

    bi:
      "left-[80%] top-[16%]",

    performance:
      "left-[83.5%] top-[44.5%]",

    quality:
      "left-[79%] top-[76%]",

    automation:
      "left-[21%] top-[76%]",

    decision:
      "left-[16.5%] top-[44.5%]",

    development:
      "left-1/2 top-[89%]",
  };

  return (
    <div className="expertise-network relative mx-auto aspect-[390/560] w-full max-w-[430px] overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--network-bg)] shadow-[0_24px_70px_rgba(15,23,42,0.07)]">

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
      >

        <div className="network-grid absolute inset-0" />

      </div>

      {/* ANIMATED STAR CONNECTIONS */}

      <svg
        viewBox="0 0 390 560"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >

        {items.map(
          (
            item,
            index
          ) => {
            const path =
              mobilePaths[
                item.key
              ];

            const active =
              activeKey ===
              item.key;

            return (
              <g
                key={
                  item.key
                }
              >

                <motion.path
                  d={
                    path
                  }
                  fill="none"
                  stroke={
                    active
                      ? "var(--gold)"
                      : "var(--network-line)"
                  }
                  strokeWidth={
                    active
                      ? 2.4
                      : 1.15
                  }
                  strokeLinecap="round"
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

                    amount:
                      0.2,
                  }}
                  transition={{
                    duration:
                      1.05,

                    delay:
                      index *
                      0.07,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                />

                <circle
                  r={
                    active
                      ? 4
                      : 3
                  }
                  fill={
                    active
                      ? "var(--gold)"
                      : "var(--network-particle)"
                  }
                  opacity="0.95"
                >

                  <animateMotion
                    dur={`${3.1 + index * 0.32}s`}
                    repeatCount="indefinite"
                    path={
                      path
                    }
                  />

                </circle>

                <circle
                  r="2"
                  fill="var(--network-particle)"
                  opacity="0.42"
                >

                  <animateMotion
                    dur={`${4.6 + index * 0.25}s`}
                    begin={`${index * 0.28}s`}
                    repeatCount="indefinite"
                    path={
                      path
                    }
                  />

                </circle>

              </g>
            );
          }
        )}

      </svg>

      {/* CENTER */}

      <div className="absolute left-1/2 top-1/2 z-20 w-[156px] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-[var(--gold)] bg-[var(--network-center)] px-4 py-4 text-center shadow-[0_18px_58px_var(--gold-halo)]">

        <div className="mx-auto mb-2.5 h-2 w-2 rounded-full bg-[var(--gold)] shadow-[0_0_0_6px_var(--gold-halo)]" />

        <p className="text-[10px] font-semibold tracking-[0.045em] text-[var(--ink)]">

          {
            centerTitle
          }

        </p>

        <p className="mt-1 text-[7px] uppercase tracking-[0.09em] text-[var(--muted)]">

          {
            centerSubtitle
          }

        </p>

      </div>

      {/* STAR NODES */}

      {items.map(
        (
          item
        ) => {
          const active =
            activeKey ===
            item.key;

          const development =
            item.key ===
            "development";

          return (
            <button
              key={
                item.key
              }
              type="button"
              aria-pressed={
                active
              }
              onFocus={() =>
                setActiveKey(
                  item.key
                )
              }
              onClick={() =>
                setActiveKey(
                  item.key
                )
              }
              className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-[16px] border px-2.5 py-2.5 text-left transition-all duration-300 ${mobilePositions[item.key]} ${
                development
                  ? "w-[164px]"
                  : "w-[116px]"
              } ${
                active
                  ? "scale-[1.04] border-[var(--gold)] bg-[var(--surface)] shadow-[0_12px_42px_var(--gold-halo)]"
                  : "border-[var(--line)] bg-[var(--surface)]/90"
              }`}
            >

              <div className="flex items-start justify-between gap-1.5">

                <p className="text-[9px] font-semibold leading-[1.25] text-[var(--ink)]">

                  {
                    item.title
                  }

                </p>

                <span
                  className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full transition-all ${
                    active
                      ? "bg-[var(--gold)] shadow-[0_0_0_4px_var(--gold-halo)]"
                      : "bg-[var(--line)]"
                  }`}
                />

              </div>

              <p className="mt-1 text-[6.5px] leading-[1.35] text-[var(--muted)]">

                {
                  item.short
                }

              </p>

              <div className="mt-2 flex gap-1">

                {Array.from({
                  length:
                    active
                      ? 4
                      : 2,
                }).map(
                  (
                    _,
                    index
                  ) => (
                    <span
                      key={
                        index
                      }
                      className="h-1 w-1 rounded-full bg-[var(--gold)]"
                    />
                  )
                )}

              </div>

            </button>
          );
        }
      )}

    </div>
  );
}

/* =========================================================
   METRICS
========================================================= */

function MetricCard({
  value,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="metric-card group h-full rounded-[24px] border border-[var(--line)] bg-[var(--surface)]/78 p-6 backdrop-blur-md">

      <div className="flex items-baseline gap-1">

        <span className="text-[13px] font-medium text-[var(--gold-dark)]">

          {
            prefix
          }

        </span>

        <CountUp
          value={
            value
          }
          suffix={
            suffix
          }
        />

      </div>

      <div className="mt-5 h-[1px] w-10 bg-[var(--gold)] transition-all duration-300 group-hover:w-20" />

      <p className="mt-5 text-sm font-light leading-6 text-[var(--body-text)]">

        {
          label
        }

      </p>

    </div>
  );
}

function CountUp({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref =
    useRef<HTMLSpanElement>(
      null
    );

  const inView =
    useInView(
      ref,
      {
        once:
          true,

        margin:
          "-60px",
      }
    );

  const [
    display,
    setDisplay,
  ] =
    useState(
      0
    );

  useEffect(() => {
    if (
      !inView
    ) {
      return;
    }

    let frame =
      0;

    const start =
      performance.now();

    const duration =
      1200;

    const animate = (
      now: number
    ) => {
      const progress =
        Math.min(
          1,

          (
            now -
            start
          ) /
            duration
        );

      const eased =
        1 -
        Math.pow(
          1 -
            progress,

          3
        );

      setDisplay(
        Math.round(
          value *
            eased
        )
      );

      if (
        progress <
        1
      ) {
        frame =
          requestAnimationFrame(
            animate
          );
      }
    };

    frame =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        frame
      );
    };
  }, [
    inView,
    value,
  ]);

  return (
    <span
      ref={
        ref
      }
      className="text-[42px] font-semibold leading-none tracking-[-0.05em] text-[var(--ink)] lg:text-[52px]"
    >

      {
        display
      }

      {
        suffix
      }

    </span>
  );
}

/* =========================================================
   REVEAL
========================================================= */

function Reveal({
  children,
  delay = 0,
}: {
  children:
    React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity:
          0,

        y:
          28,
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
          0.15,
      }}
      transition={{
        duration:
          0.7,

        delay,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >

      {
        children
      }

    </motion.div>
  );
}