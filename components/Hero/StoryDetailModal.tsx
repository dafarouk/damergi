"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ArrowLeft,
  ArrowRight,
  ImageIcon,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  Language,
  TimelineItem,
} from "@/data/timeline";

import {
  getTimelineDetail,
} from "@/data/timelineDetails";

type StoryDetailModalProps = {
  item: TimelineItem | null;
  language: Language;
  position: number;
  total: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectPosition: (
    index: number
  ) => void;
};

export default function StoryDetailModal({
  item,
  language,
  position,
  total,
  hasPrevious,
  hasNext,
  onClose,
  onPrevious,
  onNext,
  onSelectPosition,
}: StoryDetailModalProps) {
  const detail =
    item
      ? getTimelineDetail(
          item.id,
          language
        )
      : null;

  useEffect(() => {
    if (!item) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        onClose();
      }

      if (
        event.key ===
          "ArrowLeft" &&
        hasPrevious
      ) {
        onPrevious();
      }

      if (
        event.key ===
          "ArrowRight" &&
        hasNext
      ) {
        onNext();
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
  }, [
    item,
    hasPrevious,
    hasNext,
    onClose,
    onPrevious,
    onNext,
  ]);

  if (
    !item ||
    !detail
  ) {
    return null;
  }

  const content =
    detail.content;

  const labels =
    language === "fr"
      ? {
          close: "Fermer",
          previous:
            "Précédent",
          next: "Suivant",
          keyFigures:
            "En quelques chiffres",
          tools:
            "Outils & technologies",
          imageHint:
            "Image à ajouter",
          chapter:
            "Chapitre",
        }
      : {
          close: "Close",
          previous:
            "Previous",
          next: "Next",
          keyFigures:
            "Key figures",
          tools:
            "Tools & technologies",
          imageHint:
            "Image to add",
          chapter:
            "Chapter",
        };

  return (
    <AnimatePresence>
      <motion.div
        key="detail-modal"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 lg:p-7"
      >

        {/* BACKDROP */}
        <button
          type="button"
          aria-label={
            labels.close
          }
          onClick={
            onClose
          }
          className="absolute inset-0 cursor-default bg-[#0b1019]/55 backdrop-blur-[14px]"
        />

        {/* WINDOW */}
        <motion.div
          initial={{
            opacity: 0,
            y: 32,
            scale: 0.975,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 22,
            scale: 0.985,
          }}
          transition={{
            duration: 0.42,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          role="dialog"
          aria-modal="true"
          aria-label={
            item.title
          }
          className="relative z-10 grid h-[96dvh] max-h-[96dvh] w-full max-w-[1460px] min-h-0 overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface)] shadow-[0_45px_140px_rgba(0,0,0,0.38)] lg:h-[90vh] lg:max-h-[90vh] lg:grid-cols-[0.82fr_1.18fr] lg:rounded-[34px]"
        >

          {/* CLOSE */}
          <button
            type="button"
            onClick={
              onClose
            }
            aria-label={
              labels.close
            }
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] shadow-sm transition hover:scale-105 hover:border-[var(--gold)] hover:text-[var(--gold-dark)] lg:right-5 lg:top-5 lg:h-11 lg:w-11"
          >
            <X
              size={19}
              strokeWidth={
                1.7
              }
            />
          </button>

          {/* DESKTOP LEFT VISUAL */}
          <div className="relative hidden h-full min-h-0 overflow-hidden border-r border-[var(--line)] bg-[#151b26] lg:block">

            <DetailVisual
              visualMode={
                detail.visualMode
              }
              imagePath={
                detail.imagePath
              }
              logoPath={
                detail.logoPath
              }
              toolLogos={
                detail.toolLogos
              }
              caption={
                content.imageCaption
              }
              hint={
                labels.imageHint
              }
            />

          </div>

          {/* RIGHT / MOBILE FULL COLUMN */}
          <div className="flex min-h-0 flex-col overflow-hidden">

            {/* EVERYTHING EXCEPT FOOTER SCROLLS */}
            <div className="modal-detail-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">

              <AnimatePresence
                mode="wait"
              >
                <motion.div
                  key={
                    item.id +
                    "-" +
                    language
                  }
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration:
                      0.3,
                  }}
                >

                  {/* MOBILE VISUAL */}
                  <div className="relative mx-3 mt-3 h-[230px] overflow-hidden rounded-[20px] bg-[#151b26] sm:h-[300px] lg:hidden">

                    <DetailVisual
                      visualMode={
                        detail.visualMode
                      }
                      imagePath={
                        detail.imagePath
                      }
                      logoPath={
                        detail.logoPath
                      }
                      toolLogos={
                        detail.toolLogos
                      }
                      caption={
                        content.imageCaption
                      }
                      hint={
                        labels.imageHint
                      }
                    />

                  </div>

                  {/* HEADER */}
                  <div className="border-b border-[var(--line)] px-5 pb-7 pr-16 pt-6 sm:px-7 lg:px-11 lg:pb-9 lg:pr-24 lg:pt-10">

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)] lg:text-[10px]">
                        {
                          item.period
                        }
                      </span>

                      <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />

                      <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] lg:text-[10px]">
                        {String(
                          position
                        ).padStart(
                          2,
                          "0"
                        )}

                        {" / "}

                        {String(
                          total
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                    </div>

                    <h2 className="mt-4 max-w-[760px] text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--ink)] sm:text-4xl lg:mt-5 lg:text-[42px]">
                      {
                        item.title
                      }
                    </h2>

                    <p className="mt-3 text-base font-light text-[var(--muted)] lg:text-lg">
                      {
                        item.subtitle
                      }
                    </p>

                    <div className="mt-5 h-[2px] w-16 bg-[var(--gold)] lg:mt-6 lg:w-20" />

                    <p className="mt-5 max-w-[820px] text-[15px] font-light leading-7 text-[var(--body-text)] lg:mt-6 lg:text-[16px]">
                      {
                        content.intro
                      }
                    </p>

                  </div>

                  {/* DETAIL CONTENT */}
                  <div className="px-5 py-7 sm:px-7 lg:px-11 lg:py-9">

                    <div className="space-y-9">

                      {content.sections.map(
                        (
                          section,
                          index
                        ) => (
                          <section
                            key={
                              section.title
                            }
                          >
                            <div className="flex gap-4 lg:gap-5">

                              <span className="mt-[3px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--gold-soft)] text-[9px] font-semibold text-[var(--gold-dark)]">
                                {String(
                                  index +
                                    1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              <div className="min-w-0 flex-1">

                                <h3 className="text-base font-semibold tracking-[-0.015em] text-[var(--ink)] lg:text-lg">
                                  {
                                    section.title
                                  }
                                </h3>

                                {section.text && (
                                  <p className="mt-3 max-w-[780px] text-[14px] font-light leading-7 text-[var(--body-text)] lg:text-[15px]">
                                    {
                                      section.text
                                    }
                                  </p>
                                )}

                                {section.bullets && (
                                  <ul className="mt-4 grid gap-x-8 gap-y-2.5 md:grid-cols-2">

                                    {section.bullets.map(
                                      (
                                        bullet
                                      ) => (
                                        <li
                                          key={
                                            bullet
                                          }
                                          className="flex gap-3 text-[13px] leading-6 text-[var(--body-text)] lg:text-[14px]"
                                        >
                                          <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />

                                          <span>
                                            {
                                              bullet
                                            }
                                          </span>
                                        </li>
                                      )
                                    )}

                                  </ul>
                                )}

                              </div>
                            </div>
                          </section>
                        )
                      )}

                      {/* METRICS */}
                      {content.metrics &&
                        content.metrics.length >
                          0 && (
                          <section className="border-t border-[var(--line)] pt-8">

                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                              {
                                labels.keyFigures
                              }
                            </p>

                            <div className="grid gap-3 sm:grid-cols-2">

                              {content.metrics.map(
                                (
                                  metric
                                ) => (
                                  <div
                                    key={
                                      metric
                                    }
                                    className="rounded-2xl border border-[var(--line)] bg-[var(--page)] px-4 py-4 text-sm font-medium leading-5 text-[var(--ink)]"
                                  >
                                    {
                                      metric
                                    }
                                  </div>
                                )
                              )}

                            </div>
                          </section>
                        )}

                      {/* TOOLS */}
                      {content.tools &&
                        content.tools.length >
                          0 && (
                          <section>

                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                              {
                                labels.tools
                              }
                            </p>

                            <div className="flex flex-wrap gap-2">

                              {content.tools.map(
                                (
                                  tool
                                ) => (
                                  <span
                                    key={
                                      tool
                                    }
                                    className="rounded-full border border-[var(--gold-soft)] bg-[var(--page)] px-3.5 py-2 text-xs font-medium text-[var(--ink)]"
                                  >
                                    {
                                      tool
                                    }
                                  </span>
                                )
                              )}

                            </div>
                          </section>
                        )}

                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>

            {/* FIXED FOOTER */}
            <div className="relative z-30 shrink-0 border-t border-[var(--line)] bg-[var(--surface)] px-4 py-3 sm:px-7 sm:py-4 lg:px-11 lg:py-5">

              <div className="flex items-center justify-between gap-3">

                <button
                  type="button"
                  disabled={
                    !hasPrevious
                  }
                  onClick={
                    onPrevious
                  }
                  className="group flex items-center gap-2 rounded-full border border-[var(--line)] px-3.5 py-2.5 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-25 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
                >
                  <ArrowLeft
                    size={16}
                    className="transition-transform group-hover:-translate-x-1"
                  />

                  <span className="hidden xs:inline sm:inline">
                    {
                      labels.previous
                    }
                  </span>
                </button>

                {/* CLICKABLE DOTS */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">

                  {Array.from({
                    length:
                      total,
                  }).map(
                    (
                      _,
                      index
                    ) => {
                      const active =
                        index +
                          1 ===
                        position;

                      return (
                        <button
                          key={
                            index
                          }
                          type="button"
                          onClick={() =>
                            onSelectPosition(
                              index
                            )
                          }
                          aria-label={`${labels.chapter} ${
                            index +
                            1
                          }`}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            active
                              ? "w-6 bg-[var(--gold)] sm:w-7"
                              : "w-2 bg-[var(--line)] hover:bg-[var(--gold-soft)]"
                          }`}
                        />
                      );
                    }
                  )}

                </div>

                <button
                  type="button"
                  disabled={
                    !hasNext
                  }
                  onClick={
                    onNext
                  }
                  className="group flex items-center gap-2 rounded-full bg-[#111827] px-3.5 py-2.5 text-xs font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-25 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
                >
                  <span className="hidden sm:inline">
                    {
                      labels.next
                    }
                  </span>

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   VISUAL ROUTER
========================================================= */

function DetailVisual({
  visualMode,
  imagePath,
  logoPath,
  toolLogos,
  caption,
  hint,
}: {
  visualMode?:
    | "image"
    | "logo"
    | "tools";

  imagePath?: string;
  logoPath?: string;

  toolLogos?: {
    name: string;
    path: string;
  }[];

  caption?: string;
  hint: string;
}) {
  if (
    visualMode ===
    "logo"
  ) {
    return (
      <LogoOnlyVisual
        logoPath={
          logoPath
        }
        caption={
          caption
        }
      />
    );
  }

  if (
    visualMode ===
    "tools"
  ) {
    return (
      <ToolLogoVisual
        tools={
          toolLogos ??
          []
        }
        caption={
          caption
        }
      />
    );
  }

  return (
    <ImageVisual
      src={
        imagePath
      }
      logoPath={
        logoPath
      }
      caption={
        caption
      }
      hint={
        hint
      }
    />
  );
}

/* =========================================================
   STANDARD IMAGE
========================================================= */

function ImageVisual({
  src,
  logoPath,
  caption,
  hint,
}: {
  src?: string;
  logoPath?: string;
  caption?: string;
  hint: string;
}) {
  const [
    failed,
    setFailed,
  ] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (
    !src ||
    failed
  ) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#171e29] text-center">

        <ImageIcon
          size={30}
          strokeWidth={
            1.2
          }
          className="text-white/35"
        />

        <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/35">
          {hint}
        </p>

      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">

      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
      />

      <div className="absolute inset-0 bg-[#111827]/25" />

      <img
        src={src}
        alt={
          caption ?? ""
        }
        onError={() =>
          setFailed(true)
        }
        className="absolute inset-0 h-full w-full object-contain"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-transparent to-[#111827]/10" />

      {logoPath && (
        <div className="absolute left-5 top-5 z-20 lg:left-8 lg:top-8">

          <LogoCard
            src={
              logoPath
            }
          />

        </div>
      )}

      {caption && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 lg:p-8">

          <div className="mb-3 h-[2px] w-12 bg-[var(--gold)] lg:mb-4 lg:w-14" />

          <p className="max-w-[420px] text-base font-medium leading-snug text-white lg:text-xl">
            {caption}
          </p>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   LOGO ONLY
========================================================= */

function LogoOnlyVisual({
  logoPath,
  caption,
}: {
  logoPath?: string;
  caption?: string;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#151c28]">

      <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:54px_54px]" />

      <div className="absolute h-[310px] w-[310px] rounded-full border border-[var(--gold)]/20 lg:h-[420px] lg:w-[420px]" />

      <div className="absolute h-[240px] w-[240px] rounded-full border border-dashed border-white/10 lg:h-[330px] lg:w-[330px]" />

      <div className="absolute h-[200px] w-[200px] rounded-full bg-[var(--gold)]/5 blur-3xl lg:h-[250px] lg:w-[250px]" />

      {logoPath && (
        <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-[28px] border border-white/15 bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] lg:h-52 lg:w-52 lg:rounded-[38px] lg:p-8">

          <img
            src={
              logoPath
            }
            alt={
              caption ?? ""
            }
            className="max-h-[90px] max-w-[110px] object-contain lg:max-h-[130px] lg:max-w-[150px]"
          />

        </div>
      )}

      {caption && (
        <div className="absolute bottom-6 left-5 right-5 text-center lg:bottom-10 lg:left-8 lg:right-8">

          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)] lg:text-[10px]">
            {caption}
          </p>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   FREELANCE TOOL WALL
========================================================= */

function ToolLogoVisual({
  tools,
  caption,
}: {
  tools: {
    name: string;
    path: string;
  }[];
  caption?: string;
}) {
  return (
    <div className="absolute inset-0 overflow-y-auto bg-[#151c28] px-5 py-6 lg:px-8 lg:py-10">

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:54px_54px]" />

      <div className="relative z-10">

        <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--gold)] lg:text-[10px]">
          Freelance
        </p>

        <h3 className="mt-2 text-xl font-medium tracking-[-0.025em] text-white lg:mt-3 lg:text-3xl">
          Creative & Web Toolkit
        </h3>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:mt-10 lg:grid-cols-2 lg:gap-4">

          {tools.map(
            (
              tool
            ) => (
              <ToolLogoCard
                key={
                  tool.name
                }
                name={
                  tool.name
                }
                path={
                  tool.path
                }
              />
            )
          )}

        </div>

      </div>

      {caption && (
        <p className="relative z-10 mt-6 text-center text-[9px] uppercase tracking-[0.2em] text-white/35 lg:mt-8 lg:text-[10px]">
          {caption}
        </p>
      )}

    </div>
  );
}

function ToolLogoCard({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const [
    failed,
    setFailed,
  ] = useState(false);

  return (
    <div className="flex min-h-[86px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.055] p-2 text-center backdrop-blur-sm transition hover:border-[var(--gold)]/40 hover:bg-white/[0.08] lg:min-h-[116px] lg:rounded-2xl lg:p-4">

      {!failed ? (
        <img
          src={path}
          alt={name}
          onError={() =>
            setFailed(true)
          }
          className="h-8 w-12 object-contain lg:h-12 lg:w-16"
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[10px] font-semibold text-white/40 lg:h-12 lg:w-12 lg:text-sm">
          {name
            .slice(
              0,
              2
            )
            .toUpperCase()}
        </div>
      )}

      <p className="mt-2 text-[9px] font-medium leading-3 text-white/65 lg:mt-3 lg:text-[11px]">
        {name}
      </p>

    </div>
  );
}

function LogoCard({
  src,
}: {
  src: string;
}) {
  const [
    failed,
    setFailed,
  ] = useState(false);

  if (
    failed
  ) {
    return null;
  }

  return (
    <div className="flex h-[64px] min-w-[64px] items-center justify-center rounded-xl border border-white/20 bg-white/95 p-2 shadow-lg lg:h-[82px] lg:min-w-[82px] lg:rounded-2xl lg:p-3">

      <img
        src={src}
        alt=""
        onError={() =>
          setFailed(true)
        }
        className="max-h-10 max-w-[90px] object-contain lg:max-h-12 lg:max-w-[120px]"
      />

    </div>
  );
}