export type Language = "fr" | "en";

export type TimelineItem = {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  type:
    | "intro"
    | "education"
    | "experience"
    | "transition"
    | "future";
};

const timelineFr: TimelineItem[] = [
  {
    id: "intro",
    period: "Qui suis-je ?",
    title: "Ahmed-Farouk DAMERGI",
    subtitle: "Data & Business Analyst",
    description:
      "Bonjour, moi c'est Ahmed-Farouk DAMERGI, mais vous pouvez m'appeler Farouk. Mon parcours s'est construit progressivement entre informatique, performance opérationnelle, Business Intelligence, analyse de données et automatisation.",
    type: "intro",
  },

  {
    id: "licence",
    period: "2018 - 2021",
    title: "Les premières fondations",
    subtitle:
      "Licence en Informatique Appliquée à la Gestion",
    description:
      "En 2018, je commence ma licence à Tunis. Une formation qui me permet dès le départ de travailler à la croisée de deux univers : l'informatique et la gestion.",
    type: "education",
  },

  {
    id: "biat-db",
    period: "Septembre 2020",
    title: "Première immersion professionnelle",
    subtitle:
      "Stagiaire Bases de Données · BIAT",
    description:
      "Pendant ma licence, je découvre pour la première fois un environnement professionnel centré sur les données, les bases relationnelles, l'extraction et la préparation de données.",
    type: "experience",
  },

  {
    id: "biat-dev",
    period: "Février - Avril 2021",
    title: "Retour à la BIAT pour mon PFE",
    subtitle:
      "Stagiaire Développement Logiciel",
    description:
      "Pour mon projet de fin d'études, je retourne à la BIAT. J'y développe un système interne et travaille sur la structuration de données avec Oracle APEX, SQL et PL/SQL.",
    type: "experience",
  },

  {
    id: "freelance",
    period: "2021 - Juin 2022",
    title: "Premiers projets en autonomie",
    subtitle: "Freelance",
    description:
      "Après l'obtention de ma licence, je poursuis mon parcours à travers différents projets en freelance avant de rejoindre une grande structure opérationnelle.",
    type: "experience",
  },

  {
    id: "teleperformance",
    period: "Juin 2022 - Novembre 2023",
    title: "Du terrain vers l'analyse",
    subtitle:
      "Teleperformance · Agent puis Analyste Assurance Qualité",
    description:
      "Je rejoins d'abord les opérations avant d'évoluer vers l'assurance qualité. Je commence alors à travailler davantage avec les KPI, la productivité, les anomalies, le reporting et l'analyse de performance.",
    type: "experience",
  },

  {
    id: "concentrix",
    period: "Mars - Juillet 2024",
    title: "La performance devient centrale",
    subtitle:
      "Analyste Qualité & Performance Opérationnelle · Concentrix",
    description:
      "Chez Concentrix, je consolide cette orientation avec le suivi quotidien des indicateurs, les audits qualité, l'analyse d'anomalies et les reportings destinés au pilotage opérationnel.",
    type: "experience",
  },

  {
    id: "transition-data",
    period: "2024",
    title: "Je décide d'aller plus loin",
    subtitle: "Business Analytics",
    description:
      "Après plusieurs années autour de la qualité et de la performance, je décide de renforcer sérieusement la dimension technique et analytique de mon profil.",
    type: "transition",
  },

  {
    id: "esb",
    period: "2024 - 2026",
    title: "Master Business Analytics",
    subtitle:
      "Esprit School of Business · Tunis",
    description:
      "Business Intelligence, Big Data, bases de données, Business Process Management et stratégie viennent compléter mon expérience opérationnelle.",
    type: "education",
  },

  {
    id: "aycode",
    period: "Juin - Juillet 2025",
    title: "Immersion dans le métier de Data Analyst",
    subtitle:
      "Stagiaire Data Analyst · AYcode",
    description:
      "Je travaille directement avec SQL, Python, Talend, dbt, Power BI, Excel, VBA et Power Automate sur des sujets de nettoyage, qualité, reporting, ETL et automatisation.",
    type: "experience",
  },

  {
    id: "cytech",
    period: "2025 - 2026",
    title: "Le double diplôme",
    subtitle:
      "Master 2 · CY Tech · Cergy",
    description:
      "Je poursuis mon Master 2 en France dans le cadre du double diplôme, avec une spécialisation davantage orientée architecture des données, data engineering, BI et analyse avancée.",
    type: "education",
  },

  {
    id: "airfrance",
    period: "Juillet 2026 - Janvier 2027",
    title: "Air France",
    subtitle:
      "Stagiaire Data & Performance Analyst · Roissy-CDG",
    description:
      "Pour mon stage de fin d'études, je travaille sur l'analyse et la fiabilisation de données opérationnelles, la Business Intelligence, les KPI, le reporting et l'automatisation de traitements et d'outils.",
    type: "experience",
  },

  {
    id: "next",
    period: "Février 2027",
    title: "Le prochain chapitre",
    subtitle:
      "CDI · Data & Business Analytics",
    description:
      "À partir de février 2027, je souhaite poursuivre cette trajectoire en CDI, principalement en Île-de-France, tout en restant ouvert à une opportunité suffisamment forte pour me faire bouger.",
    type: "future",
  },
];

