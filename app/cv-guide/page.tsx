"use client";

import Link from "next/link";

import {
  AlertTriangle,
  BookOpenText,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  LayoutTemplate,
  ListChecks,
  Palette,
  Terminal,
  Type,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/Navbar/Navbar";
import PageProgress from "@/components/Progress/PageProgress";

import type {
  Language,
} from "@/data/timeline";

/* =========================================================
   FULL ANONYMISED LATEX TEMPLATE
========================================================= */

const fullTemplate = String.raw`\documentclass[10pt,a4paper]{article}

% ============================================================
% PAGE
% ============================================================

\usepackage[
  a4paper,
  top=0.70cm,
  bottom=0.70cm,
  left=0.90cm,
  right=0.90cm
]{geometry}

% ============================================================
% LANGUAGE + ATS TEXT EXTRACTION
% ============================================================

\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[english]{babel}
\usepackage{textcomp}

\input{glyphtounicode}
\pdfgentounicode=1

% ============================================================
% FONT
% ============================================================

\usepackage{tgheros}
\renewcommand{\familydefault}{\sfdefault}

% ============================================================
% PACKAGES
% ============================================================

\usepackage{xcolor}
\usepackage{hyperref}
\usepackage{microtype}

% ============================================================
% COLORS
% ============================================================

\definecolor{ink}{HTML}{111827}
\definecolor{accent}{HTML}{8B1540}

% ============================================================
% LINKS
% ============================================================

\hypersetup{
  colorlinks=true,
  urlcolor=ink,
  linkcolor=ink,
  pdfauthor={YOUR NAME},
  pdftitle={CV YOUR NAME}
}

\urlstyle{same}

% ============================================================
% GENERAL
% ============================================================

\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}

\pagestyle{empty}
\color{ink}

\hyphenpenalty=10000
\exhyphenpenalty=10000
\tolerance=4000
\emergencystretch=2em

% ============================================================
% SECTION TITLE
% ============================================================

\newcommand{\sectiontitle}[1]{%
  \vspace{0.10cm}%
  {\fontsize{10.5pt}{11.1pt}\selectfont
  \bfseries #1}\par
  \vspace{-0.06cm}%
  {\color{accent}\rule{\linewidth}{0.55pt}}\par
  \vspace{0.02cm}%
}

% ============================================================
% JOB HEADER
% ============================================================

\newcommand{\jobheader}[4]{%
  {\fontsize{9pt}{9.6pt}\selectfont
  \bfseries #1}\par

  {\fontsize{8.5pt}{9.1pt}\selectfont
  \textbf{#2}
  \hfill
  \textbf{#4}}\par

  {\fontsize{7.9pt}{8.4pt}\selectfont
  #3}\par

  \vspace{0.03cm}
}

% ============================================================
% BULLET
% ============================================================

\newcommand{\cvbullet}[1]{%
  \noindent
  \hangindent=0.28cm
  \hangafter=1
  \makebox[0.22cm][l]{\textbullet}%
  {\fontsize{8.15pt}{9.05pt}\selectfont #1}\par
  \vspace{0.02cm}
}

% ============================================================
% TOOLS
% ============================================================

\newcommand{\tools}[1]{%
  {\fontsize{7.9pt}{8.65pt}\selectfont
  \textbf{Tools:} #1}\par
}

% ============================================================
% EDUCATION
% ============================================================

\newcommand{\edu}[4]{%
  {\fontsize{8.35pt}{8.95pt}\selectfont
  \textbf{#1}
  \hfill
  \textbf{#3}}\par

  {\fontsize{7.8pt}{8.4pt}\selectfont
  #2}\par

  {\fontsize{7.65pt}{8.25pt}\selectfont
  #4}\par

  \vspace{0.07cm}
}

% ============================================================
% DOCUMENT
% ============================================================

\begin{document}

\fontsize{8.2pt}{9.1pt}\selectfont

% ============================================================
% HEADER
% ============================================================

{\centering

{\fontsize{25pt}{27pt}\selectfont
\bfseries
YOUR NAME}\par

\vspace{0.07cm}

{\fontsize{10.2pt}{10.8pt}\selectfont
\bfseries
TARGET ROLE
\textbar{}
SECOND TARGET ROLE}\par

\vspace{0.06cm}

{\fontsize{7.7pt}{8.2pt}\selectfont
City, Country

\hspace{0.5em}
\textbar{}
\hspace{0.5em}

\href{mailto:email@example.com}{
email@example.com
}

\hspace{0.5em}
\textbar{}
\hspace{0.5em}

+00 0 00 00 00 00

\hspace{0.5em}
\textbar{}
\hspace{0.5em}

\href{
https://linkedin.com/in/your-profile
}{
LinkedIn
}

}\par
}

\vspace{0.06cm}

{\color{accent}
\rule{\textwidth}{1pt}}

% ============================================================
% PROFILE
% ============================================================

\sectiontitle{PROFILE}

{\fontsize{8.2pt}{9.15pt}\selectfont
Data / Business Analyst with experience in
reporting, KPI monitoring, analysis and automation.
Skilled in Power BI, SQL, Excel and Python.
Seeking a permanent role from MONTH YEAR.
}\par

% ============================================================
% EXPERIENCE
% ============================================================

\sectiontitle{PROFESSIONAL EXPERIENCE}

\jobheader
{Job Title}
{Company Name}
{City, Country}
{Month YEAR -- Present}

\cvbullet{
Start with an action verb.
Explain what you analysed, built,
improved or automated and why it mattered.
}

\cvbullet{
Add a verified number when you genuinely
have one: volume, frequency, time saved,
users, dashboards or KPI.
}

\cvbullet{
Keep the bullet concise and focused
on one clear contribution.
}

\tools{
Power BI, SQL, Excel, Python
}

\vspace{0.10cm}

\jobheader
{Previous Job Title}
{Previous Company}
{City, Country}
{Month YEAR -- Month YEAR}

\cvbullet{
Describe a relevant responsibility using
keywords that match your target roles.
}

\cvbullet{
Show the business context or measurable
result without inventing impact.
}

\tools{
Tool 1, Tool 2, Tool 3
}

% ============================================================
% EDUCATION
% ============================================================

\sectiontitle{EDUCATION}

\edu
{Degree / Master Title}
{School / University, City, Country}
{YEAR -- YEAR}
{Relevant subjects or specialization.}

\edu
{Previous Degree}
{School / University, City, Country}
{YEAR -- YEAR}
{Relevant subjects.}

% ============================================================
% SKILLS
% ============================================================

\sectiontitle{TECHNICAL SKILLS}

{\fontsize{8pt}{8.7pt}\selectfont

\textbf{Analysis \& BI:}
Power BI, Excel, Tableau, KPI, Reporting.
\par

\textbf{Data \& SQL:}
SQL, MySQL, Python,
Data Quality, Data Modelling.
\par

\textbf{Automation \& Tools:}
VBA, Power Automate, Git, Jira.
\par
}

% ============================================================
% LANGUAGES
% ============================================================

\sectiontitle{LANGUAGES}

{\fontsize{8pt}{8.6pt}\selectfont

\textbf{Language 1:}
C1

\hspace{1.5em}
\textbar{}
\hspace{1.5em}

\textbf{Language 2:}
B2
}

% ============================================================
% CERTIFICATIONS
% ============================================================

\sectiontitle{CERTIFICATIONS}

{\fontsize{7.9pt}{8.5pt}\selectfont

\textbf{Certification Name}
(YEAR)

\hspace{1em}
\textbar{}
\hspace{1em}

\textbf{Certification Name}
(YEAR)
}

\end{document}`;

/* =========================================================
   SMALL LATEX EXAMPLES
========================================================= */

const snippets = [
  {
    id: "section",

    icon: LayoutTemplate,

    frTitle:
      "Créer une nouvelle section",

    enTitle:
      "Create a new section",

    frText:
      "Définis la commande une seule fois puis réutilise-la pour Expériences, Formation, Compétences, etc.",

    enText:
      "Define the command once, then reuse it for Experience, Education, Skills and more.",

    code: String.raw`% PREAMBLE

\newcommand{\sectiontitle}[1]{%
  \vspace{0.10cm}%
  {\fontsize{10.5pt}{11.1pt}
  \selectfont\bfseries #1}\par

  \rule{\linewidth}{0.55pt}\par
}

% DOCUMENT

\sectiontitle{
PROFESSIONAL EXPERIENCE
}`,
  },

  {
    id: "color",

    icon: Palette,

    frTitle:
      "Changer les couleurs",

    enTitle:
      "Change colors",

    frText:
      "Utilise une couleur d'accent sobre pour la hiérarchie visuelle.",

    enText:
      "Use a restrained accent color for visual hierarchy.",

    code: String.raw`\usepackage{xcolor}

\definecolor{accent}{
  HTML
}{
  8B1540
}

\definecolor{ink}{
  HTML
}{
  111827
}

\color{ink}

{\color{accent}
\rule{\textwidth}{1pt}}`,
  },

  {
    id: "font",

    icon: Type,

    frTitle:
      "Changer une taille de texte",

    enTitle:
      "Change font size",

    frText:
      "Le premier nombre contrôle la taille. Le second contrôle l'interligne.",

    enText:
      "The first number controls font size. The second controls line height.",

    code: String.raw`{\fontsize{8.2pt}{9.1pt}
\selectfont
Your text
}

% Smaller

{\fontsize{7.8pt}{8.5pt}
\selectfont
Your text
}

% Larger

{\fontsize{10pt}{11pt}
\selectfont
Your text
}`,
  },

  {
    id: "space",

    icon: ChevronRight,

    frTitle:
      "Contrôler les espaces",

    enTitle:
      "Control spacing",

    frText:
      "vspace agit verticalement et hspace horizontalement. Les valeurs négatives réduisent l'espace.",

    enText:
      "vspace controls vertical spacing and hspace controls horizontal spacing. Negative values reduce space.",

    code: String.raw`% More vertical space
\vspace{0.15cm}

% Less vertical space
\vspace{-0.08cm}

% Horizontal space
\hspace{0.8em}`,
  },

  {
    id: "margins",

    icon: FileText,

    frTitle:
      "Modifier les marges",

    enTitle:
      "Change margins",

    frText:
      "Geometry te permet de récupérer de l'espace, mais évite de tout compresser jusqu'à rendre le CV illisible.",

    enText:
      "Geometry helps recover space, but do not compress the page until readability suffers.",

    code: String.raw`\usepackage[
  a4paper,
  top=0.70cm,
  bottom=0.70cm,
  left=0.90cm,
  right=0.90cm
]{geometry}`,
  },

  {
    id: "photo",

    icon: ImageIcon,

    frTitle:
      "Ajouter une photo",

    enTitle:
      "Add a photo",

    frText:
      "Possible, mais je préfère garder mon template ATS principal sans photo. Une image ne doit jamais remplacer du texte.",

    enText:
      "Possible, but I prefer keeping the main ATS-focused template photo-free. An image should never replace text.",

    code: String.raw`% PREAMBLE

\usepackage{graphicx}

% DOCUMENT

\includegraphics[
  width=2.2cm,
  height=2.2cm,
  keepaspectratio
]{
  photo.jpg
}`,
  },

  {
    id: "columns",

    icon: LayoutTemplate,

    frTitle:
      "Créer deux colonnes",

    enTitle:
      "Create two columns",

    frText:
      "C'est possible, mais pour un CV très orienté ATS je privilégie personnellement une structure simple à une colonne.",

    enText:
      "It is possible, but for an ATS-focused CV I personally prefer a simple single-column structure.",

    code: String.raw`\usepackage{multicol}

\begin{multicols}{2}

Left column

\columnbreak

Right column

\end{multicols}`,
  },

  {
    id: "date",

    icon: FileText,

    frTitle:
      "Mettre les dates à droite",

    enTitle:
      "Align dates to the right",

    frText:
      "hfill pousse automatiquement ce qui suit vers le bord droit.",

    enText:
      "hfill automatically pushes the following element to the right.",

    code: String.raw`\textbf{Company Name}

\hfill

\textbf{
2025 -- 2026
}\par`,
  },

  {
    id: "ats",

    icon: ClipboardCheck,

    frTitle:
      "Faciliter l'extraction du texte",

    enTitle:
      "Improve text extraction",

    frText:
      "Ces lignes sont présentes dans mon propre template pour aider le PDF à conserver un mapping Unicode propre.",

    enText:
      "These lines are present in my own template to help preserve clean Unicode mapping inside the PDF.",

    code: String.raw`\usepackage[T1]{fontenc}

\usepackage[utf8]{
  inputenc
}

\input{
  glyphtounicode
}

\pdfgentounicode=1`,
  },
];

/* =========================================================
   COPY BLOCK
========================================================= */

function CopyBlock({
  code,
  language,
  label,
}: {
  code: string;
  language: Language;
  label?: string;
}) {
  const [
    copied,
    setCopied,
  ] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(
        code
      );
    } catch {
      const textarea =
        document.createElement(
          "textarea"
        );

      textarea.value = code;

      textarea.style.position =
        "fixed";

      textarea.style.opacity =
        "0";

      document.body.appendChild(
        textarea
      );

      textarea.select();

      document.execCommand(
        "copy"
      );

      textarea.remove();
    }

    setCopied(true);

    window.setTimeout(
      () => {
        setCopied(false);
      },
      1600
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[#0d1420] shadow-[0_18px_50px_rgba(15,23,42,0.10)]">

      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">

        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">

          <Code2
            size={14}
            strokeWidth={1.7}
          />

          {label || "LaTeX"}

        </div>

        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:border-[#bc965d]/60 hover:bg-[#bc965d]/10 hover:text-white"
        >
          {copied ? (
            <Check size={13} />
          ) : (
            <Copy size={13} />
          )}

          {copied
            ? language === "fr"
              ? "Copié"
              : "Copied"
            : language === "fr"
              ? "Copier"
              : "Copy"}

        </button>

      </div>

      <pre className="max-h-[620px] overflow-auto p-4 text-[12px] leading-6 text-white/[0.78] sm:p-5 sm:text-[13px]">
        <code>
          {code}
        </code>
      </pre>

    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function CVGuidePage() {
  const [
    language,
    setLanguage,
  ] = useState<Language>(
    "fr"
  );

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "damergi-language"
      );

    if (
      savedLanguage === "fr" ||
      savedLanguage === "en"
    ) {
      setLanguage(
        savedLanguage
      );

      document.documentElement.lang =
        savedLanguage;
    }
  }, []);

  function changeLanguage(
    nextLanguage: Language
  ) {
    setLanguage(
      nextLanguage
    );

    localStorage.setItem(
      "damergi-language",
      nextLanguage
    );

    document.documentElement.lang =
      nextLanguage;
  }

  const isFr =
    language === "fr";

  const principles = [
    {
      n: "01",

      title:
        isFr
          ? "Du vrai texte"
          : "Real text",

      text:
        isFr
          ? "Le texte du PDF doit pouvoir être sélectionné et copié. Évite de transformer tout ton CV en image."
          : "The PDF text should be selectable and copyable. Avoid turning your entire CV into an image.",
    },

    {
      n: "02",

      title:
        isFr
          ? "Structure simple"
          : "Simple structure",

      text:
        isFr
          ? "Profil, expériences, formation, compétences et certifications avec des titres clairs."
          : "Profile, experience, education, skills and certifications with clear headings.",
    },

    {
      n: "03",

      title:
        isFr
          ? "Mots-clés adaptés"
          : "Relevant keywords",

      text:
        isFr
          ? "Adapte le titre et les compétences à l'offre sans inventer une expérience que tu n'as pas."
          : "Tailor your title and skills to the job description without inventing experience.",
    },

    {
      n: "04",

      title:
        isFr
          ? "Design au service du contenu"
          : "Design serves content",

      text:
        isFr
          ? "Les couleurs et la typographie peuvent rendre le CV plus agréable, mais la structure reste prioritaire."
          : "Colors and typography can improve presentation, but structure remains the priority.",
    },
  ];

  const checklist = [
    isFr
      ? "Le texte du PDF est sélectionnable."
      : "PDF text is selectable.",

    isFr
      ? "Le titre correspond au poste visé."
      : "The title matches the target role.",

    isFr
      ? "Les dates sont cohérentes."
      : "Dates are consistent.",

    isFr
      ? "Les mots-clés importants apparaissent naturellement."
      : "Important keywords appear naturally.",

    isFr
      ? "Chaque chiffre est réel et vérifiable."
      : "Every metric is real and supportable.",

    isFr
      ? "Le nom du fichier est professionnel."
      : "The filename is professional.",

    isFr
      ? "Le CV a été relu une dernière fois."
      : "The CV has been proofread.",

    isFr
      ? "La candidature est enregistrée dans ton tracker."
      : "The application is recorded in your tracker.",
  ];

  return (
    <>
      <PageProgress />

      <Navbar
        language={language}
        onLanguageChange={
          changeLanguage
        }
      />

      <main className="relative min-h-screen overflow-hidden bg-[var(--page)] pt-20 text-[var(--ink)] lg:pt-28">

        {/* GRID BACKGROUND */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",

            backgroundSize:
              "72px 72px",

            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 68%)",
          }}
        />

        {/* =================================================
            HERO
        ================================================== */}

        <section className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-14 lg:pb-24 lg:pt-24">

          <div className="mx-auto max-w-5xl text-center">

            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[var(--surface)]/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--gold-dark)] shadow-sm backdrop-blur">

              <BookOpenText
                size={15}
                strokeWidth={1.8}
              />

              {isFr
                ? "Guide pratique pour créer votre CV · basé sur mon expérience"
                : "Practical guide to create your CV · based on my experience"}

            </div>

            <h1 className="text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">

              {isFr
                ? "Construire un CV attractif, lisible et ATS-friendly."
                : "Build an attractive, readable and ATS-friendly CV."}

            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-[var(--body-text)] sm:text-lg sm:leading-8">

              {isFr
                ? "Au début, je faisais complètement l'inverse : Photoshop, puis Canva, beaucoup de design, des colonnes, des couleurs... mais pas assez de réflexion sur la façon dont un ATS allait lire le fichier. Ensuite j'ai découvert LaTeX et j'ai changé toute mon approche."
                : "At first, I did almost the opposite: Photoshop, then Canva, lots of design, columns and colors... but not enough thought about how an ATS would actually read the file. Then I discovered LaTeX and changed my whole approach."}

            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <a
                href="#template"
                className="rounded-full bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                {isFr
                  ? "Voir le template"
                  : "View template"}
              </a>

              <a
                href="https://www.overleaf.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--gold)]"
              >
                Overleaf

                <ExternalLink
                  size={14}
                  strokeWidth={1.8}
                />
              </a>

            </div>

          </div>

        </section>

        {/* =================================================
            MY STORY
        ================================================== */}

        <section className="relative mx-auto max-w-[1320px] px-5 pb-20 sm:px-8 lg:px-14">

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">

            <article className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_60px_rgba(17,24,39,0.06)] sm:p-8">

              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-dark)]">
                {isFr
                  ? "Ce que je faisais avant"
                  : "What I used to do"}
              </p>

              <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">

                {isFr
                  ? "Je traitais mon CV comme une affiche."
                  : "I treated my CV like a poster."}

              </h2>

              <p className="mt-5 leading-7 text-[var(--body-text)]">

                {isFr
                  ? "Mon premier réflexe était Photoshop. Ensuite Canva. Je voulais surtout que le CV soit joli : couleurs, blocs, deux colonnes, mise en page très graphique."
                  : "My first instinct was Photoshop. Later Canva. I mainly wanted the CV to look good: colors, blocks, two columns and a very visual layout."}

              </p>

              <p className="mt-4 leading-7 text-[var(--body-text)]">

                {isFr
                  ? "Mais un CV n'est pas uniquement destiné à un humain. Avant d'arriver devant un recruteur, il peut passer par un ATS. J'ai donc commencé à privilégier la structure, le texte réel, les mots-clés et la lisibilité."
                  : "But a CV is not only meant for humans. Before reaching a recruiter, it may go through an ATS. So I started prioritizing structure, real text, keywords and readability."}

              </p>

            </article>

            <article className="rounded-[28px] border border-[#bc965d]/25 bg-[#111827] p-6 text-white shadow-[0_22px_70px_rgba(17,24,39,0.16)] sm:p-8">

              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d2ad73]">
                {isFr
                  ? "Ce que j'ai changé"
                  : "What I changed"}
              </p>

              <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">

                {isFr
                  ? "Structure d'abord. Design ensuite."
                  : "Structure first. Design second."}

              </h2>

              <p className="mt-5 leading-7 text-white/65">

                {isFr
                  ? "LaTeX m'a permis de garder un CV propre visuellement tout en ayant un document entièrement textuel, précis, facile à adapter à chaque offre et beaucoup plus simple à maintenir."
                  : "LaTeX allowed me to keep a visually clean CV while using a fully text-based document that is precise, easy to tailor and much easier to maintain."}

              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {[
                  isFr
                    ? "Texte sélectionnable"
                    : "Selectable text",

                  isFr
                    ? "Structure cohérente"
                    : "Consistent structure",

                  isFr
                    ? "Modification rapide"
                    : "Fast editing",

                  isFr
                    ? "Sections réutilisables"
                    : "Reusable sections",

                  isFr
                    ? "PDF propre"
                    : "Clean PDF",

                  isFr
                    ? "Adaptation par offre"
                    : "Tailored per role",
                ].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                    >
                      <CheckCircle2
                        size={17}
                        strokeWidth={1.8}
                        className="mt-0.5 shrink-0 text-[#d2ad73]"
                      />

                      <span className="text-sm leading-6 text-white/[0.76]">
                        {item}
                      </span>

                    </div>
                  )
                )}

              </div>

            </article>

          </div>

        </section>

        {/* =================================================
            ATS PRINCIPLES
        ================================================== */}

        <section className="relative border-y border-[var(--line)] bg-[var(--surface)]/55">

          <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-14">

            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-dark)]">
              ATS
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">

              {isFr
                ? "Les bases que je respecte maintenant"
                : "The basics I follow now"}

            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

              {principles.map(
                (item) => (
                  <article
                    key={item.n}
                    className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/45 hover:shadow-lg"
                  >

                    <span className="text-xs font-semibold tracking-[0.18em] text-[var(--gold-dark)]">
                      {item.n}
                    </span>

                    <h3 className="mt-4 text-lg font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[var(--body-text)]">
                      {item.text}
                    </p>

                  </article>
                )
              )}

            </div>

            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[var(--gold)]/25 bg-[var(--gold)]/[0.07] p-5 text-sm leading-6 text-[var(--body-text)]">

              <AlertTriangle
                size={18}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[var(--gold-dark)]"
              />

              <p>
                {isFr
                  ? "Aucun format ne garantit un parsing parfait dans tous les ATS. Le but est simplement de réduire les risques : texte réel, structure claire, vocabulaire pertinent et PDF propre."
                  : "No format guarantees perfect parsing in every ATS. The goal is simply to reduce risk with real text, clear structure, relevant vocabulary and a clean PDF."}
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            OVERLEAF / LOCAL
        ================================================== */}

        <section className="relative mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-14">

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-dark)]">
            {isFr
              ? "Créer le PDF"
              : "Build the PDF"}
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Overleaf ou ton propre IDE
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">

            <article className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--gold)]/10 text-[var(--gold-dark)]">
                <BookOpenText
                  size={21}
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Overleaf
              </h3>

              <p className="mt-3 leading-7 text-[var(--body-text)]">

                {isFr
                  ? "La méthode la plus facile pour commencer. Crée un projet vide, ouvre main.tex, colle ton code puis compile."
                  : "The easiest method to start. Create a blank project, open main.tex, paste your code and compile."}

              </p>

              <a
                href="https://www.overleaf.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-dark)] hover:underline"
              >
                overleaf.com

                <ExternalLink
                  size={14}
                  strokeWidth={1.8}
                />
              </a>

            </article>

            <article className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--gold)]/10 text-[var(--gold-dark)]">
                <Terminal
                  size={21}
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                VS Code + LaTeX
              </h3>

              <p className="mt-3 leading-7 text-[var(--body-text)]">

                {isFr
                  ? "Si tu préfères tout garder sur ton ordinateur, installe une distribution LaTeX comme MiKTeX ou TeX Live, puis travaille directement avec tes fichiers .tex dans VS Code."
                  : "If you prefer keeping everything locally, install a LaTeX distribution such as MiKTeX or TeX Live and work directly with your .tex files in VS Code."}

              </p>

              <div className="mt-6 rounded-2xl bg-[#0d1420] px-4 py-3 font-mono text-sm text-white/75">
                pdflatex cv.tex
              </div>

            </article>

          </div>

        </section>

        {/* =================================================
            TEMPLATE
        ================================================== */}

        <section
          id="template"
          className="relative border-y border-[var(--line)] bg-[var(--surface)]/50"
        >

          <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-14">

            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">

              <div className="lg:sticky lg:top-36">

                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-dark)]">
                  {isFr
                    ? "Template LaTeX"
                    : "LaTeX template"}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">

                  {isFr
                    ? "Copie. Remplace. Compile."
                    : "Copy. Replace. Compile."}

                </h2>

                <p className="mt-5 leading-7 text-[var(--body-text)]">

                  {isFr
                    ? "Ce template est directement inspiré de la structure que j'utilise pour mon propre CV. Toutes mes informations personnelles ont été retirées."
                    : "This template is directly inspired by the structure I use for my own CV. All of my personal information has been removed."}

                </p>

                <div className="mt-6 space-y-3 text-sm text-[var(--body-text)]">

                  {[
                    isFr
                      ? "Remplace YOUR NAME et les coordonnées."
                      : "Replace YOUR NAME and contact details.",

                    isFr
                      ? "Supprime les sections inutiles."
                      : "Delete unnecessary sections.",

                    isFr
                      ? "Adapte ton titre à l'offre."
                      : "Tailor your title to the role.",

                    isFr
                      ? "N'invente jamais de chiffres."
                      : "Never invent metrics.",
                  ].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3"
                      >

                        <CheckCircle2
                          size={16}
                          strokeWidth={1.8}
                          className="mt-0.5 shrink-0 text-[var(--gold-dark)]"
                        />

                        <span>
                          {item}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>

              <CopyBlock
                code={fullTemplate}
                language={language}
                label="cv-template.tex"
              />

            </div>

          </div>

        </section>

        {/* =================================================
            CUSTOMIZATION
        ================================================== */}

        <section className="relative mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-14">

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-dark)]">
            {isFr
              ? "Personnalisation"
              : "Customization"}
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">

            {isFr
              ? "Les blocs que tu vas modifier le plus souvent"
              : "The blocks you will edit most often"}

          </h2>

          <div className="mt-10 space-y-7">

            {snippets.map(
              (snippet) => {
                const Icon =
                  snippet.icon;

                return (
                  <article
                    key={snippet.id}
                    className="grid gap-5 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8"
                  >

                    <div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--gold)]/10 text-[var(--gold-dark)]">

                        <Icon
                          size={19}
                          strokeWidth={1.8}
                        />

                      </div>

                      <h3 className="mt-4 text-xl font-semibold">

                        {isFr
                          ? snippet.frTitle
                          : snippet.enTitle}

                      </h3>

                      <p className="mt-3 text-sm leading-6 text-[var(--body-text)]">

                        {isFr
                          ? snippet.frText
                          : snippet.enText}

                      </p>

                    </div>

                    <CopyBlock
                      code={snippet.code}
                      language={language}
                    />

                  </article>
                );
              }
            )}

          </div>

        </section>

        {/* =================================================
            APPLICATION TRACKER
        ================================================== */}

        <section className="relative border-y border-white/10 bg-[#111827] text-white">

          <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-14">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#bc965d]/30 bg-[#bc965d]/10 text-[#d2ad73]">

                <ListChecks
                  size={23}
                  strokeWidth={1.7}
                />

              </div>

              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d2ad73]">

                {isFr
                  ? "Ne t'arrête pas au CV"
                  : "Do not stop at the CV"}

              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">

                {isFr
                  ? "Tracke chaque candidature."
                  : "Track every application."}

              </h2>

              <p className="mt-5 leading-7 text-white/[0.64]">

                {isFr
                  ? "Postuler au hasard puis oublier les offres est une mauvaise stratégie. Si un recruteur t'appelle plusieurs semaines plus tard, tu dois retrouver immédiatement l'entreprise, le poste, l'offre, le CV envoyé et tes notes."
                  : "Applying randomly and forgetting the roles is a bad strategy. If a recruiter calls several weeks later, you should immediately find the company, role, job description, CV sent and your notes."}

              </p>

            </div>

            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045]">

              {[
                [
                  isFr
                    ? "Entreprise + poste"
                    : "Company + role",

                  isFr
                    ? "Identifier immédiatement la candidature"
                    : "Identify the application instantly",

                  "Company X",
                ],

                [
                  isFr
                    ? "Date"
                    : "Date",

                  isFr
                    ? "Savoir depuis combien de temps tu attends"
                    : "Know how long you have been waiting",

                  "10/09/2026",
                ],

                [
                  isFr
                    ? "Statut"
                    : "Status",

                  isFr
                    ? "Candidature, entretien, refus, offre..."
                    : "Applied, interview, rejected, offer...",

                  isFr
                    ? "Entretien"
                    : "Interview",
                ],

                [
                  "Contact",

                  isFr
                    ? "Nom, email ou LinkedIn du recruteur"
                    : "Recruiter name, email or LinkedIn",

                  "X. Xxxxx",
                ],

                [
                  isFr
                    ? "Relance"
                    : "Follow-up",

                  isFr
                    ? "Prévoir la prochaine action"
                    : "Plan the next action",

                  "+7 days",
                ],

                [
                  "Notes",

                  isFr
                    ? "Salaire, stack, détails de l'entretien..."
                    : "Salary, stack, interview details...",

                  "Power BI / SQL",
                ],
              ].map(
                (row) => (
                  <div
                    key={`${row[0]}-${row[2]}`}
                    className="grid grid-cols-[1.05fr_1.25fr_0.8fr] border-b border-white/[0.07] px-4 py-4 text-xs leading-5 last:border-b-0 sm:px-5 sm:text-sm"
                  >

                    <span className="pr-3 font-medium text-white/85">
                      {row[0]}
                    </span>

                    <span className="pr-3 text-white/55">
                      {row[1]}
                    </span>

                    <span className="text-[#d2ad73]">
                      {row[2]}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            FINAL CHECKLIST
        ================================================== */}

        <section className="relative mx-auto max-w-[1050px] px-5 py-20 text-center sm:px-8 lg:py-24">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/10 text-[var(--gold-dark)]">

            <ClipboardCheck
              size={23}
              strokeWidth={1.8}
            />

          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">

            {isFr
              ? "Avant d'envoyer ton CV"
              : "Before sending your CV"}

          </h2>

          <div className="mx-auto mt-8 grid max-w-4xl gap-3 text-left sm:grid-cols-2">

            {checklist.map(
              (item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4"
                >

                  <CheckCircle2
                    size={17}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-[var(--gold-dark)]"
                  />

                  <span className="text-sm leading-6 text-[var(--body-text)]">
                    {item}
                  </span>

                </div>
              )
            )}

          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl"
          >

            {isFr
              ? "Retour à mon portfolio"
              : "Back to my portfolio"}

            <ChevronRight
              size={15}
              strokeWidth={1.8}
            />

          </Link>

        </section>

      </main>
    </>
  );
}