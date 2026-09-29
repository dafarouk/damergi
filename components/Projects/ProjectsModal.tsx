"use client";

import {
  AlertCircle,
  ArrowLeft,
  BookOpenText,
  Code2,
  Download,
  ExternalLink,
  FolderKanban,
  LoaderCircle,
  Package,
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
  type MouseEvent,
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

  const [
    readmeProjectId,
    setReadmeProjectId,
  ] = useState<string | null>(
    null
  );

  const [
    readmeHtml,
    setReadmeHtml,
  ] = useState("");

  const [
    readmeLoading,
    setReadmeLoading,
  ] = useState(false);

  const [
    readmeError,
    setReadmeError,
  ] = useState(false);

  const isFr =
    language === "fr";

  const readmeProject =
    useMemo(
      () =>
        portfolioProjects.find(
          (
            project
          ) =>
            project.id ===
            readmeProjectId
        ) ?? null,
      [
        readmeProjectId,
      ]
    );

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    function handleOpenProjects() {
      setReadmeProjectId(
        null
      );

      setOpen(
        true
      );
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
        event.key !==
        "Escape"
      ) {
        return;
      }

      if (
        readmeProjectId
      ) {
        setReadmeProjectId(
          null
        );

        return;
      }

      setOpen(
        false
      );
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
    open,
    readmeProjectId,
  ]);

  useEffect(() => {
    if (
      !readmeProject
    ) {
      setReadmeHtml(
        ""
      );

      setReadmeLoading(
        false
      );

      setReadmeError(
        false
      );

      return;
    }

    const githubRepo =
      readmeProject.githubRepo;

    const controller =
      new AbortController();

    async function loadReadme() {
      setReadmeLoading(
        true
      );

      setReadmeError(
        false
      );

      setReadmeHtml(
        ""
      );

      try {
        const response =
          await fetch(
            `https://api.github.com/repos/${githubRepo}/readme`,
            {
              headers: {
                Accept:
                  "application/vnd.github.html+json",

                "X-GitHub-Api-Version":
                  "2022-11-28",
              },

              signal:
                controller.signal,
            }
          );

        if (
          !response.ok
        ) {
          throw new Error(
            `GitHub README request failed: ${response.status}`
          );
        }

        const html =
          await response.text();

        setReadmeHtml(
          html
        );
      } catch (
        error
      ) {
        if (
          error instanceof
            DOMException &&
          error.name ===
            "AbortError"
        ) {
          return;
        }

        setReadmeError(
          true
        );
      } finally {
        if (
          !controller.signal
            .aborted
        ) {
          setReadmeLoading(
            false
          );
        }
      }
    }

    loadReadme();

    return () => {
      controller.abort();
    };
  }, [
    readmeProject,
  ]);

  function closeProjects() {
    setReadmeProjectId(
      null
    );

    setOpen(
      false
    );
  }

  function openReadme(
    projectId: string
  ) {
    setReadmeProjectId(
      projectId
    );
  }

  function closeReadme() {
    setReadmeProjectId(
      null
    );
  }

  function handleReadmeLinkClick(
    event: MouseEvent<HTMLDivElement>
  ) {
    if (
      !readmeProject
    ) {
      return;
    }

    const element =
      event.target as HTMLElement;

    const anchor =
      element.closest(
        "a"
      );

    if (!anchor) {
      return;
    }

    const href =
      anchor.getAttribute(
        "href"
      );

    if (!href) {
      return;
    }

    if (
      href.startsWith(
        "#"
      )
    ) {
      return;
    }

    event.preventDefault();

    let finalUrl =
      href;

    if (
      href.startsWith(
        "/"
      )
    ) {
      finalUrl =
        `https://github.com${href}`;
    } else if (
      !/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(
        href
      )
    ) {
      finalUrl =
        `${readmeProject.publicRepoUrl}/blob/HEAD/${href}`;
    }

    window.open(
      finalUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const modal = (
    <>
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
                  closeProjects();
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
                max-w-[1180px]
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
                        ? "Une sélection de mes projets personnels les plus récents, avec accès direct au code source, aux versions disponibles et à leur documentation."
                        : "A selection of my most recent personal projects, with direct access to source code, available releases and documentation."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={
                      closeProjects
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

              <div className="relative max-h-[72vh] overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-[#bc965d]" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">
                    {isFr
                      ? "Les plus récents"
                      : "Most recent"}
                  </p>
                </div>

                <div className="space-y-5">
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

                          <p className="mt-5 max-w-4xl text-sm font-light leading-7 text-white/52 sm:text-[15px]">
                            {
                              project
                                .description[
                                  language
                                ]
                            }
                          </p>

                          <div className="mt-6 grid gap-3 md:grid-cols-3">
                            <button
                              type="button"
                              onClick={() =>
                                openReadme(
                                  project.id
                                )
                              }
                              className="
                                group/readme
                                flex
                                items-center
                                justify-center
                                gap-2.5
                                rounded-2xl
                                border
                                border-[#bc965d]/30
                                bg-[#bc965d]/[0.07]
                                px-4
                                py-3.5
                                text-center
                                text-xs
                                font-semibold
                                text-[#e2bf88]
                                transition-all
                                hover:-translate-y-0.5
                                hover:border-[#bc965d]/55
                                hover:bg-[#bc965d]/[0.13]
                              "
                            >
                              <BookOpenText
                                size={17}
                                strokeWidth={
                                  1.7
                                }
                              />

                              README
                            </button>

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
                                hover:-translate-y-0.5
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
                                ? "Voir le code source"
                                : "See full source code"}

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

      <AnimatePresence>
        {open &&
          readmeProject && (
            <motion.div
              className="
                fixed
                inset-0
                z-[10060]
                flex
                items-center
                justify-center
                bg-[#05080e]/90
                px-3
                py-4
                backdrop-blur-xl
                sm:px-6
                sm:py-7
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
                    closeReadme();
                  }
                }
              }
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${readmeProject.title} README`}
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
                    12,

                  scale:
                    0.99,
                }}
                transition={{
                  duration:
                    0.25,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  flex
                  max-h-[92vh]
                  w-full
                  max-w-[1120px]
                  flex-col
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/10
                  bg-[#111827]
                  text-white
                  shadow-[0_45px_150px_rgba(0,0,0,0.68)]
                "
              >
                <div className="relative shrink-0 border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5">
                  <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#bc965d]/10 blur-3xl" />

                  <div className="relative flex items-center gap-3">
                    <button
                      type="button"
                      onClick={
                        closeReadme
                      }
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#bc965d]/30
                        bg-[#bc965d]/[0.08]
                        px-3
                        py-2
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.1em]
                        text-[#dfbb82]
                        transition
                        hover:border-[#bc965d]/55
                        hover:bg-[#bc965d]/[0.14]
                        sm:px-4
                      "
                    >
                      <ArrowLeft
                        size={15}
                        strokeWidth={
                          1.8
                        }
                      />

                      <span className="hidden sm:inline">
                        {isFr
                          ? "Retour aux projets"
                          : "Back to projects"}
                      </span>

                      <span className="sm:hidden">
                        {isFr
                          ? "Retour"
                          : "Back"}
                      </span>
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <BookOpenText
                          size={14}
                          strokeWidth={
                            1.7
                          }
                          className="shrink-0 text-[#d2ad73]"
                        />

                        <p className="truncate text-[9px] font-semibold uppercase tracking-[0.17em] text-[#d2ad73]">
                          README
                        </p>
                      </div>

                      <h2 className="mt-1 truncate text-lg font-semibold tracking-[-0.03em] sm:text-2xl">
                        {
                          readmeProject.title
                        }
                      </h2>
                    </div>

                    <a
                      href={
                        `${readmeProject.publicRepoUrl}#readme`
                      }
                      target="_blank"
                      rel="noreferrer"
                      title={
                        isFr
                          ? "Voir sur GitHub"
                          : "View on GitHub"
                      }
                      className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 transition hover:bg-white/[0.06] hover:text-white sm:flex"
                    >
                      GitHub

                      <ExternalLink
                        size={13}
                      />
                    </a>

                    <button
                      type="button"
                      onClick={
                        closeReadme
                      }
                      aria-label={
                        isFr
                          ? "Fermer le README"
                          : "Close README"
                      }
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:bg-white/10 hover:text-white"
                    >
                      <X
                        size={17}
                      />
                    </button>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                  {readmeLoading && (
                    <div className="flex min-h-[480px] flex-col items-center justify-center px-6 text-center">
                      <LoaderCircle
                        size={28}
                        strokeWidth={
                          1.6
                        }
                        className="animate-spin text-[#d2ad73]"
                      />

                      <p className="mt-4 text-sm text-white/45">
                        {isFr
                          ? "Chargement du README..."
                          : "Loading README..."}
                      </p>
                    </div>
                  )}

                  {!readmeLoading &&
                    readmeError && (
                      <div className="flex min-h-[480px] flex-col items-center justify-center px-6 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#bc965d]/25 bg-[#bc965d]/10 text-[#d2ad73]">
                          <AlertCircle
                            size={25}
                            strokeWidth={
                              1.6
                            }
                          />
                        </div>

                        <h3 className="mt-5 text-lg font-semibold">
                          {isFr
                            ? "Impossible de charger le README"
                            : "Unable to load the README"}
                        </h3>

                        <p className="mt-2 max-w-md text-sm leading-6 text-white/45">
                          {isFr
                            ? "Le README reste disponible directement sur le dépôt GitHub officiel."
                            : "The README is still available directly from the official GitHub repository."}
                        </p>

                        <a
                          href={
                            `${readmeProject.publicRepoUrl}#readme`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#bc965d] px-5 py-3 text-xs font-semibold text-[#111827] transition hover:bg-[#d2ad73]"
                        >
                          {isFr
                            ? "Ouvrir sur GitHub"
                            : "Open on GitHub"}

                          <ExternalLink
                            size={14}
                          />
                        </a>
                      </div>
                    )}

                  {!readmeLoading &&
                    !readmeError &&
                    readmeHtml && (
                      <div className="mx-auto max-w-[920px] px-5 py-7 sm:px-8 sm:py-10">
                        <div
                          onClickCapture={
                            handleReadmeLinkClick
                          }
                          className="
                            text-[14px]
                            leading-7
                            text-white/67
                            sm:text-[15px]

                            [&_a]:font-medium
                            [&_a]:text-[#d2ad73]
                            [&_a]:underline
                            [&_a]:decoration-[#bc965d]/35
                            [&_a]:underline-offset-4
                            hover:[&_a]:text-[#e4c492]

                            [&_blockquote]:my-5
                            [&_blockquote]:border-l-2
                            [&_blockquote]:border-[#bc965d]
                            [&_blockquote]:pl-4
                            [&_blockquote]:text-white/50

                            [&_code]:rounded-md
                            [&_code]:border
                            [&_code]:border-white/10
                            [&_code]:bg-black/25
                            [&_code]:px-1.5
                            [&_code]:py-0.5
                            [&_code]:font-mono
                            [&_code]:text-[0.9em]
                            [&_code]:text-[#e7c793]

                            [&_h1]:mb-5
                            [&_h1]:mt-10
                            [&_h1]:border-b
                            [&_h1]:border-white/10
                            [&_h1]:pb-4
                            [&_h1]:text-3xl
                            [&_h1]:font-semibold
                            [&_h1]:leading-tight
                            [&_h1]:tracking-[-0.04em]
                            [&_h1]:text-white
                            sm:[&_h1]:text-4xl

                            [&_h2]:mb-4
                            [&_h2]:mt-9
                            [&_h2]:text-2xl
                            [&_h2]:font-semibold
                            [&_h2]:tracking-[-0.035em]
                            [&_h2]:text-white

                            [&_h3]:mb-3
                            [&_h3]:mt-7
                            [&_h3]:text-lg
                            [&_h3]:font-semibold
                            [&_h3]:text-white/90

                            [&_hr]:my-8
                            [&_hr]:border-white/10

                            [&_img]:my-1
                            [&_img]:inline-block
                            [&_img]:max-w-full

                            [&_li]:my-1.5

                            [&_ol]:my-4
                            [&_ol]:list-decimal
                            [&_ol]:space-y-1
                            [&_ol]:pl-6

                            [&_p]:my-4

                            [&_pre]:my-5
                            [&_pre]:max-w-full
                            [&_pre]:overflow-x-auto
                            [&_pre]:rounded-2xl
                            [&_pre]:border
                            [&_pre]:border-white/10
                            [&_pre]:bg-[#090e17]
                            [&_pre]:p-4
                            [&_pre]:text-[12px]
                            [&_pre]:leading-6
                            [&_pre]:text-white/72

                            [&_pre_code]:border-0
                            [&_pre_code]:bg-transparent
                            [&_pre_code]:p-0
                            [&_pre_code]:text-inherit

                            [&_strong]:font-semibold
                            [&_strong]:text-white/90

                            [&_table]:my-6
                            [&_table]:w-full
                            [&_table]:border-collapse
                            [&_table]:overflow-hidden
                            [&_table]:rounded-xl
                            [&_table]:text-left
                            [&_table]:text-xs
                            sm:[&_table]:text-sm

                            [&_td]:border
                            [&_td]:border-white/10
                            [&_td]:px-3
                            [&_td]:py-2.5
                            [&_td]:align-top

                            [&_th]:border
                            [&_th]:border-white/10
                            [&_th]:bg-white/[0.05]
                            [&_th]:px-3
                            [&_th]:py-2.5
                            [&_th]:font-semibold
                            [&_th]:text-white/85

                            [&_ul]:my-4
                            [&_ul]:list-disc
                            [&_ul]:space-y-1
                            [&_ul]:pl-6
                          "
                          dangerouslySetInnerHTML={{
                            __html:
                              readmeHtml,
                          }}
                        />
                      </div>
                    )}
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-[#0d1420] px-4 py-3 sm:px-6">
                  <button
                    type="button"
                    onClick={
                      closeReadme
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-[#bc965d]/30 bg-[#bc965d]/[0.08] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#dfbb82] transition hover:border-[#bc965d]/55 hover:bg-[#bc965d]/[0.14]"
                  >
                    <ArrowLeft
                      size={14}
                    />

                    {isFr
                      ? "Retour aux projets"
                      : "Back to projects"}
                  </button>

                  <span className="hidden text-[9px] uppercase tracking-[0.14em] text-white/25 sm:block">
                    {
                      readmeProject.version
                    }
                    {" · "}
                    {
                      readmeProject.platform
                    }
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(
    modal,
    document.body
  );
}