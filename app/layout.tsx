import type {
  Metadata,
} from "next";

import Script from "next/script";

import "./globals.css";
import "./effects.css";
import "./halloween.css";

import SiteEffects from "@/components/Effects/SiteEffects";

function getSiteUrl() {
  if (
    process.env
      .NEXT_PUBLIC_SITE_URL
  ) {
    return process.env
      .NEXT_PUBLIC_SITE_URL;
  }

  if (
    process.env
      .VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (
    process.env
      .VERCEL_URL
  ) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

const siteUrl =
  getSiteUrl();

export const metadata: Metadata =
  {
    metadataBase:
      new URL(
        siteUrl
      ),

    title: {
      default:
        "Ahmed-Farouk DAMERGI | Data & Business Analyst",

      template:
        "%s | Ahmed-Farouk DAMERGI",
    },

    description:
      "Portfolio professionnel d'Ahmed-Farouk DAMERGI, Data & Business Analyst spécialisé en Business Intelligence, analyse de performance, reporting, automatisation et qualité des données.",

    keywords: [
      "Ahmed-Farouk DAMERGI",
      "Farouk Damergi",
      "Data Analyst",
      "Business Analyst",
      "BI Analyst",
      "Data Business Analyst",
      "Performance Analyst",
      "Power BI",
      "SQL",
      "Python",
      "Business Intelligence",
      "Data Quality",
      "Automation",
      "Paris",
      "Île-de-France",
      "France",
    ],

    authors: [
      {
        name:
          "Ahmed-Farouk DAMERGI",
      },
    ],

    creator:
      "Ahmed-Farouk DAMERGI",

    publisher:
      "Ahmed-Farouk DAMERGI",

    alternates: {
      canonical:
        "/",
    },

    openGraph: {
      type:
        "website",

      locale:
        "fr_FR",

      alternateLocale: [
        "en_GB",
      ],

      url:
        "/",

      siteName:
        "Ahmed-Farouk DAMERGI",

      title:
        "Ahmed-Farouk DAMERGI | Data & Business Analyst",

      description:
        "Data, Business Intelligence, performance analytics, reporting, data quality and automation.",

      images: [
        {
          url:
            "/opengraph-image",

          width:
            1200,

          height:
            630,

          alt:
            "Ahmed-Farouk DAMERGI - Data & Business Analyst",
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        "Ahmed-Farouk DAMERGI | Data & Business Analyst",

      description:
        "Data, Business Intelligence, performance analytics, reporting, data quality and automation.",

      images: [
        "/opengraph-image",
      ],
    },

    robots: {
      index:
        true,

      follow:
        true,
    },
  };

const personStructuredData =
  {
    "@context":
      "https://schema.org",

    "@type":
      "Person",

    name:
      "Ahmed-Farouk DAMERGI",

    alternateName:
      "Farouk",

    url:
      siteUrl,

    jobTitle:
      "Data & Business Analyst",

    address: {
      "@type":
        "PostalAddress",

      addressRegion:
        "Île-de-France",

      addressCountry:
        "FR",
    },

    sameAs: [
      "https://linkedin.com/in/farouk-damergi",
      "https://github.com/dafarouk",
    ],

    knowsAbout: [
      "Data Analysis",
      "Business Intelligence",
      "Power BI",
      "SQL",
      "Python",
      "Performance Analytics",
      "Data Quality",
      "Reporting",
      "Automation",
      "Excel",
      "VBA",
      "Tableau",
    ],
  };

const seasonBootScript = `
(() => {
  try {
    const root = document.documentElement;
    const params = new URLSearchParams(window.location.search);
    const override = params.get("season");
    const month = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Paris",
      month: "2-digit",
    }).format(new Date());

    const halloween =
      override === "halloween" ||
      (override !== "normal" && month === "10");

    root.classList.add("theme-dark");

    if (halloween) {
      root.setAttribute("data-season", "halloween");
    } else {
      root.removeAttribute("data-season");
    }

    try {
      localStorage.setItem("damergi-theme", "dark");
    } catch {}
  } catch {
    document.documentElement.classList.add("theme-dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="theme-dark"
      suppressHydrationWarning
    >
      <body>

        <Script
          id="damergi-season-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              seasonBootScript,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                personStructuredData
              ),
          }}
        />

        <SiteEffects />

        {
          children
        }

      </body>
    </html>
  );
}
