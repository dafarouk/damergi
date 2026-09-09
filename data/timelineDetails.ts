import type {
  Language,
} from "@/data/timeline";

export type DetailSection = {
  title: string;
  text?: string;
  bullets?: string[];
};

export type LocalizedTimelineDetail = {
  eyebrow: string;
  intro: string;
  sections: DetailSection[];
  metrics?: string[];
  tools?: string[];
  imageCaption?: string;
};

export type ToolLogo = {
  name: string;
  path: string;
};

export type TimelineDetail = {
  visualMode?:
    | "image"
    | "logo"
    | "tools";

  imagePath?: string;
  logoPath?: string;
  toolLogos?: ToolLogo[];

  fr: LocalizedTimelineDetail;
  en: LocalizedTimelineDetail;
};

export const timelineDetails: Record<
  string,
  TimelineDetail
> = {
  licence: {
    visualMode:
      "image",

    imagePath:
      "/images/timeline/ihe-campus.jpg",

    logoPath:
      "/images/timeline/logos/ihe.png",

    fr: {
      eyebrow:
        "2018 - 2021 · Formation",

      intro:
        "Ma licence en Informatique Appliquée à la Gestion a posé les premières bases de mon profil hybride. Pendant trois ans, j'ai évolué entre programmation, informatique, mathématiques et matières orientées gestion.",

      sections: [
        {
          title:
            "Première année · Les bases techniques",

          text:
            "La première année était particulièrement dense et m'a permis de découvrir plusieurs domaines fondamentaux de l'informatique.",

          bullets: [
            "Algorithmique et logique informatique",
            "Java",
            "C et C#",
            "Développement web avec HTML et CSS",
            "Systèmes et logique",
            "Algèbre 1 et 2",
            "Design",
            "Français et anglais",
            "Droit et droits de l'Homme",
          ],
        },

        {
          title:
            "Deuxième année · L'ouverture vers la gestion",

          text:
            "À partir de la deuxième année, le parcours est devenu davantage orienté vers la gestion. C'est là que j'ai commencé à comprendre comment connecter les outils informatiques aux problématiques de l'entreprise.",

          bullets: [
            "Principes de gestion",
            "Comptabilité",
            "Entrepreneuriat",
            "Matières informatiques et techniques",
            "Approche progressivement plus orientée business",
          ],
        },

        {
          title:
            "Troisième année · Consolidation et projet de fin d'études",

          text:
            "La troisième année a permis de consolider les acquis techniques avec notamment des sujets comme les réseaux. Le deuxième semestre était consacré au projet de fin d'études réalisé à la BIAT.",
        },
      ],

      metrics: [
        "3 années d'études",
        "Licence obtenue en 2021",
        "Parcours informatique + gestion",
      ],

      tools: [
        "Algorithmique",
        "Java",
        "C",
        "C#",
        "HTML",
        "CSS",
        "Réseaux",
        "Algèbre",
        "Gestion",
        "Comptabilité",
      ],

      imageCaption:
        "Institut des Hautes Études · Tunis",
    },

    en: {
      eyebrow:
        "2018 - 2021 · Education",

      intro:
        "My Bachelor's degree in Applied Computer Science for Management laid the foundations of my hybrid profile. Over three years, I studied programming, information technology, mathematics and business-oriented subjects.",

      sections: [
        {
          title:
            "First year · Technical foundations",

          text:
            "The first year was particularly intensive and introduced me to several fundamental areas of computer science.",

          bullets: [
            "Algorithms and computational logic",
            "Java",
            "C and C#",
            "Web development with HTML and CSS",
            "Systems and logic",
            "Algebra 1 and 2",
            "Design",
            "French and English",
            "Law and human rights",
          ],
        },

        {
          title:
            "Second year · Moving toward management",

          text:
            "During the second year, the curriculum became more management-oriented. This is where I began understanding how technology could support real business needs.",

          bullets: [
            "Management principles",
            "Accounting",
            "Entrepreneurship",
            "Technical and computing subjects",
            "A progressively stronger business perspective",
          ],
        },

        {
          title:
            "Third year · Consolidation and final project",

          text:
            "The third year consolidated my technical knowledge with subjects including networking. The second semester was dedicated to my final internship project at BIAT.",
        },
      ],

      metrics: [
        "3 years of study",
        "Bachelor's degree obtained in 2021",
        "Technology + management curriculum",
      ],

      tools: [
        "Algorithms",
        "Java",
        "C",
        "C#",
        "HTML",
        "CSS",
        "Networking",
        "Algebra",
        "Management",
        "Accounting",
      ],

      imageCaption:
        "Institut des Hautes Études · Tunis",
    },
  },

  "biat-db": {
    visualMode:
      "image",

    imagePath:
      "/images/timeline/biat.jpg",

    logoPath:
      "/images/timeline/logos/biat.png",

    fr: {
      eyebrow:
        "Septembre 2020 · Première expérience",

      intro:
        "Entre ma deuxième et ma troisième année de licence, j'ai réalisé mon tout premier stage professionnel à la Banque Internationale Arabe de Tunisie. Ce stage d'un mois constituait surtout une première immersion dans un environnement professionnel autour des données et des bases de données.",

      sections: [
        {
          title:
            "Une première immersion dans la donnée",

          text:
            "J'ai découvert comment les données sont organisées, préparées et utilisées dans un environnement bancaire structuré.",

          bullets: [
            "Extraction de données",
            "Organisation et préparation de données",
            "Support aux traitements internes",
            "Préparation de données pour le reporting",
          ],
        },

        {
          title:
            "Ce que cette expérience m'a apporté",

          text:
            "Ce stage m'a permis de passer pour la première fois de concepts étudiés en cours à leur utilisation dans un environnement professionnel réel.",
        },
      ],

      metrics: [
        "1 mois",
        "Premier stage professionnel",
        "Environnement bancaire",
      ],

      tools: [
        "Oracle SQL",
        "SQL",
        "MS Access",
        "Excel",
        "VBA",
      ],

      imageCaption:
        "Banque Internationale Arabe de Tunisie · BIAT",
    },

    en: {
      eyebrow:
        "September 2020 · First experience",

      intro:
        "Between the second and third years of my Bachelor's degree, I completed my first professional internship at Banque Internationale Arabe de Tunisie. This one-month internship was primarily an introduction to professional data and database environments.",

      sections: [
        {
          title:
            "My first exposure to data",

          text:
            "I discovered how data is organized, prepared and used inside a structured banking environment.",

          bullets: [
            "Data extraction",
            "Data organization and preparation",
            "Support for internal data processing",
            "Preparation of information for reporting",
          ],
        },

        {
          title:
            "What I learned",

          text:
            "This internship allowed me to move for the first time from academic concepts to their practical use inside a real organization.",
        },
      ],

      metrics: [
        "1 month",
        "First professional internship",
        "Banking environment",
      ],

      tools: [
        "Oracle SQL",
        "SQL",
        "MS Access",
        "Excel",
        "VBA",
      ],

      imageCaption:
        "Banque Internationale Arabe de Tunisie · BIAT",
    },
  },

  "biat-dev": {
    visualMode:
      "image",

    imagePath:
      "/images/timeline/biat-pfe.jpg",

    logoPath:
      "/images/timeline/logos/biat.png",

    fr: {
      eyebrow:
        "Février - Avril 2021 · Projet de fin d'études",

      intro:
        "Pour terminer ma licence, je suis retourné à la BIAT pour un stage de trois mois. Cette fois, je ne travaillais plus seulement avec les données : j'avais un véritable projet applicatif à concevoir et développer.",

      sections: [
        {
          title:
            "Le projet",

          text:
            "J'ai développé un système interne lié à la gestion et à l'échange de documents, avec des besoins de confidentialité et de communication interne.",

          bullets: [
            "Analyse du besoin interne",
            "Conception de l'application",
            "Structuration des données relationnelles",
            "Gestion et manipulation des données",
            "Développement de l'interface web",
          ],
        },

        {
          title:
            "Architecture et développement",

          text:
            "Le projet m'a donné l'occasion de travailler à la fois sur la base de données, la logique applicative et l'interface utilisateur.",

          bullets: [
            "Oracle APEX pour l'application",
            "SQL et PL/SQL pour les données",
            "HTML et CSS pour l'interface",
            "JavaScript pour les interactions",
          ],
        },
      ],

      metrics: [
        "≈ 3 mois",
        "Projet de fin d'études",
        "Application interne",
      ],

      tools: [
        "Oracle APEX",
        "SQL",
        "PL/SQL",
        "HTML",
        "CSS",
        "JavaScript",
      ],

      imageCaption:
        "Projet de fin d'études · BIAT",
    },

    en: {
      eyebrow:
        "February - April 2021 · Final-year project",

      intro:
        "To complete my Bachelor's degree, I returned to BIAT for a three-month internship. This time, I was responsible for developing an actual internal application rather than simply working with data.",

      sections: [
        {
          title:
            "The project",

          text:
            "I developed an internal system related to document management and exchange, with requirements around confidentiality and internal communication.",

          bullets: [
            "Understanding internal business requirements",
            "Application design",
            "Relational database structuring",
            "Data management",
            "Web interface development",
          ],
        },

        {
          title:
            "Architecture and development",

          text:
            "The project allowed me to work across the database, application logic and user interface.",

          bullets: [
            "Oracle APEX for the application",
            "SQL and PL/SQL for data",
            "HTML and CSS for the interface",
            "JavaScript for interactions",
          ],
        },
      ],

      metrics: [
        "≈ 3 months",
        "Final-year project",
        "Internal application",
      ],

      tools: [
        "Oracle APEX",
        "SQL",
        "PL/SQL",
        "HTML",
        "CSS",
        "JavaScript",
      ],

      imageCaption:
        "Final-year project · BIAT",
    },
  },

  freelance: {
    visualMode:
      "tools",

    toolLogos: [
      {
        name:
          "Blender",
        path:
          "/images/timeline/tools/blender.png",
      },
      {
        name:
          "Adobe Photoshop",
        path:
          "/images/timeline/tools/photoshop.png",
      },
      {
        name:
          "Adobe Premiere Pro",
        path:
          "/images/timeline/tools/premiere-pro.png",
      },
      {
        name:
          "Adobe After Effects",
        path:
          "/images/timeline/tools/after-effects.png",
      },
      {
        name:
          "Adobe XD",
        path:
          "/images/timeline/tools/adobe-xd.png",
      },
      {
        name:
          "Adobe Dreamweaver",
        path:
          "/images/timeline/tools/dreamweaver.png",
      },
      {
        name:
          "WordPress",
        path:
          "/images/timeline/tools/wordpress.png",
      },
      {
        name:
          "HTML5",
        path:
          "/images/timeline/tools/html5.png",
      },
      {
        name:
          "CSS3",
        path:
          "/images/timeline/tools/css3.png",
      },
    ],

    fr: {
      eyebrow:
        "2021 - Juin 2022 · Travail indépendant",

      intro:
        "Après ma licence, j'ai travaillé en indépendant pendant près d'un an. J'ai réalisé des projets via Upwork et Fiverr ainsi que pour de petites entreprises en Tunisie, principalement autour du montage vidéo, de la modélisation 3D et du web design.",

      sections: [
        {
          title:
            "Montage vidéo & création visuelle",

          text:
            "Une partie importante de mes missions freelance concernait la création et le montage de contenus visuels.",

          bullets: [
            "Montage vidéo",
            "Post-production",
            "Motion design et effets visuels",
            "Création et retouche graphique",
          ],
        },

        {
          title:
            "3D",

          text:
            "J'ai également réalisé des travaux de modélisation 3D, principalement avec Blender.",
        },

        {
          title:
            "Web design",

          text:
            "Je réalisais aussi des travaux de conception web et d'intégration pour certains clients et petites entreprises.",

          bullets: [
            "Conception d'interfaces",
            "Prototypage",
            "Sites WordPress",
            "HTML et CSS",
            "Création et adaptation de pages web",
          ],
        },

        {
          title:
            "Travailler en autonomie",

          text:
            "Cette période m'a appris à comprendre une demande client, organiser mon travail, gérer les retours, respecter les délais et livrer un projet de façon autonome.",
        },
      ],

      metrics: [
        "≈ 1 an",
        "Upwork & Fiverr",
        "Clients locaux en Tunisie",
        "Projets créatifs et web",
      ],

      tools: [
        "Blender",
        "Adobe Photoshop",
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "Adobe XD",
        "Adobe Dreamweaver",
        "WordPress",
        "HTML",
        "CSS",
      ],

      imageCaption:
        "Outils utilisés pendant ma période freelance",
    },

    en: {
      eyebrow:
        "2021 - June 2022 · Independent work",

      intro:
        "After completing my Bachelor's degree, I worked independently for almost a year. I completed projects through Upwork and Fiverr as well as for small businesses in Tunisia, mainly around video editing, 3D modelling and web design.",

      sections: [
        {
          title:
            "Video editing & visual creation",

          text:
            "A significant part of my freelance work focused on creating and editing visual content.",

          bullets: [
            "Video editing",
            "Post-production",
            "Motion design and visual effects",
            "Graphic creation and retouching",
          ],
        },

        {
          title:
            "3D",

          text:
            "I also completed 3D modelling work, mainly using Blender.",
        },

        {
          title:
            "Web design",

          text:
            "I also worked on web design and web integration projects for clients and small businesses.",

          bullets: [
            "Interface design",
            "Prototyping",
            "WordPress websites",
            "HTML and CSS",
            "Web page creation and adaptation",
          ],
        },

        {
          title:
            "Working independently",

          text:
            "This period taught me how to understand client requirements, organize my own work, handle feedback, respect deadlines and deliver projects independently.",
        },
      ],

      metrics: [
        "≈ 1 year",
        "Upwork & Fiverr",
        "Local Tunisian clients",
        "Creative and web projects",
      ],

      tools: [
        "Blender",
        "Adobe Photoshop",
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "Adobe XD",
        "Adobe Dreamweaver",
        "WordPress",
        "HTML",
        "CSS",
      ],

      imageCaption:
        "Tools used during my freelance period",
    },
  },

  teleperformance: {
    visualMode:
      "image",

    imagePath:
      "/images/timeline/teleperformance.jpg",

    logoPath:
      "/images/timeline/logos/teleperformance.png",

    fr: {
      eyebrow:
        "Juin 2022 - Novembre 2023 · Qualité & Performance",

      intro:
        "J'ai rejoint Teleperformance à l'origine sur un poste opérationnel. J'ai ensuite évolué vers le rôle d'Analyste Assurance Qualité, ce qui a marqué mon passage du terrain vers l'analyse de performance.",

      sections: [
        {
          title:
            "Suivi qualité",

          bullets: [
            "Suivi d'environ 6 à 7 agents par semaine",
            "15 à 20 audits qualité par semaine",
            "Identification de 5 à 10 anomalies ou erreurs qualité par semaine",
            "Feedback direct et coaching individuel",
          ],
        },

        {
          title:
            "Analyse de performance",

          bullets: [
            "Suivi de la productivité",
            "Analyse de l'AHT",
            "Analyse du flux d'activité",
            "Suivi des objectifs individuels",
            "Analyse des tendances de performance",
          ],
        },

        {
          title:
            "Reporting et pilotage",

          text:
            "Je préparais des reportings hebdomadaires pour les responsables ainsi que des dashboards mensuels et YTD afin de donner une vision claire de la performance opérationnelle et qualité.",
        },
      ],

      metrics: [
        "6 à 7 agents suivis / semaine",
        "15 à 20 audits / semaine",
        "5 à 10 anomalies / semaine",
      ],

      tools: [
        "Excel",
        "Power BI",
        "Reporting",
        "Outils internes",
      ],

      imageCaption:
        "Teleperformance · Tunis",
    },

    en: {
      eyebrow:
        "June 2022 - November 2023 · Quality & Performance",

      intro:
        "I initially joined Teleperformance in an operational role before progressing into Quality Assurance. This was an important transition from frontline operations toward performance analysis.",

      sections: [
        {
          title:
            "Quality monitoring",

          bullets: [
            "Monitoring approximately 6 to 7 agents per week",
            "15 to 20 quality audits per week",
            "Identifying approximately 5 to 10 quality issues per week",
            "Direct feedback and individual coaching",
          ],
        },

        {
          title:
            "Performance analysis",

          bullets: [
            "Productivity monitoring",
            "AHT analysis",
            "Operational flow analysis",
            "Individual objective tracking",
            "Performance trend analysis",
          ],
        },

        {
          title:
            "Reporting",

          text:
            "I prepared weekly reports for management as well as monthly and YTD dashboards to provide visibility into operational and quality performance.",
        },
      ],

      metrics: [
        "6-7 agents / week",
        "15-20 audits / week",
        "5-10 issues / week",
      ],

      tools: [
        "Excel",
        "Power BI",
        "Reporting",
        "Internal tools",
      ],

      imageCaption:
        "Teleperformance · Tunis",
    },
  },

  concentrix: {
    visualMode:
      "image",

    imagePath:
      "/images/timeline/concentrix.jpg",

    logoPath:
      "/images/timeline/logos/concentrix.png",

    fr: {
      eyebrow:
        "Mars - Juillet 2024 · Performance Opérationnelle",

      intro:
        "Chez Concentrix, j'ai poursuivi cette évolution avec un rôle davantage structuré autour de la qualité, des KPI et du pilotage de la performance opérationnelle.",

      sections: [
        {
          title:
            "Suivi quotidien",

          bullets: [
            "Suivi personnel d'environ 7 à 8 agents",
            "Sélection et analyse d'interactions",
            "Évaluation à partir d'une grille de qualité",
            "Scoring et documentation du feedback",
            "Coaching individuel lorsque nécessaire",
          ],
        },

        {
          title:
            "Les 4 KPI principaux",

          bullets: [
            "Satisfaction client",
            "Nombre d'appels",
            "Nombre d'emails",
            "AHT · Average Handling Time",
          ],
        },

        {
          title:
            "Un reporting à plusieurs niveaux",

          bullets: [
            "Suivi régulier avec les agents",
            "Reporting hebdomadaire aux managers",
            "Reporting mensuel avec la direction des opérations",
            "Reporting trimestriel au client",
          ],
        },
      ],

      metrics: [
        "7 à 8 agents suivis",
        "15+ audits / semaine",
        "15+ anomalies / semaine",
        "4 KPI principaux",
      ],

      tools: [
        "Excel",
        "VBA",
        "Power BI",
        "Salesforce",
        "Jira",
        "Outils internes",
      ],

      imageCaption:
        "Concentrix · Tunis",
    },

    en: {
      eyebrow:
        "March - July 2024 · Operational Performance",

      intro:
        "At Concentrix, I continued this progression in a role more directly structured around quality, KPIs and operational performance management.",

      sections: [
        {
          title:
            "Daily monitoring",

          bullets: [
            "Personally monitoring approximately 7 to 8 agents",
            "Selecting and reviewing interactions",
            "Evaluation using a quality scoring grid",
            "Scoring and documenting feedback",
            "Individual coaching when required",
          ],
        },

        {
          title:
            "Four key KPIs",

          bullets: [
            "Customer satisfaction",
            "Number of calls",
            "Number of emails",
            "AHT · Average Handling Time",
          ],
        },

        {
          title:
            "Multi-level reporting",

          bullets: [
            "Regular agent follow-up",
            "Weekly manager reporting",
            "Monthly operations management reporting",
            "Quarterly client reporting",
          ],
        },
      ],

      metrics: [
        "7-8 agents monitored",
        "15+ audits / week",
        "15+ issues / week",
        "4 main KPIs",
      ],

      tools: [
        "Excel",
        "VBA",
        "Power BI",
        "Salesforce",
        "Jira",
        "Internal tools",
      ],

      imageCaption:
        "Concentrix · Tunis",
    },
  },

  esb: {
    visualMode:
      "image",

    imagePath:
      "/images/timeline/esprit.jpg",

    logoPath:
      "/images/timeline/logos/esprit.png",

    fr: {
      eyebrow:
        "2024 - 2026 · Business Analytics",

      intro:
        "Après plusieurs années autour de la qualité et de la performance opérationnelle, j'ai voulu approfondir la dimension analytique de mon profil. J'ai donc rejoint Esprit School of Business en Business Analytics.",

      sections: [
        {
          title:
            "Renforcer le côté business",

          text:
            "Cette formation a renforcé le lien entre mon background informatique et les enjeux de management et de décision en entreprise.",

          bullets: [
            "Business Process Management",
            "E-business",
            "Strategic Management",
            "Innovation Management",
            "Design Thinking",
            "Séminaires professionnels et business",
          ],
        },

        {
          title:
            "Approfondir l'Analytics",

          bullets: [
            "Business Intelligence",
            "Big Data",
            "Bases de données",
            "Python",
            "R",
            "Analyse de données",
          ],
        },

        {
          title:
            "Un profil de plus en plus hybride",

          text:
            "Cette étape m'a permis de mieux connecter technologie, données, performance et compréhension du business. Elle a également ouvert la voie vers mon double diplôme avec CY Tech.",
        },
      ],

      metrics: [
        "Business + Data",
        "Parcours double diplôme",
        "Approche décisionnelle",
      ],

      tools: [
        "Business Intelligence",
        "Big Data",
        "Python",
        "R",
        "Databases",
        "BPM",
        "Strategic Management",
        "Design Thinking",
      ],

      imageCaption:
        "Esprit School of Business · Tunis",
    },

    en: {
      eyebrow:
        "2024 - 2026 · Business Analytics",

      intro:
        "After several years working around quality and operational performance, I wanted to deepen the analytical side of my profile. I therefore joined Esprit School of Business in Business Analytics.",

      sections: [
        {
          title:
            "Strengthening the business side",

          text:
            "The program strengthened the connection between my technical background and management and decision-making challenges.",

          bullets: [
            "Business Process Management",
            "E-business",
            "Strategic Management",
            "Innovation Management",
            "Design Thinking",
            "Professional and business seminars",
          ],
        },

        {
          title:
            "Going deeper into Analytics",

          bullets: [
            "Business Intelligence",
            "Big Data",
            "Databases",
            "Python",
            "R",
            "Data analysis",
          ],
        },

        {
          title:
            "An increasingly hybrid profile",

          text:
            "This stage helped me connect technology, data, performance and business understanding more closely. It also opened the path toward my double-degree program with CY Tech.",
        },
      ],

      metrics: [
        "Business + Data",
        "Double-degree pathway",
        "Decision-oriented approach",
      ],

      tools: [
        "Business Intelligence",
        "Big Data",
        "Python",
        "R",
        "Databases",
        "BPM",
        "Strategic Management",
        "Design Thinking",
      ],

      imageCaption:
        "Esprit School of Business · Tunis",
    },
  },

  aycode: {
    visualMode:
      "logo",

    logoPath:
      "/images/timeline/logos/aycode.png",

    fr: {
      eyebrow:
        "Juin - Juillet 2025 · Data Analyst",

      intro:
        "Avant de rejoindre CY Tech, j'ai réalisé un stage Data Analyst chez AYcode au sein d'une petite équipe multidisciplinaire, en appui direct à un Senior Data Analyst.",

      sections: [
        {
          title:
            "Travail quotidien avec la donnée",

          bullets: [
            "Collecte des données",
            "Nettoyage et transformation",
            "Manipulation de plusieurs jeux de données",
            "Contrôles de qualité",
            "Analyse d'anomalies",
            "Création et maintenance de reportings",
          ],
        },

        {
          title:
            "ETL et automatisation",

          bullets: [
            "Travail sur des workflows ETL",
            "Automatisation de fichiers Excel et VBA",
            "Utilisation de Power Automate",
            "Intégration d'informations reçues dans les fichiers de reporting",
            "Réduction des opérations manuelles de copier-coller",
          ],
        },
      ],

      metrics: [
        "15+ dashboards, reportings et fichiers",
        "10+ jeux de données / semaine",
        "3 à 4 anomalies analysées / semaine",
        "≈ 2 mois",
      ],

      tools: [
        "SQL",
        "MySQL",
        "Talend",
        "Python",
        "dbt",
        "Excel",
        "VBA",
        "Power BI",
        "Power Automate",
      ],

      imageCaption:
        "AYcode · Tunis",
    },

    en: {
      eyebrow:
        "June - July 2025 · Data Analyst",

      intro:
        "Before joining CY Tech, I completed a Data Analyst internship at AYcode within a small multidisciplinary team, working directly alongside a Senior Data Analyst.",

      sections: [
        {
          title:
            "Daily data work",

          bullets: [
            "Data collection",
            "Cleaning and transformation",
            "Handling multiple datasets",
            "Data quality controls",
            "Anomaly analysis",
            "Creating and maintaining reporting files",
          ],
        },

        {
          title:
            "ETL and automation",

          bullets: [
            "Working with ETL workflows",
            "Excel and VBA automation",
            "Power Automate workflows",
            "Integrating incoming information into reporting files",
            "Reducing manual copy-and-paste operations",
          ],
        },
      ],

      metrics: [
        "15+ dashboards, reports and files",
        "10+ datasets / week",
        "3-4 anomalies analysed / week",
        "≈ 2 months",
      ],

      tools: [
        "SQL",
        "MySQL",
        "Talend",
        "Python",
        "dbt",
        "Excel",
        "VBA",
        "Power BI",
        "Power Automate",
      ],

      imageCaption:
        "AYcode · Tunis",
    },
  },

  cytech: {
    visualMode:
      "image",

    imagePath:
      "/images/timeline/cytech.jpg",

    logoPath:
      "/images/timeline/logos/cytech.png",

    fr: {
      eyebrow:
        "2025 - 2026 · Double diplôme",

      intro:
        "Grâce au parcours de double diplôme, j'ai candidaté pour poursuivre mon Master 2 en France à CY Tech. Après le processus de sélection et l'entretien, j'ai été accepté et j'ai poursuivi ma spécialisation dans un environnement d'école d'ingénieurs.",

      sections: [
        {
          title:
            "Architecture des Données et Exploration Optimisée",

          text:
            "Le Master 2 m'a permis d'approfondir les sujets techniques liés aux données et de faire évoluer mon profil vers une orientation Data / BI plus avancée.",

          bullets: [
            "Architecture des données",
            "Data engineering",
            "Business Intelligence",
            "Analyse avancée",
            "Machine Learning dans le cadre académique",
          ],
        },

        {
          title:
            "La continuité de mon parcours",

          text:
            "Cette formation représente la continuité logique de mon parcours : informatique, gestion, performance, Business Analytics puis spécialisation Data.",
        },
      ],

      metrics: [
        "Master 2",
        "Double diplôme",
        "École d'ingénieurs",
        "France",
      ],

      tools: [
        "Data Engineering",
        "Business Intelligence",
        "Data Architecture",
        "Advanced Analytics",
        "Machine Learning",
      ],

      imageCaption:
        "CY Tech · Cergy, France",
    },

    en: {
      eyebrow:
        "2025 - 2026 · Double degree",

      intro:
        "Through the double-degree pathway, I applied to continue my second Master's year in France at CY Tech. After the selection process and interview, I was accepted and continued my specialization within an engineering-school environment.",

      sections: [
        {
          title:
            "Data Architecture and Advanced Analytics",

          text:
            "The second Master's year allowed me to deepen the technical side of data and move toward a more advanced Data / BI profile.",

          bullets: [
            "Data architecture",
            "Data engineering",
            "Business Intelligence",
            "Advanced analytics",
            "Machine Learning in an academic context",
          ],
        },

        {
          title:
            "Continuing the journey",

          text:
            "The program represents a logical continuation of my path: computer science, management, performance, Business Analytics and finally deeper specialization in Data.",
        },
      ],

      metrics: [
        "Master 2",
        "Double degree",
        "Engineering school",
        "France",
      ],

      tools: [
        "Data Engineering",
        "Business Intelligence",
        "Data Architecture",
        "Advanced Analytics",
        "Machine Learning",
      ],

      imageCaption:
        "CY Tech · Cergy, France",
    },
  },

  airfrance: {
    visualMode:
      "image",

    imagePath:
      "/images/timeline/airfrance.jpg",

    logoPath:
      "/images/timeline/logos/airfrance.png",

    fr: {
      eyebrow:
        "Juillet 2026 - Janvier 2027 · Stage de fin d'études",

      intro:
        "Pour terminer mon parcours académique, j'ai rejoint Air France à Roissy-CDG comme Stagiaire Data & Performance Analyst au sein de la Logistique Opérationnelle PN. Mon travail se situe directement entre données, performance opérationnelle, reporting et automatisation.",

      sections: [
        {
          title:
            "Analyse et pilotage opérationnel",

          bullets: [
            "Analyse et fiabilisation de données opérationnelles",
            "Prévisions d'activité et dimensionnement",
            "Suivi des KPI",
            "Analyse de tendances et variations",
            "Reporting récurrent pour les équipes opérationnelles",
          ],
        },

        {
          title:
            "Business Intelligence",

          bullets: [
            "Création et amélioration de dashboards Power BI",
            "Préparation et transformation des données",
            "Définition et présentation de KPI",
            "Amélioration de la lisibilité des reportings",
            "Support à la prise de décision opérationnelle",
          ],
        },

        {
          title:
            "Automatisation",

          bullets: [
            "Automatisation de processus Excel",
            "Développement VBA",
            "Création de petits outils internes",
            "Amélioration de processus de reporting existants",
            "Réduction de tâches manuelles répétitives",
          ],
        },
      ],

      metrics: [
        "20+ dashboards, pages ou visuels Power BI",
        "Jusqu'à 15+ parties prenantes",
        "10+ processus ou outils automatisés",
        "Un processus réduit d'environ 2 h à 30 min",
        "Jusqu'à 70% de travail manuel en moins sur certains processus",
      ],

      tools: [
        "Power BI",
        "Excel avancé",
        "VBA",
        "SAP BusinessObjects",
        "SharePoint",
        "Power Automate",
        "Python",
        "JavaScript",
        "HTML",
        "CSS",
      ],

      imageCaption:
        "Air France · Roissy-CDG",
    },

    en: {
      eyebrow:
        "July 2026 - January 2027 · Final internship",

      intro:
        "To complete my academic journey, I joined Air France at Paris-CDG as a Data & Performance Analyst Intern within Operational Crew Logistics. My work sits directly between data, operational performance, reporting and automation.",

      sections: [
        {
          title:
            "Operational analysis and performance",

          bullets: [
            "Operational data analysis and reliability",
            "Activity forecasting and resource dimensioning",
            "KPI monitoring",
            "Trend and variation analysis",
            "Recurring reporting for operational teams",
          ],
        },

        {
          title:
            "Business Intelligence",

          bullets: [
            "Creating and improving Power BI dashboards",
            "Data preparation and transformation",
            "KPI definition and presentation",
            "Improving reporting readability",
            "Supporting operational decision-making",
          ],
        },

        {
          title:
            "Automation",

          bullets: [
            "Automating Excel processes",
            "VBA development",
            "Creating small internal tools",
            "Improving existing reporting processes",
            "Reducing repetitive manual work",
          ],
        },
      ],

      metrics: [
        "20+ Power BI dashboards, pages or visuals",
        "Up to 15+ stakeholders",
        "10+ processes or tools automated",
        "One process reduced from approximately 2h to 30min",
        "Up to 70% less manual work for some recurring processes",
      ],

      tools: [
        "Power BI",
        "Advanced Excel",
        "VBA",
        "SAP BusinessObjects",
        "SharePoint",
        "Power Automate",
        "Python",
        "JavaScript",
        "HTML",
        "CSS",
      ],

      imageCaption:
        "Air France · Paris-CDG",
    },
  },
};

export function getTimelineDetail(
  id: string,
  language: Language
) {
  const detail =
    timelineDetails[id];

  if (!detail) {
    return null;
  }

  return {
    ...detail,
    content:
      detail[language],
  };
}