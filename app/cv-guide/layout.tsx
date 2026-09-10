import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide CV ATS & LaTeX",

  description:
    "Guide pratique d'Ahmed-Farouk DAMERGI pour créer un CV lisible, ATS-friendly et maintenable avec LaTeX, Overleaf ou VS Code, puis organiser ses candidatures.",

  alternates: {
    canonical: "/cv-guide",
  },

  openGraph: {
    title:
      "Guide CV ATS & LaTeX | Ahmed-Farouk DAMERGI",

    description:
      "Créer un CV propre, lisible et ATS-friendly avec LaTeX, puis structurer son suivi de candidatures.",

    url: "/cv-guide",
  },
};

export default function CVGuideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}