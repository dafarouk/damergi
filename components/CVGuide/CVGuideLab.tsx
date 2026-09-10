"use client";

import {
  Check,
  CheckCircle2,
  RefreshCcw,
  ScanSearch,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Language,
} from "@/data/timeline";

export default function CVGuideLab() {
  const [
    language,
    setLanguage,
  ] = useState<Language>(
    "fr"
  );

  const [
    slider,
    setSlider,
  ] = useState(54);

  const [
    checks,
    setChecks,
  ] = useState<boolean[]>(
    Array(10).fill(
      false
    )
  );

  useEffect(() => {
    function syncLanguage() {
      const htmlLanguage =
        document.documentElement.lang;

      setLanguage(
        htmlLanguage ===
          "en"
          ? "en"
          : "fr"
      );
    }

    syncLanguage();

    const observer =
      new MutationObserver(
        syncLanguage
      );

    observer.observe(
      document.documentElement,
      {
        attributes:
          true,

        attributeFilter: [
          "lang",
        ],
      }
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  const isFr =
    language === "fr";

  const checklist =
    useMemo(
      () => [
        isFr
          ? "Le texte du PDF est sélectionnable et copiable."
          : "The PDF text is selectable and copyable.",

        isFr
          ? "Les sections utilisent des titres clairs : Profil, Expérience, Formation, Compétences."
          : "Sections use clear headings: Profile, Experience, Education and Skills.",

        isFr
          ? "Le titre du CV correspond au type de poste visé."
          : "The CV title matches the type of role targeted.",

        isFr
          ? "Les dates et intitulés sont cohérents partout."
          : "Dates and job titles are consistent throughout.",

        isFr
          ? "Les mots-clés importants de l'offre apparaissent naturellement."
          : "Important job-description keywords appear naturally.",

        isFr
          ? "Les coordonnées importantes sont écrites en vrai texte, pas uniquement dans une image."
          : "Important contact details are real text, not only inside an image.",

        isFr
          ? "La mise en page reste lisible sans dépendre d'éléments décoratifs."
          : "The layout remains readable without depending on decorative elements.",

        isFr
          ? "Les chiffres et résultats mentionnés sont réels et défendables en entretien."
          : "Metrics and results are real and defensible in an interview.",

        isFr
          ? "Le nom du fichier est professionnel et explicite."
          : "The filename is professional and explicit.",

        isFr
          ? "Le PDF final a été ouvert, relu et testé avant l'envoi."
          : "The final PDF was opened, proofread and tested before sending.",
      ],
      [
        isFr,
      ]
    );

  const score =
    checks.filter(
      Boolean
    ).length;

  const scannerMessage =
    score <= 3
      ? isFr
        ? "Encore quelques bases à sécuriser avant l'envoi."
        : "A few fundamentals still need attention before sending."
      : score <= 7
        ? isFr
          ? "Bonne base. Continue la vérification point par point."
          : "Good foundation. Keep checking point by point."
        : score < 10
          ? isFr
            ? "Très propre. Il reste seulement quelques contrôles."
            : "Very clean. Only a few checks remain."
          : isFr
            ? "10/10 contrôles terminés. Fais une dernière relecture humaine."
            : "10/10 checks complete. Do one final human proofread.";

  return (
    <section
      id="cv-lab"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--page)] px-5 py-20 text-[var(--ink)] sm:px-8 lg:px-14 lg:py-24"
    >

      <div className="pointer-events-none absolute inset-0 opacity-50">

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",

            backgroundSize:
              "72px 72px",

            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />

      </div>

      <div className="relative mx-auto max-w-[1320px]">

        <div className="max-w-3xl">

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-dark)]">
            CV Lab
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">

            {isFr
              ? "Avant / après + checklist ATS"
              : "Before / after + ATS checklist"}

          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--body-text)] sm:text-base">

            {isFr
              ? "Deux outils simples : visualiser le changement de logique entre un CV très graphique et un CV structuré, puis vérifier les points qui réduisent les risques de mauvais parsing."
              : "Two simple tools: visualise the shift from a highly graphic CV to a structured one, then check the points that reduce parsing risk."}

          </p>

        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">

          {/* BEFORE / AFTER */}

          <article
            id="cv-before-after"
            className="rounded-[30px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:p-7"
          >

            <div className="flex flex-wrap items-start justify-between gap-4">

              <div>

                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[var(--gold-dark)]">

                  <SlidersHorizontal
                    size={15}
                  />

                  {isFr
                    ? "Comparateur visuel"
                    : "Visual comparator"}

                </div>

                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">

                  {isFr
                    ? "Mon changement d'approche"
                    : "My change in approach"}

                </h3>

              </div>

              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em]">

                <span className="rounded-full bg-rose-500/10 px-3 py-1.5 text-rose-600">

                  {isFr
                    ? "Avant"
                    : "Before"}

                </span>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-600">

                  {isFr
                    ? "Après"
                    : "After"}

                </span>

              </div>

            </div>

            <div className="relative mt-7 aspect-[4/3] overflow-hidden rounded-[24px] border border-[var(--line)] bg-[#ebe8e1] shadow-inner sm:aspect-[16/10]">

              {/* BEFORE */}

              <div className="absolute inset-0 bg-[#f3eee8] p-5 sm:p-7">

                <div className="flex h-full gap-4">

                  <div className="w-[35%] rounded-2xl bg-[#2d3242] p-4 text-white">

                    <div className="mx-auto h-14 w-14 rounded-full border-4 border-white/70 bg-white/15" />

                    <div className="mx-auto mt-4 h-2 w-3/4 rounded bg-white/65" />

                    <div className="mx-auto mt-2 h-1.5 w-1/2 rounded bg-white/25" />

                    <div className="mt-8 space-y-2">

                      <div className="h-1.5 w-full rounded bg-[#d99877]" />

                      <div className="h-1.5 w-[82%] rounded bg-white/25" />

                      <div className="h-1.5 w-[68%] rounded bg-white/25" />

                    </div>

                    <div className="mt-7 space-y-2">

                      <div className="h-1.5 w-full rounded bg-[#d99877]" />

                      <div className="h-1.5 w-[75%] rounded bg-white/25" />

                      <div className="h-1.5 w-[90%] rounded bg-white/25" />

                      <div className="h-1.5 w-[62%] rounded bg-white/25" />

                    </div>

                  </div>

                  <div className="flex-1 p-2">

                    <div className="h-4 w-[68%] rounded bg-[#2d3242]" />

                    <div className="mt-2 h-2 w-[42%] rounded bg-[#d99877]" />

                    {[
                      0,
                      1,
                      2,
                    ].map(
                      (
                        item
                      ) => (
                        <div
                          key={
                            item
                          }
                          className="mt-7"
                        >

                          <div className="h-2 w-[45%] rounded bg-[#2d3242]/80" />

                          <div className="mt-3 h-1.5 w-full rounded bg-[#2d3242]/18" />

                          <div className="mt-2 h-1.5 w-[92%] rounded bg-[#2d3242]/18" />

                          <div className="mt-2 h-1.5 w-[77%] rounded bg-[#2d3242]/18" />

                        </div>
                      )
                    )}

                  </div>

                </div>

                <span className="absolute bottom-4 left-5 rounded-full bg-rose-600 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg">

                  {isFr
                    ? "Design d'abord"
                    : "Design first"}

                </span>

              </div>

              {/* AFTER */}

              <div
                className="absolute inset-0 overflow-hidden bg-[#fafafa]"
                style={{
                  clipPath:
                    `inset(0 0 0 ${slider}%)`,
                }}
              >

                <div className="absolute inset-0 p-5 sm:p-7">

                  <div className="mx-auto h-full max-w-[76%] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:p-7">

                    <div className="mx-auto h-4 w-[55%] rounded bg-[#111827]" />

                    <div className="mx-auto mt-2 h-2 w-[42%] rounded bg-[#8B1540]" />

                    <div className="mx-auto mt-3 h-1.5 w-[75%] rounded bg-[#111827]/15" />

                    {[
                      0,
                      1,
                      2,
                      3,
                    ].map(
                      (
                        item
                      ) => (
                        <div
                          key={
                            item
                          }
                          className="mt-5"
                        >

                          <div className="flex items-center gap-2">

                            <div className="h-2 w-[30%] rounded bg-[#111827]/75" />

                            <div className="h-px flex-1 bg-[#8B1540]/55" />

                          </div>

                          <div className="mt-3 h-1.5 w-full rounded bg-[#111827]/13" />

                          <div className="mt-2 h-1.5 w-[94%] rounded bg-[#111827]/13" />

                          <div className="mt-2 h-1.5 w-[82%] rounded bg-[#111827]/13" />

                        </div>
                      )
                    )}

                  </div>

                  <span className="absolute bottom-4 right-5 rounded-full bg-emerald-600 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white shadow-lg">

                    {isFr
                      ? "Structure d'abord"
                      : "Structure first"}

                  </span>

                </div>

              </div>

              <div
                className="pointer-events-none absolute bottom-0 top-0 w-[2px] bg-[#bc965d] shadow-[0_0_18px_rgba(188,150,93,0.55)]"
                style={{
                  left:
                    `${slider}%`,
                }}
              >

                <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#bc965d] bg-[#111827] text-[#d2ad73] shadow-xl">
                  ↔
                </div>

              </div>

            </div>

            <input
              type="range"
              min="10"
              max="90"
              value={
                slider
              }
              onChange={
                (
                  event
                ) =>
                  setSlider(
                    Number(
                      event
                        .target
                        .value
                    )
                  )
              }
              className="mt-5 w-full accent-[#bc965d]"
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.045] p-4">

                <p className="text-xs font-semibold text-rose-600">

                  {isFr
                    ? "Avant : Photoshop / Canva mindset"
                    : "Before: Photoshop / Canva mindset"}

                </p>

                <p className="mt-2 text-xs leading-5 text-[var(--body-text)]">

                  {isFr
                    ? "Priorité au rendu visuel, avec le risque de trop dépendre des colonnes, formes ou images. Canva n'est pas 'mauvais' : c'est l'usage qui compte."
                    : "Visual appearance came first, with the risk of relying too heavily on columns, shapes or images. Canva is not 'bad': how you use it matters."}

                </p>

              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.045] p-4">

                <p className="text-xs font-semibold text-emerald-600">

                  {isFr
                    ? "Après : structure / LaTeX mindset"
                    : "After: structure / LaTeX mindset"}

                </p>

                <p className="mt-2 text-xs leading-5 text-[var(--body-text)]">

                  {isFr
                    ? "Vrai texte, hiérarchie claire, sections cohérentes et design utilisé comme support plutôt que comme fondation."
                    : "Real text, clear hierarchy, consistent sections and design used as support rather than as the foundation."}

                </p>

              </div>

            </div>

          </article>

          {/* ATS CHECKER */}

          <article
            id="ats-checklist"
            className="rounded-[30px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:p-7"
          >

            <div className="flex items-start justify-between gap-5">

              <div>

                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[var(--gold-dark)]">

                  <ScanSearch
                    size={15}
                  />

                  {isFr
                    ? "Checklist ATS"
                    : "ATS checklist"}

                </div>

                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">

                  {isFr
                    ? "10 contrôles avant envoi"
                    : "10 checks before sending"}

                </h3>

              </div>

              <button
                type="button"
                onClick={() =>
                  setChecks(
                    Array(
                      10
                    ).fill(
                      false
                    )
                  )
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--gold)] hover:text-[var(--gold-dark)]"
              >
                <RefreshCcw
                  size={15}
                />
              </button>

            </div>

            <div className="mt-6 rounded-[24px] border border-[var(--line)] bg-[var(--page)]/70 p-5">

              <div className="flex items-end justify-between gap-4">

                <div>

                  <p className="text-4xl font-semibold tracking-[-0.05em] text-[var(--gold-dark)]">
                    {score}/10
                  </p>

                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">

                    {isFr
                      ? "contrôles terminés"
                      : "checks completed"}

                  </p>

                </div>

                <div className="text-right text-xs leading-5 text-[var(--body-text)]">
                  {
                    scannerMessage
                  }
                </div>

              </div>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--line)]">

                <div
                  className="h-full rounded-full bg-[var(--gold)] transition-[width] duration-300"
                  style={{
                    width:
                      `${
                        score *
                        10
                      }%`,
                  }}
                />

              </div>

            </div>

            <div className="mt-5 space-y-2.5">

              {checklist.map(
                (
                  item,
                  index
                ) => {
                  const checked =
                    checks[
                      index
                    ];

                  return (
                    <button
                      key={
                        item
                      }
                      type="button"
                      onClick={() => {
                        setChecks(
                          (
                            current
                          ) =>
                            current.map(
                              (
                                value,
                                itemIndex
                              ) =>
                                itemIndex ===
                                index
                                  ? !value
                                  : value
                            )
                        );
                      }}
                      className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition ${
                        checked
                          ? "border-[var(--gold)]/35 bg-[var(--gold)]/[0.07]"
                          : "border-[var(--line)] bg-[var(--page)]/45 hover:border-[var(--gold)]/25"
                      }`}
                    >

                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                          checked
                            ? "border-[var(--gold)] bg-[var(--gold)] text-[#111827]"
                            : "border-[var(--line)] text-transparent"
                        }`}
                      >
                        <Check
                          size={13}
                          strokeWidth={
                            2.4
                          }
                        />
                      </span>

                      <span className="text-sm leading-6 text-[var(--body-text)]">
                        {
                          item
                        }
                      </span>

                    </button>
                  );
                }
              )}

            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--gold)]/20 bg-[var(--gold)]/[0.055] p-4">

              {score ===
              10 ? (
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--gold-dark)]"
                />
              ) : (
                <X
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--muted)]"
                />
              )}

              <p className="text-xs leading-5 text-[var(--body-text)]">

                {isFr
                  ? "Ce n'est pas un score de compatibilité ATS. Aucun checklist ne peut garantir le comportement de tous les ATS : ici on vérifie simplement des bonnes pratiques concrètes."
                  : "This is not an ATS compatibility score. No checklist can guarantee how every ATS behaves: this simply checks concrete good practices."}

              </p>

            </div>

          </article>

        </div>

      </div>

    </section>
  );
}