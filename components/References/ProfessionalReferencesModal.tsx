"use client";

import Image from "next/image";

import {
  Building2,
  Check,
  Copy,
  ExternalLink,
  Mail,
  Phone,
  UserRoundCheck,
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

import {
  professionalReferences,
  type ProfessionalReferenceId,
} from "@/data/professionalReferences";

type ProfessionalReferencesModalProps = {
  language: Language;
};

type OpenReferencesDetail = {
  referenceId?: ProfessionalReferenceId;
};

type CopiedField =
  | "email"
  | "phone"
  | null;

export default function ProfessionalReferencesModal({
  language,
}: ProfessionalReferencesModalProps) {
  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    selectedId,
    setSelectedId,
  ] =
    useState<ProfessionalReferenceId>(
      "nadine"
    );

  const [
    copiedField,
    setCopiedField,
  ] =
    useState<CopiedField>(
      null
    );

  const isFr =
    language === "fr";

  const selectedReference =
    useMemo(
      () =>
        professionalReferences.find(
          (
            reference
          ) =>
            reference.id ===
            selectedId
        ) ??
        professionalReferences[0],

      [
        selectedId,
      ]
    );

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    function handleOpenReferences(
      event: Event
    ) {
      const customEvent =
        event as CustomEvent<OpenReferencesDetail>;

      const requestedId =
        customEvent.detail
          ?.referenceId;

      if (
        requestedId ===
          "nadine" ||
        requestedId ===
          "aymen"
      ) {
        setSelectedId(
          requestedId
        );
      }

      setCopiedField(
        null
      );

      setOpen(
        true
      );
    }

    window.addEventListener(
      "damergi:open-references",
      handleOpenReferences
    );

    return () => {
      window.removeEventListener(
        "damergi:open-references",
        handleOpenReferences
      );
    };
  }, []);

  useEffect(() => {
    setCopiedField(
      null
    );
  }, [selectedId]);

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
        setOpen(
          false
        );
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

  async function copyValue(
    field: Exclude<
      CopiedField,
      null
    >,
    value: string
  ) {
    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          value
        );
      } else {
        const textarea =
          document.createElement(
            "textarea"
          );

        textarea.value =
          value;

        textarea.style.position =
          "fixed";

        textarea.style.opacity =
          "0";

        textarea.style.pointerEvents =
          "none";

        document.body.appendChild(
          textarea
        );

        textarea.focus();
        textarea.select();

        document.execCommand(
          "copy"
        );

        textarea.remove();
      }

      setCopiedField(
        field
      );

      window.setTimeout(
        () => {
          setCopiedField(
            (
              current
            ) =>
              current ===
              field
                ? null
                : current
          );
        },
        1800
      );
    } catch {
      setCopiedField(
        null
      );
    }
  }

  const modal = (
    <AnimatePresence>

      {open && (
        <motion.div
          className="
            fixed
            inset-0
            z-[10040]
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
                ? "Mes références professionnelles"
                : "My professional references"
            }
            initial={{
              opacity:
                0,

              y:
                20,

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
              max-w-[1040px]
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-[#111827]
              text-white
              shadow-[0_40px_140px_rgba(0,0,0,0.6)]
            "
          >

            {/* BACKGROUND */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#bc965d]/10 blur-3xl" />

              <div className="absolute -bottom-36 left-1/4 h-96 w-96 rounded-full bg-white/[0.025] blur-3xl" />

            </div>

            {/* HEADER */}

            <div className="relative border-b border-white/10 px-5 py-5 sm:px-8 sm:py-6">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d2ad73]">

                    <UserRoundCheck
                      size={15}
                      strokeWidth={
                        1.8
                      }
                    />

                    {isFr
                      ? "Références professionnelles"
                      : "Professional references"}

                  </div>

                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-4xl">

                    {isFr
                      ? "Mes références professionnelles"
                      : "My professional references"}

                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50 sm:text-base sm:leading-7">

                    {isFr
                      ? "Deux références récentes pouvant apporter un regard direct sur mon travail, mon évolution et ma manière de collaborer."
                      : "Two recent professional references who can provide direct insight into my work, progression and way of collaborating."}

                  </p>

                </div>

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
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:bg-white/10 hover:text-white"
                >

                  <X
                    size={18}
                  />

                </button>

              </div>

              {/* REFERENCE SELECTOR */}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {professionalReferences.map(
                  (
                    reference
                  ) => {
                    const active =
                      reference.id ===
                      selectedId;

                    return (
                      <button
                        key={
                          reference.id
                        }
                        type="button"
                        onClick={() =>
                          setSelectedId(
                            reference.id
                          )
                        }
                        aria-pressed={
                          active
                        }
                        className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
                          active
                            ? "border-[#bc965d]/55 bg-[#bc965d]/12 shadow-[0_0_26px_rgba(188,150,93,0.08)]"
                            : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                      >

                        <div
                          className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 bg-[#172131] p-[2px] transition ${
                            active
                              ? "border-[#d2ad73] shadow-[0_0_18px_rgba(188,150,93,0.32)]"
                              : "border-[#bc965d]/35"
                          }`}
                          onContextMenu={
                            (
                              event
                            ) =>
                              event.preventDefault()
                          }
                        >

                          <div className="relative h-full w-full overflow-hidden rounded-full">

                            <Image
                              src={
                                reference.imagePath
                              }
                              alt={
                                reference.name
                              }
                              fill
                              sizes="56px"
                              draggable={
                                false
                              }
                              className="pointer-events-none select-none object-cover"
                            />

                          </div>

                        </div>

                        <div className="min-w-0 flex-1">

                          <p
                            className={`truncate text-sm font-semibold ${
                              active
                                ? "text-white"
                                : "text-white/75"
                            }`}
                          >
                            {
                              reference.name
                            }
                          </p>

                          <p className="mt-1 truncate text-[10px] font-medium uppercase tracking-[0.12em] text-[#d2ad73]">
                            {
                              reference.company
                            }
                          </p>

                        </div>

                      </button>
                    );
                  }
                )}

              </div>

            </div>

            {/* CONTENT */}

            <div className="relative grid gap-7 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">

              {/* PORTRAIT */}

              <motion.div
                key={`${selectedReference.id}-portrait`}
                initial={{
                  opacity:
                    0,

                  scale:
                    0.96,
                }}
                animate={{
                  opacity:
                    1,

                  scale:
                    1,
                }}
                transition={{
                  duration:
                    0.25,
                }}
                className="flex items-center justify-center"
              >

                <div
                  className="
                    relative
                    flex
                    h-[220px]
                    w-[220px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#bc965d]/20
                    bg-[#bc965d]/[0.04]
                    sm:h-[260px]
                    sm:w-[260px]
                    lg:h-[300px]
                    lg:w-[300px]
                  "
                  onContextMenu={
                    (
                      event
                    ) =>
                      event.preventDefault()
                  }
                >

                  <div className="absolute inset-3 rounded-full border border-dashed border-[#bc965d]/20" />

                  <div className="absolute inset-7 rounded-full bg-[#bc965d]/10 blur-2xl" />

                  <div
                    className="
                      relative
                      h-[184px]
                      w-[184px]
                      overflow-hidden
                      rounded-full
                      border-[3px]
                      border-[#d2ad73]
                      bg-[#172131]
                      p-[4px]
                      shadow-[0_0_0_7px_rgba(188,150,93,0.08),0_20px_60px_rgba(0,0,0,0.32)]
                      sm:h-[220px]
                      sm:w-[220px]
                      lg:h-[250px]
                      lg:w-[250px]
                    "
                  >

                    <div className="relative h-full w-full overflow-hidden rounded-full">

                      <Image
                        src={
                          selectedReference.imagePath
                        }
                        alt={
                          selectedReference.name
                        }
                        fill
                        sizes="(max-width: 640px) 184px, (max-width: 1024px) 220px, 250px"
                        priority
                        draggable={
                          false
                        }
                        className="pointer-events-none select-none object-cover"
                      />

                    </div>

                  </div>

                </div>

              </motion.div>

              {/* DETAILS */}

              <motion.div
                key={`${selectedReference.id}-content`}
                initial={{
                  opacity:
                    0,

                  x:
                    14,
                }}
                animate={{
                  opacity:
                    1,

                  x:
                    0,
                }}
                transition={{
                  duration:
                    0.25,
                }}
                className="self-center"
              >

                <div className="flex flex-wrap items-center gap-2">

                  <span className="rounded-full border border-[#bc965d]/30 bg-[#bc965d]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d2ad73]">

                    {
                      selectedReference.company
                    }

                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-white/45">

                    {isFr
                      ? "Référence vérifiée"
                      : "Verified reference"}

                  </span>

                </div>

                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">

                  {
                    selectedReference.name
                  }

                </h3>

                <p className="mt-3 text-sm font-medium leading-6 text-[#d2ad73] sm:text-base">

                  {
                    selectedReference
                      .role[
                        language
                      ]
                  }

                </p>

                {selectedReference.secondaryRole && (
                  <p className="mt-2 text-sm leading-6 text-white/48">

                    {
                      selectedReference
                        .secondaryRole[
                          language
                        ]
                    }

                  </p>
                )}

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                  <Building2
                    size={18}
                    strokeWidth={
                      1.7
                    }
                    className="mt-0.5 shrink-0 text-[#d2ad73]"
                  />

                  <p className="text-sm leading-6 text-white/58">

                    {
                      selectedReference
                        .relationship[
                          language
                        ]
                    }

                  </p>

                </div>

                {/* EMAIL + PHONE COPY */}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={() =>
                      copyValue(
                        "email",

                        selectedReference.email
                      )
                    }
                    className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left transition hover:border-[#bc965d]/35 hover:bg-[#bc965d]/[0.06]"
                  >

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#bc965d]/20 bg-[#bc965d]/10 text-[#d2ad73]">

                      <Mail
                        size={16}
                        strokeWidth={
                          1.7
                        }
                      />

                    </span>

                    <span className="min-w-0 flex-1">

                      <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        Email
                      </span>

                      <span className="mt-1 block truncate text-xs font-medium text-white/72">

                        {copiedField ===
                        "email"
                          ? isFr
                            ? "Copié ✓"
                            : "Copied ✓"
                          : selectedReference.email}

                      </span>

                    </span>

                    {copiedField ===
                    "email" ? (
                      <Check
                        size={15}
                        strokeWidth={
                          2
                        }
                        className="shrink-0 text-[#d2ad73]"
                      />
                    ) : (
                      <Copy
                        size={15}
                        strokeWidth={
                          1.7
                        }
                        className="shrink-0 text-white/28 transition group-hover:text-[#d2ad73]"
                      />
                    )}

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyValue(
                        "phone",

                        selectedReference.phone
                      )
                    }
                    className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left transition hover:border-[#bc965d]/35 hover:bg-[#bc965d]/[0.06]"
                  >

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#bc965d]/20 bg-[#bc965d]/10 text-[#d2ad73]">

                      <Phone
                        size={16}
                        strokeWidth={
                          1.7
                        }
                      />

                    </span>

                    <span className="min-w-0 flex-1">

                      <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">

                        {isFr
                          ? "Téléphone"
                          : "Phone"}

                      </span>

                      <span className="mt-1 block truncate text-xs font-medium text-white/72">

                        {copiedField ===
                        "phone"
                          ? isFr
                            ? "Copié ✓"
                            : "Copied ✓"
                          : selectedReference.phone}

                      </span>

                    </span>

                    {copiedField ===
                    "phone" ? (
                      <Check
                        size={15}
                        strokeWidth={
                          2
                        }
                        className="shrink-0 text-[#d2ad73]"
                      />
                    ) : (
                      <Copy
                        size={15}
                        strokeWidth={
                          1.7
                        }
                        className="shrink-0 text-white/28 transition group-hover:text-[#d2ad73]"
                      />
                    )}

                  </button>

                </div>

                {/* LINKEDIN */}

                <a
                  href={
                    selectedReference.linkedin
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-[#bc965d]/35 hover:bg-[#bc965d]/[0.06]"
                >

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#bc965d]/20 bg-[#bc965d]/10 text-[#d2ad73]">

                    <LinkedInLogo />

                  </span>

                  <span className="min-w-0 flex-1">

                    <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">
                      LinkedIn
                    </span>

                    <span className="mt-1 block text-xs font-medium text-white/72">

                      {isFr
                        ? "Voir le profil professionnel"
                        : "View professional profile"}

                    </span>

                  </span>

                  <ExternalLink
                    size={15}
                    strokeWidth={
                      1.7
                    }
                    className="ml-auto shrink-0 text-white/30"
                  />

                </a>

                <p className="mt-5 text-[10px] leading-5 text-white/28">

                  {isFr
                    ? "Coordonnées professionnelles publiées avec l’accord de la personne concernée."
                    : "Professional contact details published with the reference’s permission."}

                </p>

              </motion.div>

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

function LinkedInLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >

      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.352V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433A2.062 2.062 0 1 1 5.337 3.31a2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9H7.12v11.452Z" />

    </svg>
  );
}