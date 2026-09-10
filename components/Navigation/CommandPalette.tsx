"use client";

import {
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  FileText,
  Home,
  Mail,
  Search,
  Sparkles,
  Waypoints,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import type {
  Language,
} from "@/data/timeline";

type CommandPaletteProps = {
  language: Language;
};

type CommandItem = {
  id: string;
  label: string;
  description: string;
  keywords: string;

  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;

  action: () => void;
};

export default function CommandPalette({
  language,
}: CommandPaletteProps) {
  const pathname = usePathname();

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    query,
    setQuery,
  ] = useState("");

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const isFr =
    language === "fr";

  function goToHash(
    id: string
  ) {
    setOpen(false);

    if (
      pathname !== "/"
    ) {
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
      20
    );
  }

  function goToContact() {
    setOpen(false);

    const mobile =
      window.matchMedia(
        "(max-width: 1023px)"
      ).matches;

    const id =
      mobile
        ? "mobile-contact-panel"
        : "contact-panel";

    if (
      pathname !== "/"
    ) {
      window.location.href =
        `/#${id}`;

      return;
    }

    window.setTimeout(
      () => {
        const target =
          document.getElementById(
            id
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
      20
    );
  }

  const commands =
    useMemo<
      CommandItem[]
    >(
      () => [
        {
          id:
            "portfolio",

          label:
            isFr
              ? "Mon portfolio"
              : "My portfolio",

          description:
            isFr
              ? "Retour au début"
              : "Back to the beginning",

          keywords:
            "portfolio accueil home",

          icon:
            Home,

          action: () =>
            goToHash(
              "home"
            ),
        },

        {
          id:
            "journey",

          label:
            isFr
              ? "Mon parcours"
              : "My journey",

          description:
            isFr
              ? "Voir mon évolution"
              : "See my journey",

          keywords:
            "parcours journey timeline experience",

          icon:
            Waypoints,

          action: () =>
            goToHash(
              "home"
            ),
        },

        {
          id:
            "expertise",

          label:
            "Expertise",

          description:
            isFr
              ? "Data, BI, performance et automation"
              : "Data, BI, performance and automation",

          keywords:
            "expertise skills data bi performance automation",

          icon:
            Sparkles,

          action: () =>
            goToHash(
              "expertise"
            ),
        },

        {
          id:
            "next-chapter",

          label:
            isFr
              ? "Prochain chapitre"
              : "Next chapter",

          description:
            isFr
              ? "Objectif CDI 2027"
              : "2027 permanent-role goal",

          keywords:
            "next chapter cdi 2027 job permanent role",

          icon:
            BriefcaseBusiness,

          action: () =>
            goToHash(
              "next-chapter"
            ),
        },

        {
          id:
            "recruiter",

          label:
            isFr
              ? "Mode recruteur"
              : "Recruiter mode",

          description:
            isFr
              ? "L'essentiel en 60 secondes"
              : "The essentials in 60 seconds",

          keywords:
            "recruiter recruteur summary resume 60 seconds",

          icon:
            BriefcaseBusiness,

          action: () => {
            setOpen(false);

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
          },
        },

        {
          id:
            "cv-guide",

          label:
            isFr
              ? "Guide CV"
              : "CV Guide",

          description:
            isFr
              ? "Guide ATS + LaTeX"
              : "ATS + LaTeX guide",

          keywords:
            "guide cv resume ats latex overleaf",

          icon:
            BookOpenText,

          action: () => {
            setOpen(false);

            window.location.href =
              "/cv-guide";
          },
        },

        {
          id:
            "cv",

          label:
            isFr
              ? "Voir mon CV"
              : "View my CV",

          description:
            isFr
              ? "Ouvrir le PDF"
              : "Open the PDF",

          keywords:
            "cv pdf resume",

          icon:
            FileText,

          action: () => {
            setOpen(false);

            window.open(
              "/cv/CV-Ahmed-Farouk-Damergi.pdf",
              "_blank",
              "noopener,noreferrer"
            );
          },
        },

        {
          id:
            "contact",

          label:
            "Contact",

          description:
            "Email, LinkedIn, GitHub",

          keywords:
            "contact email linkedin github phone",

          icon:
            Mail,

          action:
            goToContact,
        },
      ],
      [
        isFr,
        pathname,
      ]
    );

  const filteredCommands =
    useMemo(
      () => {
        const normalized =
          query
            .trim()
            .toLowerCase();

        if (!normalized)
          return commands;

        return commands.filter(
          (
            command
          ) =>
            `${command.label} ${command.description} ${command.keywords}`
              .toLowerCase()
              .includes(
                normalized
              )
        );
      },
      [
        commands,
        query,
      ]
    );

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        (
          event.ctrlKey ||
          event.metaKey
        ) &&
        event.key.toLowerCase() ===
          "k"
      ) {
        event.preventDefault();

        setOpen(
          (
            current
          ) =>
            !current
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  useEffect(() => {
    if (!open)
      return;

    setQuery("");
    setActiveIndex(0);

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    const timer =
      window.setTimeout(
        () =>
          inputRef.current?.focus(),
        80
      );

    return () => {
      window.clearTimeout(
        timer
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (
      activeIndex >
      filteredCommands.length -
        1
    ) {
      setActiveIndex(0);
    }
  }, [
    activeIndex,
    filteredCommands.length,
  ]);

  function handleDialogKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>
  ) {
    if (
      event.key ===
      "Escape"
    ) {
      setOpen(false);

      return;
    }

    if (
      event.key ===
      "ArrowDown"
    ) {
      event.preventDefault();

      setActiveIndex(
        (
          index
        ) =>
          filteredCommands.length ===
          0
            ? 0
            : (
                index +
                1
              ) %
              filteredCommands.length
      );
    }

    if (
      event.key ===
      "ArrowUp"
    ) {
      event.preventDefault();

      setActiveIndex(
        (
          index
        ) =>
          filteredCommands.length ===
          0
            ? 0
            : (
                index -
                1 +
                filteredCommands.length
              ) %
              filteredCommands.length
      );
    }

    if (
      event.key ===
        "Enter" &&
      filteredCommands[
        activeIndex
      ]
    ) {
      event.preventDefault();

      filteredCommands[
        activeIndex
      ].action();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setOpen(true)
        }
        aria-label={
          isFr
            ? "Ouvrir l'accès rapide"
            : "Open quick access"
        }
        className="hidden h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 text-[11px] font-medium text-white/65 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white 2xl:flex"
      >
        <Search
          size={14}
          strokeWidth={1.8}
        />

        <span>
          Ctrl K
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-start justify-center bg-[#070b12]/72 px-4 pt-[13vh] backdrop-blur-md"
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
              aria-label={
                isFr
                  ? "Accès rapide"
                  : "Quick access"
              }
              onKeyDown={
                handleDialogKeyDown
              }
              initial={{
                opacity:
                  0,

                y:
                  -18,

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
                  -10,

                scale:
                  0.99,
              }}
              transition={{
                duration:
                  0.22,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="w-full max-w-[680px] overflow-hidden rounded-[26px] border border-white/10 bg-[#111827] shadow-[0_35px_120px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <Search
                  size={18}
                  strokeWidth={
                    1.7
                  }
                  className="shrink-0 text-[#d2ad73]"
                />

                <input
                  ref={
                    inputRef
                  }
                  value={
                    query
                  }
                  onChange={
                    (
                      event
                    ) => {
                      setQuery(
                        event
                          .target
                          .value
                      );

                      setActiveIndex(
                        0
                      );
                    }
                  }
                  placeholder={
                    isFr
                      ? "Où voulez-vous aller ?"
                      : "Where do you want to go?"
                  }
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/35"
                />

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
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white"
                >
                  <X
                    size={
                      16
                    }
                  />
                </button>
              </div>

              <div className="max-h-[55vh] overflow-y-auto p-2">
                {filteredCommands.length >
                0 ? (
                  filteredCommands.map(
                    (
                      command,
                      index
                    ) => {
                      const Icon =
                        command.icon;

                      const active =
                        index ===
                        activeIndex;

                      return (
                        <button
                          key={
                            command.id
                          }
                          type="button"
                          onMouseEnter={() =>
                            setActiveIndex(
                              index
                            )
                          }
                          onClick={
                            command.action
                          }
                          className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition ${
                            active
                              ? "bg-[#bc965d]/14 text-white"
                              : "text-white/72 hover:bg-white/[0.05]"
                          }`}
                        >
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                              active
                                ? "border-[#bc965d]/35 bg-[#bc965d]/12 text-[#d2ad73]"
                                : "border-white/10 bg-white/[0.035] text-white/50"
                            }`}
                          >
                            <Icon
                              size={
                                17
                              }
                              strokeWidth={
                                1.7
                              }
                            />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">
                              {
                                command.label
                              }
                            </span>

                            <span className="mt-0.5 block truncate text-xs text-white/40">
                              {
                                command.description
                              }
                            </span>
                          </span>

                          <ArrowUpRight
                            size={
                              15
                            }
                            strokeWidth={
                              1.7
                            }
                            className={
                              active
                                ? "text-[#d2ad73]"
                                : "text-white/25"
                            }
                          />
                        </button>
                      );
                    }
                  )
                ) : (
                  <div className="px-5 py-12 text-center text-sm text-white/40">
                    {isFr
                      ? "Aucun résultat"
                      : "No result"}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-white/30">
                <span>
                  {isFr
                    ? "↑ ↓ naviguer · Entrée ouvrir"
                    : "↑ ↓ navigate · Enter open"}
                </span>

                <span>
                  ESC
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}