"use client";

import Image from "next/image";

import {
  motion,
} from "motion/react";

import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Mail,
  Phone,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import {
  timelineByLanguage,
  type Language,
} from "@/data/timeline";

import {
  timelineDetails,
} from "@/data/timelineDetails";

import StoryDetailModal from "@/components/Hero/StoryDetailModal";
import CVModal from "@/components/CV/CVModal";

type StoryHeroProps = {
  language: Language;
};

export default function StoryHero({
  language,
}: StoryHeroProps) {
  const storyRef =
    useRef<HTMLDivElement>(
      null
    );

  const desktopStoryItemsRef =
    useRef<
      (HTMLElement | null)[]
    >([]);

  const mobileStoryItemsRef =
    useRef<
      (HTMLElement | null)[]
    >([]);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState<
    number | null
  >(null);

  const [
    copied,
    setCopied,
  ] = useState<
    string | null
  >(null);

  const [
    cvOpen,
    setCvOpen,
  ] = useState(false);

  /*
    PHONE ONLY:
    Journey starts collapsed below 768px.
  */
  const [
    mobileJourneyOpen,
    setMobileJourneyOpen,
  ] = useState(false);

  const timeline =
    timelineByLanguage[
      language
    ];

  const labels =
    language === "fr"
      ? {
          journey:
            "Mon parcours",

          learnMore:
            "En savoir plus",

          scroll:
            "Faites défiler mon parcours",

          showJourney:
            "Afficher mon parcours",

          hideJourney:
            "Masquer mon parcours",

          connected:
            "Restons connectés",

          contacts:
            "Mes contacts",

          emailCopied:
            "Email copié",

          phoneCopied:
            "Téléphone copié",

          email:
            "Email",

          phone:
            "Téléphone",

          cv:
            "Voir mon CV",

          goTo:
            "Aller à",

          mobileIntro:
            "Mon parcours",
        }
      : {
          journey:
            "My journey",

          learnMore:
            "Learn more",

          scroll:
            "Scroll through my journey",

          showJourney:
            "Show my journey",

          hideJourney:
            "Hide my journey",

          connected:
            "Let's connect",

          contacts:
            "My contacts",

          emailCopied:
            "Email copied",

          phoneCopied:
            "Phone copied",

          email:
            "Email",

          phone:
            "Phone",

          cv:
            "View my CV",

          goTo:
            "Go to",

          mobileIntro:
            "My journey",
        };

  const detailIndexes =
    timeline
      .map(
        (
          item,
          index
        ) =>
          timelineDetails[
            item.id
          ]
            ? index
            : null
      )
      .filter(
        (
          index
        ): index is number =>
          index !== null
      );

  useEffect(() => {
    const container =
      storyRef.current;

    if (!container)
      return;

    const updateActiveStory =
      () => {
        const elements =
          desktopStoryItemsRef.current;

        const center =
          container.scrollTop +
          container.clientHeight /
            2;

        let nearestIndex =
          0;

        let nearestDistance =
          Number.POSITIVE_INFINITY;

        elements.forEach(
          (
            element,
            index
          ) => {
            if (!element)
              return;

            const elementCenter =
              element.offsetTop +
              element.offsetHeight /
                2;

            const distance =
              Math.abs(
                elementCenter -
                  center
              );

            if (
              distance <
              nearestDistance
            ) {
              nearestDistance =
                distance;

              nearestIndex =
                index;
            }
          }
        );

        setCurrentIndex(
          nearestIndex
        );
      };

    container.addEventListener(
      "scroll",
      updateActiveStory,
      {
        passive: true,
      }
    );

    updateActiveStory();

    return () => {
      container.removeEventListener(
        "scroll",
        updateActiveStory
      );
    };
  }, [
    timeline.length,
  ]);

  function goToStory(
    index: number
  ) {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    const mobileOrTablet =
      window.matchMedia(
        "(max-width: 1023px)"
      ).matches;

    const phone =
      window.matchMedia(
        "(max-width: 767px)"
      ).matches;

    if (
      mobileOrTablet
    ) {
      if (
        phone &&
        !mobileJourneyOpen
      ) {
        setMobileJourneyOpen(
          true
        );

        window.setTimeout(
          () => {
            const target =
              mobileStoryItemsRef.current[
                index
              ];

            if (!target)
              return;

            target.scrollIntoView({
              behavior:
                "smooth",

              block:
                "center",
            });

            setCurrentIndex(
              index
            );
          },
          180
        );

        return;
      }

      const target =
        mobileStoryItemsRef.current[
          index
        ];

      if (!target)
        return;

      target.scrollIntoView({
        behavior:
          "smooth",

        block:
          "center",
      });

      setCurrentIndex(
        index
      );

      return;
    }

    const container =
      storyRef.current;

    const target =
      desktopStoryItemsRef.current[
        index
      ];

    if (
      !container ||
      !target
    ) {
      return;
    }

    const desiredTop =
      target.offsetTop -
      Math.max(
        0,
        (
          container.clientHeight -
          target.offsetHeight
        ) /
          2
      );

    container.scrollTo({
      top:
        Math.max(
          0,
          desiredTop
        ),

      behavior:
        "smooth",
    });

    setCurrentIndex(
      index
    );
  }

  function openDetails(
    index: number
  ) {
    if (
      !timelineDetails[
        timeline[index].id
      ]
    ) {
      return;
    }

    setCurrentIndex(
      index
    );

    setSelectedIndex(
      index
    );
  }

  function closeDetails() {
    const index =
      selectedIndex;

    setSelectedIndex(
      null
    );

    if (
      index !== null
    ) {
      window.setTimeout(
        () => {
          goToStory(
            index
          );
        },
        80
      );
    }
  }

  function navigateModal(
    direction:
      | "previous"
      | "next"
  ) {
    if (
      selectedIndex ===
      null
    ) {
      return;
    }

    const currentPosition =
      detailIndexes.indexOf(
        selectedIndex
      );

    if (
      currentPosition ===
      -1
    ) {
      return;
    }

    const targetPosition =
      direction ===
      "next"
        ? currentPosition +
          1
        : currentPosition -
          1;

    if (
      targetPosition < 0 ||
      targetPosition >=
        detailIndexes.length
    ) {
      return;
    }

    const nextIndex =
      detailIndexes[
        targetPosition
      ];

    setCurrentIndex(
      nextIndex
    );

    setSelectedIndex(
      nextIndex
    );
  }

  function selectModalPosition(
    positionIndex: number
  ) {
    const timelineIndex =
      detailIndexes[
        positionIndex
      ];

    if (
      timelineIndex ===
      undefined
    ) {
      return;
    }

    setCurrentIndex(
      timelineIndex
    );

    setSelectedIndex(
      timelineIndex
    );
  }

  async function copyValue(
    label: string,
    value: string
  ) {
    try {
      await navigator.clipboard.writeText(
        value
      );
    } catch {
      const textarea =
        document.createElement(
          "textarea"
        );

      textarea.value =
        value;

      document.body.appendChild(
        textarea
      );

      textarea.select();

      document.execCommand(
        "copy"
      );

      textarea.remove();
    }

    setCopied(
      label
    );

    window.setTimeout(
      () => {
        setCopied(
          null
        );
      },
      1600
    );
  }

  const timelinePercent =
    timeline.length <=
    1
      ? 0
      : (
          currentIndex /
          (
            timeline.length -
            1
          )
        ) *
        100;

  const progressPixelAdjustment =
    (
      timelinePercent /
      100
    ) *
    64;

  const selectedDetailPosition =
    selectedIndex ===
    null
      ? -1
      : detailIndexes.indexOf(
          selectedIndex
        );

  return (
    <>
      <section
        id="home"
        className="hero-world relative overflow-hidden pb-[42px] text-[var(--ink)] lg:min-h-[calc(100vh-7rem)] lg:pb-[54px]"
      >

        {/* ===================================================
            BACKGROUND
        =================================================== */}

        <div className="pattern-world pointer-events-none absolute inset-0 overflow-hidden">

          <div className="pattern-layer">

            {Array.from({
              /*
                6 columns × 30 rows.

                This gives us enough AFD rows
                for the ENTIRE expanded mobile
                journey.

                The coordinates below are exact
                multiples of the square grid.
              */
              length:
                180,
            }).map(
              (
                _,
                index
              ) => {
                const column =
                  index % 6;

                const row =
                  Math.floor(
                    index / 6
                  );

                const style: CSSProperties =
                  {
                    left: `calc(var(--pattern-grid-size) * ${
                      2 +
                      column *
                        4
                    })`,

                    top: `calc(var(--pattern-grid-size) * ${
                      2 +
                      row *
                        4
                    })`,
                  };

                return (
                  <PatternLogo
                    key={
                      index
                    }
                    style={
                      style
                    }
                  />
                );
              }
            )}

          </div>

        </div>

        {/* ===================================================
            DESKTOP
        =================================================== */}

        <div className="relative z-10 mx-auto hidden max-w-[1800px] grid-cols-[1.15fr_0.78fr_0.7fr] items-start gap-8 px-14 pb-0 pt-2 lg:grid">

          {/* STORY */}

          <div className="relative flex h-[690px] max-h-[calc(100vh-11rem)] min-h-[560px] items-start">

            <div className="story-surface relative h-full w-full">

              <div className="pointer-events-none absolute left-2 top-4 flex items-center gap-3">

                <span className="h-[1px] w-9 bg-[var(--gold)]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                  {
                    labels.journey
                  }
                </span>

              </div>

              <div
                ref={
                  storyRef
                }
                className="story-scroll h-full overflow-y-auto pr-20 pt-14"
              >

                {timeline.map(
                  (
                    item,
                    index
                  ) => {
                    const hasDetails =
                      Boolean(
                        timelineDetails[
                          item.id
                        ]
                      );

                    return (
                      <section
                        key={
                          item.id
                        }
                        ref={(
                          element
                        ) => {
                          desktopStoryItemsRef.current[
                            index
                          ] =
                            element;
                        }}
                        className="story-chapter flex min-h-[520px] items-center pb-10 first:pt-20"
                      >

                        <div className="max-w-[650px]">

                          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--gold)]">
                            {
                              item.period
                            }
                          </p>

                          <h1 className="max-w-[620px] text-[44px] font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--ink)] xl:text-[50px]">
                            {
                              item.title
                            }
                          </h1>

                          <p className="mt-4 text-xl font-light text-[var(--muted)]">
                            {
                              item.subtitle
                            }
                          </p>

                          <motion.div
                            initial={{
                              width:
                                0,
                            }}
                            whileInView={{
                              width:
                                95,
                            }}
                            viewport={{
                              once:
                                false,

                              amount:
                                0.8,
                            }}
                            transition={{
                              duration:
                                0.8,

                              ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                              ],
                            }}
                            className="mt-7 h-[2px] rounded-full bg-[var(--gold)]"
                          />

                          <p className="mt-7 max-w-[610px] text-[17px] font-light leading-8 text-[var(--body-text)]">
                            {
                              item.description
                            }
                          </p>

                          {hasDetails && (
                            <button
                              type="button"
                              onClick={() =>
                                openDetails(
                                  index
                                )
                              }
                              className="group mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--gold-dark)]"
                            >
                              {
                                labels.learnMore
                              }

                              <ArrowUpRight
                                size={
                                  16
                                }
                                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                              />
                            </button>
                          )}

                          {item.type ===
                            "intro" && (
                            <button
                              type="button"
                              onClick={() =>
                                goToStory(
                                  1
                                )
                              }
                              className="scroll-journey-cta group mt-9 flex w-fit items-center gap-3 rounded-full border border-[var(--gold-soft)] bg-[var(--surface)] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)] transition hover:border-[var(--gold)] hover:text-[var(--gold-dark)]"
                            >
                              <ChevronDown
                                size={
                                  19
                                }
                                strokeWidth={
                                  1.8
                                }
                                className="scroll-indicator text-[var(--gold)]"
                              />

                              {
                                labels.scroll
                              }
                            </button>
                          )}

                        </div>

                      </section>
                    );
                  }
                )}

              </div>

              {/* CLICKABLE TIMELINE */}

              <div className="absolute bottom-16 right-1 top-16 z-20 w-[72px]">

                <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-[9px] font-semibold tracking-[0.12em] text-[var(--muted)]">
                  2018
                </span>

                <div className="pointer-events-none absolute bottom-8 left-1/2 top-8 w-[1px] -translate-x-1/2 bg-[var(--line)]" />

                <div
                  className="pointer-events-none absolute left-1/2 top-8 w-[2px] -translate-x-1/2 rounded-full bg-[var(--gold)] transition-[height] duration-300"
                  style={{
                    height: `calc(${timelinePercent}% - ${progressPixelAdjustment}px)`,
                  }}
                />

                <div
                  className="pointer-events-none absolute left-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--page)] bg-[var(--gold)] shadow-[0_0_0_6px_var(--gold-halo)] transition-[top] duration-300"
                  style={{
                    top: `calc(32px + ${timelinePercent}% - ${progressPixelAdjustment}px)`,
                  }}
                />

                {timeline.map(
                  (
                    item,
                    index
                  ) => {
                    const progress =
                      timeline.length <=
                      1
                        ? 0
                        : index /
                          (
                            timeline.length -
                            1
                          );

                    const percent =
                      progress *
                      100;

                    const pixelAdjustment =
                      progress *
                      64;

                    const isActive =
                      currentIndex ===
                      index;

                    return (
                      <button
                        key={
                          item.id
                        }
                        type="button"
                        title={`${labels.goTo} ${item.period}`}
                        aria-label={`${labels.goTo} ${item.period}`}
                        onClick={() =>
                          goToStory(
                            index
                          )
                        }
                        className="group absolute left-1/2 z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                        style={{
                          top: `calc(32px + ${percent}% - ${pixelAdjustment}px)`,
                        }}
                      >

                        <span
                          className={`block rounded-full border transition-all duration-200 ${
                            isActive
                              ? "h-3 w-3 border-[var(--gold)] bg-[var(--gold)]"
                              : "h-[7px] w-[7px] border-[var(--gold)] bg-[var(--page)] group-hover:h-3 group-hover:w-3 group-hover:bg-[var(--gold)]"
                          }`}
                        />

                        <span className="pointer-events-none absolute right-8 whitespace-nowrap rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.05em] text-[var(--ink)] opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100">
                          {
                            item.period
                          }
                        </span>

                      </button>
                    );
                  }
                )}

                <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-[0.12em] text-[var(--muted)]">
                  2027
                </span>

              </div>

            </div>

          </div>

          {/* PORTRAIT */}

          <DesktopPortrait />

          {/* CONTACTS */}

          <motion.aside
            id="contact-panel"
            initial={{
              opacity:
                0,

              x:
                30,
            }}
            animate={{
              opacity:
                1,

              x:
                0,
            }}
            transition={{
              delay:
                0.5,

              duration:
                0.8,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="contact-panel mt-24"
          >

            <ContactContent
              labels={
                labels
              }
              copied={
                copied
              }
              copyValue={
                copyValue
              }
              openCV={() =>
                setCvOpen(
                  true
                )
              }
            />

          </motion.aside>

        </div>

        {/* ===================================================
            MOBILE + TABLET
        =================================================== */}

        <div className="relative z-10 lg:hidden">

          {/* PORTRAIT */}

          <section className="relative overflow-hidden px-5 pb-10 pt-5 sm:px-8">

            <motion.div
              initial={{
                opacity:
                  0,

                y:
                  30,
              }}
              animate={{
                opacity:
                  1,

                y:
                  0,
              }}
              transition={{
                duration:
                  0.9,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="relative mx-auto h-[400px] max-w-[500px] select-none overflow-hidden sm:h-[500px]"
              onContextMenu={(event) =>
                event.preventDefault()
              }
            >

              <div className="aura-stage absolute -bottom-[95px] left-1/2 z-0 h-[560px] w-[560px] -translate-x-1/2 scale-[0.67] sm:-bottom-[50px] sm:scale-[0.82]">

                <div className="aura-soft-glow" />

                <div className="aura-ring aura-ring-outer" />

                <div className="aura-ring aura-ring-middle" />

                <div className="aura-ring aura-ring-inner" />

                <div className="aura-arc aura-arc-one" />

                <div className="aura-arc aura-arc-two" />

                <div className="aura-arc aura-arc-three" />

                <span className="aura-node aura-node-1" />

                <span className="aura-node aura-node-2" />

                <span className="aura-node aura-node-3" />

                <span className="aura-node aura-node-4" />

                <div className="aura-crosshair aura-crosshair-horizontal" />

                <div className="aura-crosshair aura-crosshair-vertical" />

              </div>

              <Image
                src="/images/portrait/portrait-farouk-3.png"
                alt="Ahmed-Farouk DAMERGI"
                width={540}
                height={800}
                priority
                draggable={false}
                className="pointer-events-none absolute bottom-0 left-1/2 z-10 max-h-[390px] w-auto -translate-x-1/2 select-none object-contain drop-shadow-[0_25px_35px_rgba(15,23,42,0.18)] sm:max-h-[490px]"
              />

            </motion.div>

            {/* WHO AM I */}

            <div className="relative mx-auto mt-8 max-w-xl text-center sm:mt-7">

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gold)]">
                {
                  timeline[0]
                    .period
                }
              </p>

              <h1 className="mt-3 text-[38px] font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">
                Ahmed-Farouk
                <br />
                DAMERGI
              </h1>

              <p className="mt-4 text-lg font-light text-[var(--muted)]">
                Data & Business
                Analyst
              </p>

              <div className="mx-auto mt-5 h-[2px] w-20 bg-[var(--gold)]" />

              <p className="mx-auto mt-6 max-w-lg text-[15px] font-light leading-7 text-[var(--body-text)]">
                {
                  timeline[0]
                    .description
                }
              </p>

              {/* PHONE ONLY */}

              <button
                type="button"
                aria-expanded={
                  mobileJourneyOpen
                }
                aria-controls="mobile-journey"
                onClick={() =>
                  setMobileJourneyOpen(
                    (
                      current
                    ) =>
                      !current
                  )
                }
                className={`mx-auto mt-8 flex items-center gap-3 rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.13em] backdrop-blur-md transition-all duration-300 md:hidden ${
                  mobileJourneyOpen
                    ? "border-[var(--gold)] bg-[var(--gold)] text-white shadow-[0_10px_35px_var(--gold-halo)]"
                    : "border-[var(--gold-soft)] bg-[var(--surface)]/75 text-[var(--ink)]"
                }`}
              >

                <ChevronDown
                  size={
                    18
                  }
                  strokeWidth={
                    1.8
                  }
                  className={`transition-transform duration-300 ${
                    mobileJourneyOpen
                      ? "rotate-180 text-white"
                      : "text-[var(--gold)]"
                  }`}
                />

                {mobileJourneyOpen
                  ? labels.hideJourney
                  : labels.showJourney}

              </button>

              {/* TABLET */}

              <button
                type="button"
                onClick={() =>
                  goToStory(
                    1
                  )
                }
                className="mx-auto mt-8 hidden items-center gap-3 rounded-full border border-[var(--gold-soft)] bg-[var(--surface)]/75 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.13em] text-[var(--ink)] backdrop-blur-md md:flex lg:hidden"
              >

                <ChevronDown
                  size={
                    18
                  }
                  strokeWidth={
                    1.8
                  }
                  className="scroll-indicator text-[var(--gold)]"
                />

                {
                  labels.scroll
                }

              </button>

            </div>

          </section>

          {/* JOURNEY */}

          <section
            id="mobile-journey"
            className={`px-5 pb-12 pt-6 sm:px-8 ${
              mobileJourneyOpen
                ? "block"
                : "hidden"
            } md:block`}
          >

            <div className="mx-auto max-w-[700px]">

              <div className="mb-8 flex items-center gap-3">

                <span className="h-[1px] w-10 bg-[var(--gold)]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[var(--muted)]">
                  {
                    labels.mobileIntro
                  }
                </p>

              </div>

              <div className="relative ml-2 border-l border-[var(--line)] pl-7 sm:pl-9">

                {timeline
                  .slice(
                    1
                  )
                  .map(
                    (
                      item,
                      mobileIndex
                    ) => {
                      const index =
                        mobileIndex +
                        1;

                      const hasDetails =
                        Boolean(
                          timelineDetails[
                            item.id
                          ]
                        );

                      return (
                        <article
                          key={
                            item.id
                          }
                          ref={(
                            element
                          ) => {
                            mobileStoryItemsRef.current[
                              index
                            ] =
                              element;
                          }}
                          className="relative pb-12 last:pb-4"
                        >

                          <span className="absolute -left-[33px] top-2 h-3 w-3 rounded-full border-2 border-[var(--page)] bg-[var(--gold)] shadow-[0_0_0_4px_var(--gold-halo)] sm:-left-[41px]" />

                          <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)]/78 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.04)] backdrop-blur-md sm:p-7">

                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                              {
                                item.period
                              }
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em] text-[var(--ink)] sm:text-3xl">
                              {
                                item.title
                              }
                            </h2>

                            <p className="mt-2 text-sm font-light leading-6 text-[var(--muted)] sm:text-base">
                              {
                                item.subtitle
                              }
                            </p>

                            <div className="mt-5 h-[2px] w-14 bg-[var(--gold)]" />

                            <p className="mt-5 text-[14px] font-light leading-7 text-[var(--body-text)] sm:text-[15px]">
                              {
                                item.description
                              }
                            </p>

                            {hasDetails && (
                              <button
                                type="button"
                                onClick={() =>
                                  openDetails(
                                    index
                                  )
                                }
                                className="group mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--gold-dark)]"
                              >
                                {
                                  labels.learnMore
                                }

                                <ArrowUpRight
                                  size={
                                    15
                                  }
                                />

                              </button>
                            )}

                          </div>

                        </article>
                      );
                    }
                  )}

              </div>

              {/* PHONE ONLY BOTTOM HIDE */}

              <button
                type="button"
                onClick={() => {
                  setMobileJourneyOpen(
                    false
                  );

                  window.setTimeout(
                    () => {
                      document
                        .getElementById(
                          "home"
                        )
                        ?.scrollIntoView({
                          behavior:
                            "smooth",

                          block:
                            "start",
                        });
                    },
                    50
                  );
                }}
                className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-[var(--gold-soft)] bg-[var(--surface)]/75 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--gold-dark)] backdrop-blur-md md:hidden"
              >

                <ChevronDown
                  size={
                    16
                  }
                  className="rotate-180"
                />

                {
                  labels.hideJourney
                }

              </button>

            </div>

          </section>

          {/* CONTACT */}

          <section
            id="mobile-contact-panel"
            className="contact-panel mx-5 mb-20 mt-8 sm:mx-8"
          >

            <ContactContent
              labels={
                labels
              }
              copied={
                copied
              }
              copyValue={
                copyValue
              }
              openCV={() =>
                setCvOpen(
                  true
                )
              }
            />

          </section>

        </div>

      </section>

      {/* TICKER */}

      <div className="fixed bottom-0 left-0 z-40 h-[42px] w-full overflow-hidden border-t border-white/10 bg-[#111827]/97 text-white backdrop-blur-xl lg:h-[54px]">

        <div className="ticker-track flex h-full w-max items-center whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.2em] text-white/65 lg:text-[11px] lg:tracking-[0.22em]">

          <TickerContent />

          <TickerContent />

        </div>

      </div>

      {/* DETAIL MODAL */}

      <StoryDetailModal
        item={
          selectedIndex ===
          null
            ? null
            : timeline[
                selectedIndex
              ]
        }
        language={
          language
        }
        position={
          selectedDetailPosition +
          1
        }
        total={
          detailIndexes.length
        }
        hasPrevious={
          selectedDetailPosition >
          0
        }
        hasNext={
          selectedDetailPosition >=
            0 &&
          selectedDetailPosition <
            detailIndexes.length -
              1
        }
        onClose={
          closeDetails
        }
        onPrevious={() =>
          navigateModal(
            "previous"
          )
        }
        onNext={() =>
          navigateModal(
            "next"
          )
        }
        onSelectPosition={
          selectModalPosition
        }
      />

      {/* CV */}

      <CVModal
        open={
          cvOpen
        }
        language={
          language
        }
        onClose={() =>
          setCvOpen(
            false
          )
        }
      />

    </>
  );
}

