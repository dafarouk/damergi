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
        "CV Maker",

      version:
        "v1.0.1",

      platform:
        "Windows x64",

      sourceUrl:
        "https://github.com/dafarouk/CV-Maker-Source-Code",

      downloadUrl:
        "https://github.com/dafarouk/CV-Maker/releases/download/v1.0.1/CV-Maker-v1.0.1-Windows-x64.zip",

      description: {
        fr:
          "Application desktop conçue pour créer des CV professionnels, structurés et compatibles avec les bonnes pratiques ATS, sans nécessiter de connaissances techniques.",

        en:
          "Desktop application designed to create professional, structured CVs following ATS-friendly practices without requiring technical knowledge.",
      },
    },
  ];