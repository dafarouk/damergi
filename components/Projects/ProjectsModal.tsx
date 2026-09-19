"use client";

import {
  Code2,
  Download,
  ExternalLink,
  FolderKanban,
  Package,
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
  createPortal,
} from "react-dom";

import type {
  Language,
} from "@/data/timeline";

import {
  portfolioProjects,
} from "@/data/projects";

type ProjectsModalProps = {
  language: Language;
};

export default function ProjectsModal({
  language,
}: ProjectsModalProps) {
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
    function handleOpenProjects() {
      setOpen(true);
    }

    window.addEventListener(
      "damergi:open-projects",
      handleOpenProjects
    );

    return () => {
      window.removeEventListener(
        "damergi:open-projects",
        handleOpenProjects
      );
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

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

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed
            inset-0
            z-[10030]
            flex
            items-start
            justify-center
            overflow-y-auto
            bg-[#070b12]/82
            px-3
            py-5
            backdrop-blur-md
            sm:px-6
            sm:py-8
            lg:items-center
          "
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
                setOpen(false);
              }
            }
          }
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={
              isFr
                ? "Mes projets"
                : "My projects"
            }
            initial={{
              opacity:
                0,

              y:
                22,

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
                12,

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
            className="
              relative
              my-auto
              w-full
              max-w-[980px]
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-[#111827]
              text-white
              shadow-[0_40px_140px_rgba(0,0,0,0.60)]
            "
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#bc965d]/10 blur-3xl" />

              <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-white/[0.025] blur-3xl" />

              <div
                className="
                  absolute
                  inset-0
                  opacity-[0.035]
                  [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)]
                  [background-size:48px_48px]
                "
              />
            </div>

            <div className="relative border-b border-white/10 px-5 py-5 sm:px-8 sm:py-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d2ad73]">
                    <FolderKanban
                      size={15}
                      strokeWidth={
                        1.8
                      }
                    />

                    {isFr
                      ? "Mes meilleurs projets"
                      : "My top projects"}
                  </div>

                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                    {isFr
                      ? "Mes projets"
                      : "My projects"}
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50 sm:text-base sm:leading-7">
                    {isFr
                      ? "Une sélection de mes projets personnels les plus récents, avec accès direct au code source et aux versions disponibles."
                      : "A selection of my most recent personal projects, with direct access to source code and available releases."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  aria-label={
                    isFr
                      ? "Fermer"
                      : "Close"
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:bg-white/10 hover:text-white"
                >
                  <X
                    size={18}
                  />
                </button>
              </div>
            </div>

            <div className="relative px-5 py-6 sm:px-8 sm:py-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#bc965d]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {isFr
                    ? "Les plus récents"
                    : "Most recent"}
                </p>
              </div>

              <div className="space-y-4">
                {portfolioProjects.map(
                  (
                    project,
                    index
                  ) => (
                    <motion.article
                      key={
                        project.id
                      }
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
                        delay:
                          index *
                          0.06,

                        duration:
                          0.3,
                      }}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-[26px]
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-5
                        transition-all
                        duration-300
                        hover:border-[#bc965d]/35
                        hover:bg-[#bc965d]/[0.045]
                        sm:p-7
                      "
                    >
                      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#bc965d]/10 blur-3xl" />

                      <div className="relative">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex min-w-0 gap-4">
                            <div
                              className="
                                flex
                                h-14
                                w-14
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-[#bc965d]/30
                                bg-[#bc965d]/10
                                text-[#d2ad73]
                                shadow-[0_0_25px_rgba(188,150,93,0.08)]
                              "
                            >
                              <Package
                                size={25}
                                strokeWidth={
                                  1.6
                                }
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                                  {
                                    project.title
                                  }
                                </h3>

                                <span className="rounded-full border border-[#bc965d]/25 bg-[#bc965d]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#d2ad73]">
                                  {
                                    project.version
                                  }
                                </span>
                              </div>

                              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                                {
                                  project.platform
                                }
                              </p>
                            </div>
                          </div>

                          <span className="hidden text-[10px] font-semibold tracking-[0.14em] text-white/15 sm:block">
                            0
                            {
                              index +
                              1
                            }
                          </span>
                        </div>

                        <p className="mt-5 max-w-3xl text-sm font-light leading-7 text-white/52 sm:text-[15px]">
                          {
                            project
                              .description[
                                language
                              ]
                          }
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          <a
                            href={
                              project.sourceUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="
                              group/source
                              flex
                              items-center
                              justify-center
                              gap-2.5
                              rounded-2xl
                              border
                              border-white/12
                              bg-white/[0.04]
                              px-4
                              py-3.5
                              text-center
                              text-xs
                              font-semibold
                              text-white/75
                              transition-all
                              hover:border-[#bc965d]/35
                              hover:bg-white/[0.07]
                              hover:text-white
                            "
                          >
                            <Code2
                              size={17}
                              strokeWidth={
                                1.7
                              }
                            />

                            {isFr
                              ? "Voir le code source complet"
                              : "See GitHub full source code"}

                            <ExternalLink
                              size={14}
                              strokeWidth={
                                1.7
                              }
                              className="text-white/30 transition-transform group-hover/source:-translate-y-0.5 group-hover/source:translate-x-0.5"
                            />
                          </a>

                          {project.downloadUrl && (
                            <a
                              href={
                                project.downloadUrl
                              }
                              className="
                                group/download
                                flex
                                items-center
                                justify-center
                                gap-2.5
                                rounded-2xl
                                border
                                border-[#bc965d]
                                bg-[#bc965d]
                                px-4
                                py-3.5
                                text-center
                                text-xs
                                font-semibold
                                text-[#111827]
                                shadow-[0_10px_30px_rgba(188,150,93,0.13)]
                                transition-all
                                hover:-translate-y-0.5
                                hover:bg-[#d2ad73]
                                hover:shadow-[0_15px_38px_rgba(188,150,93,0.20)]
                              "
                            >
                              <Download
                                size={17}
                                strokeWidth={
                                  1.8
                                }
                              />

                              {isFr
                                ? "Télécharger l'application"
                                : "Download the app"}
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(
    modal,
    document.body
  );
}