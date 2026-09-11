"use client";

import {
  ArrowUpRight,
  UserRoundCheck,
} from "lucide-react";

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

import type {
  ProfessionalReferenceId,
} from "@/data/professionalReferences";

type ProfessionalReferencesControllerProps = {
  language: Language;
};

type PortalTarget = {
  key: string;
  element: HTMLElement;
  referenceId: ProfessionalReferenceId;
};

export default function ProfessionalReferencesController({
  language,
}: ProfessionalReferencesControllerProps) {
  const [
    targets,
    setTargets,
  ] =
    useState<
      PortalTarget[]
    >([]);

  const isFr =
    language === "fr";

  useEffect(() => {
    function collectTargets() {
      const nextTargets:
        PortalTarget[] = [];

      const desktopChapters =
        Array.from(
          document.querySelectorAll<HTMLElement>(
            ".story-scroll .story-chapter"
          )
        );

      const mobileChapters =
        Array.from(
          document.querySelectorAll<HTMLElement>(
            "#mobile-journey article"
          )
        );

      function findReferenceId(
        element: HTMLElement
      ): ProfessionalReferenceId | null {
        const heading =
          element.querySelector(
            "h1, h2, h3"
          );

        const text =
          heading?.textContent
            ?.toLowerCase() ??
          "";

        if (
          text.includes(
            "air france"
          )
        ) {
          return "nadine";
        }

        if (
          text.includes(
            "aycode"
          )
        ) {
          return "aymen";
        }

        return null;
      }

      desktopChapters.forEach(
        (
          chapter,
          index
        ) => {
          const referenceId =
            findReferenceId(
              chapter
            );

          if (!referenceId)
            return;

          const content =
            chapter.querySelector<HTMLElement>(
              ":scope > div"
            );

          if (!content)
            return;

          nextTargets.push({
            key:
              `desktop-${referenceId}-${index}`,

            element:
              content,

            referenceId,
          });
        }
      );

      mobileChapters.forEach(
        (
          chapter,
          index
        ) => {
          const referenceId =
            findReferenceId(
              chapter
            );

          if (!referenceId)
            return;

          const content =
            chapter.querySelector<HTMLElement>(
              ":scope > div"
            );

          if (!content)
            return;

          nextTargets.push({
            key:
              `mobile-${referenceId}-${index}`,

            element:
              content,

            referenceId,
          });
        }
      );

      setTargets(
        nextTargets
      );
    }

    const firstTimer =
      window.setTimeout(
        collectTargets,
        120
      );

    const secondTimer =
      window.setTimeout(
        collectTargets,
        700
      );

    return () => {
      window.clearTimeout(
        firstTimer
      );

      window.clearTimeout(
        secondTimer
      );

      setTargets([]);
    };
  }, [language]);

  function openReference(
    referenceId:
      ProfessionalReferenceId
  ) {
    window.dispatchEvent(
      new CustomEvent(
        "damergi:open-references",
        {
          detail: {
            referenceId,
          },
        }
      )
    );
  }

  return (
    <>

      {targets.map(
        (
          target
        ) =>
          createPortal(
            <button
              key={
                target.key
              }
              type="button"
              onClick={() =>
                openReference(
                  target.referenceId
                )
              }
              className="
                group
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--gold-soft)]
                bg-[var(--surface)]/75
                px-4
                py-2.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.11em]
                text-[var(--gold-dark)]
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[var(--gold)]
                hover:bg-[var(--gold)]/[0.08]
                hover:shadow-[0_10px_30px_var(--gold-halo)]
                sm:text-[11px]
              "
            >

              <UserRoundCheck
                size={15}
                strokeWidth={
                  1.8
                }
              />

              {isFr
                ? "Référence professionnelle"
                : "Professional reference"}

              <ArrowUpRight
                size={14}
                strokeWidth={
                  1.8
                }
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />

            </button>,

            target.element
          )
      )}

    </>
  );
}