/* =========================================================
   DESKTOP PORTRAIT
========================================================= */

function DesktopPortrait() {
  return (
    <div className="relative flex h-[690px] max-h-[calc(100vh-11rem)] translate-y-[45px] items-end justify-center">

      <div className="aura-stage absolute -bottom-3 left-1/2 z-0 h-[560px] w-[560px] -translate-x-1/2">

        <div className="aura-soft-glow" />

        <div className="aura-ring aura-ring-outer" />

        <div className="aura-ring aura-ring-middle" />

        <div className="aura-ring aura-ring-inner" />

        <div className="aura-arc aura-arc-one" />

        <div className="aura-arc aura-arc-two" />

        <div className="aura-arc aura-arc-three" />

        <span className="aura-node aura-node-1" />

        <span className="aura-node aura-node-2" />

        <span className="aura-node aura-node-3" />

        <span className="aura-node aura-node-4" />

        <div className="aura-crosshair aura-crosshair-horizontal" />

        <div className="aura-crosshair aura-crosshair-vertical" />

      </div>

      <motion.div
        initial={{
          opacity:
            0,

          y:
            55,

          scale:
            0.96,
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
          delay:
            0.12,

          duration:
            1,

          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="relative z-10 flex h-full select-none items-end justify-center"
        onContextMenu={(event) =>
          event.preventDefault()
        }
      >

        <Image
          src="/images/portrait/portrait-farouk-3.png"
          alt="Ahmed-Farouk DAMERGI"
          width={
            540
          }
          height={
            800
          }
          priority
          draggable={false}
          className="pointer-events-none max-h-[560px] w-auto select-none object-contain drop-shadow-[0_30px_38px_rgba(15,23,42,0.18)]"
        />

      </motion.div>

    </div>
  );
}

/* =========================================================
   CONTACT
========================================================= */

type ContactLabels = {
  connected: string;
  contacts: string;
  emailCopied: string;
  phoneCopied: string;
  email: string;
  phone: string;
  cv: string;
};

function ContactContent({
  labels,
  copied,
  copyValue,
  openCV,
}: {
  labels:
    ContactLabels;

  copied:
    string | null;

  copyValue: (
    label: string,
    value: string
  ) => Promise<void>;

  openCV:
    () => void;
}) {
  return (
    <>

      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
        {
          labels.connected
        }
      </p>

      <h2 className="mt-3 text-2xl font-medium tracking-[-0.02em] text-[var(--ink)]">
        {
          labels.contacts
        }
      </h2>

      <div className="mt-6 space-y-1.5 lg:mt-7 lg:space-y-2">

        <a
          href="https://linkedin.com/in/farouk-damergi"
          target="_blank"
          rel="noreferrer"
          className="contact-row group"
        >

          <LinkedInLogo />

          <span>
            LinkedIn
          </span>

          <ArrowUpRight
            size={
              16
            }
            className="ml-auto text-[var(--muted)] transition group-hover:-translate-y-1 group-hover:translate-x-1"
          />

        </a>

        <a
          href="https://github.com/dafarouk"
          target="_blank"
          rel="noreferrer"
          className="contact-row group"
        >

          <GitHubLogo />

          <span>
            GitHub
          </span>

          <ArrowUpRight
            size={
              16
            }
            className="ml-auto text-[var(--muted)] transition group-hover:-translate-y-1 group-hover:translate-x-1"
          />

        </a>

        <button
          type="button"
          onClick={() =>
            copyValue(
              "email",
              "fdamergi@gmail.com"
            )
          }
          className="contact-row w-full"
        >

          <Mail
            size={
              18
            }
            strokeWidth={
              1.6
            }
          />

          <span>
            {copied ===
            "email"
              ? labels.emailCopied
              : labels.email}
          </span>

          {copied ===
          "email" ? (
            <Check
              size={
                16
              }
              className="ml-auto text-[var(--gold)]"
            />
          ) : (
            <Copy
              size={
                15
              }
              className="ml-auto text-[var(--muted)]"
            />
          )}

        </button>

        <button
          type="button"
          onClick={() =>
            copyValue(
              "phone",
              "+33 7 59 85 17 32"
            )
          }
          className="contact-row w-full"
        >

          <Phone
            size={
              18
            }
            strokeWidth={
              1.6
            }
          />

          <span>
            {copied ===
            "phone"
              ? labels.phoneCopied
              : labels.phone}
          </span>

          {copied ===
          "phone" ? (
            <Check
              size={
                16
              }
              className="ml-auto text-[var(--gold)]"
            />
          ) : (
            <Copy
              size={
                15
              }
              className="ml-auto text-[var(--muted)]"
            />
          )}

        </button>

        <button
          type="button"
          onClick={
            openCV
          }
          className="contact-row group w-full"
        >

          <FileText
            size={
              18
            }
            strokeWidth={
              1.6
            }
          />

          <span>
            {
              labels.cv
            }
          </span>

          <ArrowUpRight
            size={
              16
            }
            className="ml-auto text-[var(--muted)] transition group-hover:-translate-y-1 group-hover:translate-x-1"
          />

        </button>

      </div>

    </>
  );
}

/* =========================================================
   BACKGROUND LOGO
========================================================= */

function PatternLogo({
  style,
}: {
  style:
    CSSProperties;
}) {
  return (
    <div
      className="pattern-logo"
      style={
        style
      }
    >

      <Image
        src="/images/branding/afd-gold.png"
        alt=""
        width={
          110
        }
        height={
          110
        }
        className="pattern-logo-light"
      />

      <Image
        src="/images/branding/afd-white.png"
        alt=""
        width={
          110
        }
        height={
          110
        }
        className="pattern-logo-dark"
      />

    </div>
  );
}

/* =========================================================
   TICKER
========================================================= */

function TickerContent() {
  return (
    <span className="pr-10">

      Data & Business Analyst
      <TickerDot />

      Power BI
      <TickerDot />

      SQL
      <TickerDot />

      Python
      <TickerDot />

      Business Intelligence
      <TickerDot />

      Performance Analytics
      <TickerDot />

      Automation
      <TickerDot />

      Excel
      <TickerDot />

      Data Quality
      <TickerDot />

      Reporting
      <TickerDot />

      Tableau
      <TickerDot />

      DAX
      <TickerDot />

      Power Query
      <TickerDot />

      VBA
      <TickerDot />

    </span>
  );
}

function TickerDot() {
  return (
    <span className="mx-3 text-[var(--gold)] lg:mx-4">
      ◆
    </span>
  );
}

/* =========================================================
   SOCIAL ICONS
========================================================= */

function LinkedInLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.352V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433A2.062 2.062 0 1 1 5.337 3.31a2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9H7.12v11.452Z" />
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .7C5.7.7.6 5.8.6 12.1c0 5 3.3 9.2 7.9 10.7.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.7.8 2.1 1.4.1-.8.4-1.4.7-1.7-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.8 5.5-5.3 5.8.4.4.8 1.1.8 2.1v3.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.7 7.9-10.7C23.4 5.8 18.3.7 12 .7Z" />
    </svg>
  );
}