const timelineEn: TimelineItem[] = [
  {
    id: "intro",
    period: "Who am I?",
    title: "Ahmed-Farouk DAMERGI",
    subtitle: "Data & Business Analyst",
    description:
      "Hi, my name is Ahmed-Farouk DAMERGI, but you can call me Farouk. My journey has gradually developed across technology, operational performance, Business Intelligence, data analysis and automation.",
    type: "intro",
  },

  {
    id: "licence",
    period: "2018 - 2021",
    title: "Building the foundations",
    subtitle:
      "Bachelor's Degree in Applied Computer Science for Management",
    description:
      "My journey began in Tunis in 2018 with a degree combining two areas that would continue to shape my career: technology and business.",
    type: "education",
  },

  {
    id: "biat-db",
    period: "September 2020",
    title: "My first professional experience",
    subtitle:
      "Database Intern · BIAT",
    description:
      "During my bachelor's degree, I had my first professional exposure to data, relational databases, data extraction and preparation within a major banking environment.",
    type: "experience",
  },

  {
    id: "biat-dev",
    period: "February - April 2021",
    title: "Back to BIAT for my final project",
    subtitle:
      "Software Development Intern",
    description:
      "For my graduation project, I returned to BIAT, where I developed an internal system and worked with relational data using Oracle APEX, SQL and PL/SQL.",
    type: "experience",
  },

  {
    id: "freelance",
    period: "2021 - June 2022",
    title: "Working independently",
    subtitle: "Freelance",
    description:
      "After graduating, I continued developing my skills through freelance projects before moving into a larger operational environment.",
    type: "experience",
  },

  {
    id: "teleperformance",
    period: "June 2022 - November 2023",
    title: "From operations to analytics",
    subtitle:
      "Teleperformance · Agent to Quality Assurance Analyst",
    description:
      "I initially joined operations before progressing into Quality Assurance, where my work increasingly focused on KPIs, productivity, anomalies, reporting and performance analysis.",
    type: "experience",
  },

  {
    id: "concentrix",
    period: "March - July 2024",
    title: "Performance becomes central",
    subtitle:
      "Quality & Operational Performance Analyst · Concentrix",
    description:
      "At Concentrix, I strengthened this direction through daily KPI monitoring, quality audits, anomaly analysis and reporting used to support operational performance.",
    type: "experience",
  },

  {
    id: "transition-data",
    period: "2024",
    title: "I decided to go further",
    subtitle: "Business Analytics",
    description:
      "After several years working around quality and operational performance, I decided to significantly strengthen the technical and analytical side of my profile.",
    type: "transition",
  },

  {
    id: "esb",
    period: "2024 - 2026",
    title: "Master's in Business Analytics",
    subtitle:
      "Esprit School of Business · Tunis",
    description:
      "Business Intelligence, Big Data, databases, Business Process Management and strategy helped connect my operational background with deeper analytical skills.",
    type: "education",
  },

  {
    id: "aycode",
    period: "June - July 2025",
    title: "A direct introduction to Data Analytics",
    subtitle:
      "Data Analyst Intern · AYcode",
    description:
      "I worked directly with SQL, Python, Talend, dbt, Power BI, Excel, VBA and Power Automate across data cleaning, data quality, reporting, ETL and automation.",
    type: "experience",
  },

  {
    id: "cytech",
    period: "2025 - 2026",
    title: "The double-degree program",
    subtitle:
      "Master 2 · CY Tech · Cergy",
    description:
      "I continued my second year of master's studies in France through a double-degree program focused on data architecture, data engineering, Business Intelligence and advanced analytics.",
    type: "education",
  },

  {
    id: "airfrance",
    period: "July 2026 - January 2027",
    title: "Air France",
    subtitle:
      "Data & Performance Analyst Intern · Paris-CDG",
    description:
      "For my final internship, I work on operational data analysis and reliability, Business Intelligence, KPI reporting and the automation of processes and analytical tools.",
    type: "experience",
  },

  {
    id: "next",
    period: "February 2027",
    title: "The next chapter",
    subtitle:
      "Permanent role · Data & Business Analytics",
    description:
      "From February 2027, I am looking to continue this journey in a permanent role, primarily in the Paris and Île-de-France region while remaining open to a strong opportunity elsewhere.",
    type: "future",
  },
];

export const timelineByLanguage: Record<
  Language,
  TimelineItem[]
> = {
  fr: timelineFr,
  en: timelineEn,
};