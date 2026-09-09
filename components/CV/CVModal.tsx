"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  Download,
  ExternalLink,
  FileText,
  X,
} from "lucide-react";

import {
  useEffect,
} from "react";

import type {
  Language,
} from "@/data/timeline";

type CVModalProps = {
  open: boolean;
  language: Language;
  onClose: () => void;
};

const CV_PATH =
  "/cv/CV-Ahmed-Farouk-Damergi.pdf";

export default function CVModal({
  open,
  language,
  onClose,
}: CVModalProps) {
  const labels =
    language === "fr"
      ? {
          title:
            "Curriculum Vitae",
          subtitle:
            "Ahmed-Farouk DAMERGI · Data & Business Analyst",
          download:
            "Télécharger",
          open:
            "Ouvrir le PDF",
          close:
            "Fermer",
          mobile:
            "La prévisualisation PDF peut varier selon votre navigateur mobile.",
        }
      : {
          title:
            "Curriculum Vitae",
          subtitle:
            "Ahmed-Farouk DAMERGI · Data & Business Analyst",
          download:
            "Download",
          open:
            "Open PDF",
          close:
            "Close",
          mobile:
            "PDF preview behavior may vary depending on your mobile browser.",
        };

  useEffect(() => {
    if (!open) return;

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
    onClose,
  ]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 lg:p-8"
        >
          <button
            type="button"
            onClick={
              onClose
            }
            aria-label={
              labels.close
            }
            className="absolute inset-0 cursor-default bg-[#090e17]/60 backdrop-blur-[16px]"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 28,
              scale: 0.975,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.985,
            }}
            transition={{
              duration: 0.4,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="relative z-10 flex h-[94dvh] w-full max-w-[1180px] flex-col overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--surface)] shadow-[0_45px_140px_rgba(0,0,0,0.4)] lg:h-[90vh] lg:rounded-[34px]"
          >

            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--line)] px-5 py-4 sm:px-7 lg:px-9">

              <div className="min-w-0">

                <div className="flex items-center gap-3">

                  <FileText
                    size={18}
                    strokeWidth={
                      1.6
                    }
                    className="shrink-0 text-[var(--gold)]"
                  />

                  <p className="truncate text-sm font-semibold text-[var(--ink)] sm:text-base">
                    {
                      labels.title
                    }
                  </p>

                </div>

                <p className="mt-1 hidden text-xs text-[var(--muted)] sm:block">
                  {
                    labels.subtitle
                  }
                </p>

              </div>

              <div className="flex shrink-0 items-center gap-2">

                <a
                  href={
                    CV_PATH
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2.5 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--gold)] sm:flex"
                >
                  <ExternalLink
                    size={
                      15
                    }
                  />

                  {
                    labels.open
                  }
                </a>

                <a
                  href={
                    CV_PATH
                  }
                  download
                  className="flex items-center gap-2 rounded-full bg-[#111827] px-4 py-2.5 text-xs font-semibold text-white transition hover:scale-[1.02]"
                >
                  <Download
                    size={
                      15
                    }
                  />

                  <span className="hidden sm:inline">
                    {
                      labels.download
                    }
                  </span>
                </a>

                <button
                  type="button"
                  onClick={
                    onClose
                  }
                  aria-label={
                    labels.close
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition hover:border-[var(--gold)] hover:text-[var(--gold-dark)]"
                >
                  <X
                    size={
                      18
                    }
                  />
                </button>

              </div>

            </div>

            {/* PDF */}
            <div className="relative min-h-0 flex-1 bg-[#202631]">

              <iframe
                src={`${CV_PATH}#view=FitH`}
                title="CV Ahmed-Farouk DAMERGI"
                className="h-full w-full border-0"
              />

            </div>

            {/* MOBILE FALLBACK */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[var(--line)] px-5 py-3 sm:hidden">

              <p className="max-w-[190px] text-[10px] leading-4 text-[var(--muted)]">
                {
                  labels.mobile
                }
              </p>

              <a
                href={
                  CV_PATH
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-[var(--gold-dark)]"
              >
                {
                  labels.open
                }

                <ExternalLink
                  size={
                    14
                  }
                />
              </a>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}