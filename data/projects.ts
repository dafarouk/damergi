import type {
  Language,
} from "@/data/timeline";

export type PortfolioProject = {
  id: string;
  title: string;
  version: string;
  platform: string;

  sourceUrl: string;
  downloadUrl?: string;

  githubRepo: string;
  publicRepoUrl: string;

  description: Record<
    Language,
    string
  >;
};

export const portfolioProjects: PortfolioProject[] =
  [
    {
      id:
        "cv-maker",

      title:
        "CVM — CV Maker",

      version:
        "v1.0.2",

      platform:
        "Windows x64",

      sourceUrl:
        "https://github.com/dafarouk/CV-Maker-Source-Code",

      downloadUrl:
        "https://github.com/dafarouk/CV-Maker/releases/download/v1.0.2/CV-Maker-v1.0.2-Windows-x64.zip",

      githubRepo:
        "dafarouk/CV-Maker",

      publicRepoUrl:
        "https://github.com/dafarouk/CV-Maker",

      description: {
        fr:
          "Application desktop conçue pour créer des CV professionnels, structurés et compatibles avec les bonnes pratiques ATS, sans nécessiter de connaissances techniques.",

        en:
          "Desktop application designed to create professional, structured CVs following ATS-friendly practices without requiring technical knowledge.",
      },
    },

    {
      id:
        "jam",

      title:
        "JAM — Job Application Manager",

      version:
        "v1.0.0",

      platform:
        "Windows 10/11 x64",

      sourceUrl:
        "https://github.com/dafarouk/JAM-Source-Code",

      downloadUrl:
        "https://github.com/dafarouk/JAM/releases/download/v1.0.0/JAM-v1.0.0-Windows-x64.zip",

      githubRepo:
        "dafarouk/JAM",

      publicRepoUrl:
        "https://github.com/dafarouk/JAM",

      description: {
        fr:
          "Application desktop locale dédiée au suivi complet de la recherche d'emploi : candidatures, pipeline, Capture Mode, analyse CV/offre, historique, exports Excel/PDF, sauvegardes et projets portables .jam.",

        en:
          "Local-first desktop application for managing the complete job-search workflow: applications, pipeline, Capture Mode, CV/job analysis, history, Excel/PDF exports, backups and portable .jam projects.",
      },
    },
  ];