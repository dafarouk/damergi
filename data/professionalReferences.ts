import type { Language } from "@/data/timeline";

export type ProfessionalReferenceId =
  | "nadine"
  | "aymen";

export type ProfessionalReference = {
  id: ProfessionalReferenceId;
  name: string;
  company: string;
  imagePath: string;
  phone: string;
  email: string;
  linkedin: string;

  role: Record<
    Language,
    string
  >;

  secondaryRole?: Record<
    Language,
    string
  >;

  relationship: Record<
    Language,
    string
  >;
};

export const professionalReferences: ProfessionalReference[] =
  [
    {
      id: "nadine",

      name:
        "Nadine FONTAINE",

      company:
        "Air France",

      imagePath:
        "/images/references/nadine-fontaine.jpg",

      phone:
        "+33 6 47 84 03 72",

      email:
        "nafontaine@airfrance.fr",

      linkedin:
        "https://www.linkedin.com/in/nadine-fontaine-90526267/",

      role: {
        fr:
          "Responsable Budget & Pilotage des sous-traitants — Logistique Opérationnelle PN",

        en:
          "Budget & Logistics Subcontractor Performance Manager — Flight Crew Operations",
      },

      relationship: {
        fr:
          "Manager actuelle de Farouk chez Air France",

        en:
          "Farouk’s current manager at Air France",
      },
    },

    {
      id: "aymen",

      name:
        "Aymen OMRI",

      company:
        "AYcode",

      imagePath:
        "/images/references/aymen-omri.jpg",

      phone:
        "+216 92 265 457",

      email:
        "aymen.omri@aycode.net",

      linkedin:
        "https://www.linkedin.com/in/aymen-omri-4197a723b/",

      role: {
        fr:
          "Fondateur & Gérant d’AYcode",

        en:
          "Founder & Managing Director of AYcode",
      },

      secondaryRole: {
        fr:
          "Full Stack Developer — Angular | Spring | Node.js",

        en:
          "Full Stack Developer — Angular | Spring | Node.js",
      },

      relationship: {
        fr:
          "Référence professionnelle du stage Data Analyst de Farouk chez AYcode",

        en:
          "Professional reference from Farouk’s Data Analyst internship at AYcode",
      },
    },
  ];

export function getProfessionalReference(
  id: ProfessionalReferenceId
) {
  return professionalReferences.find(
    (reference) =>
      reference.id === id
  );
}