"use client";

import Image from "next/image";

import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  Language,
} from "@/data/timeline";

type NavbarProps = {
  language: Language;
  onLanguageChange: (
    language: Language
  ) => void;
};

export default function Navbar({
  language,
  onLanguageChange,
}: NavbarProps) {
  const [
    darkMode,
    setDarkMode,
  ] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "damergi-theme"
      );

    if (
      savedTheme === "dark"
    ) {
      document.documentElement.classList.add(
        "theme-dark"
      );

      setDarkMode(true);
    }
  }, []);

  function toggleTheme() {
    const nextTheme =
      !darkMode;

    setDarkMode(nextTheme);

    document.documentElement.classList.toggle(
      "theme-dark",
      nextTheme
    );

    localStorage.setItem(
      "damergi-theme",
      nextTheme
        ? "dark"
        : "light"
    );
  }

  function toggleLanguage() {
    onLanguageChange(
      language === "fr"
        ? "en"
        : "fr"
    );
  }

  function goToContact(
    event: React.MouseEvent<
      HTMLAnchorElement
    >
  ) {
    event.preventDefault();

    const mobile =
      window.matchMedia(
        "(max-width: 1023px)"
      ).matches;

    const target =
      document.getElementById(
        mobile
          ? "mobile-contact-panel"
          : "contact-panel"
      );

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    target.classList.remove(
      "contact-focus"
    );

    requestAnimationFrame(() => {
      target.classList.add(
        "contact-focus"
      );
    });

    window.setTimeout(() => {
      target.classList.remove(
        "contact-focus"
      );
    }, 1400);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#111827]/96 text-white backdrop-blur-xl">

      <nav className="relative mx-auto flex h-20 max-w-[1800px] items-center px-3 sm:px-6 lg:h-28 lg:px-14">

        {/* =====================================================
            MOBILE LEFT — LANGUAGE
        ===================================================== */}
        <div className="flex items-center md:hidden">
          <LanguageButton
            language={language}
            onClick={toggleLanguage}
          />
        </div>

        {/* =====================================================
            DESKTOP LEFT — PORTFOLIO
        ===================================================== */}
        <div className="hidden md:block">
          <p className="text-[11px] font-light uppercase tracking-[0.22em] text-white/55">
            Portfolio · 2026
          </p>
        </div>

        {/* =====================================================
            CENTER BRAND
        ===================================================== */}
        <a
          href="#home"
          aria-label="Ahmed Farouk Damergi - Home"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        >
          <Image
            src="/images/branding/afd-white.png"
            alt="AFD"
            width={110}
            height={110}
            priority
            className="h-[62px] w-auto object-contain sm:h-[66px] lg:h-[64px]"
          />

          <span className="-mt-2 hidden whitespace-nowrap text-[9px] font-light uppercase tracking-[0.3em] text-white/60 sm:block lg:text-[10px]">
            Ahmed Farouk Damergi
          </span>
        </a>

        {/* =====================================================
            RIGHT
        ===================================================== */}
        <div className="ml-auto flex items-center gap-0.5 sm:gap-2">

          {/* DESKTOP LANGUAGE ONLY */}
          <div className="hidden md:block">
            <LanguageButton
              language={language}
              onClick={
                toggleLanguage
              }
            />
          </div>

          {/* THEME */}
          <button
            type="button"
            onClick={
              toggleTheme
            }
            aria-label={
              language === "fr"
                ? "Changer le thème"
                : "Change theme"
            }
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white lg:h-10 lg:w-10"
          >
            {darkMode ? (
              <Sun
                size={17}
                strokeWidth={1.7}
              />
            ) : (
              <Moon
                size={17}
                strokeWidth={1.7}
              />
            )}
          </button>

          {/* CONTACT */}
          <a
            href="#contact"
            onClick={
              goToContact
            }
            className="ml-0.5 shrink-0 rounded-full border border-white/25 px-3 py-2 text-[11px] font-medium transition hover:bg-white hover:text-[#111827] sm:ml-1 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Contact
          </a>

        </div>

      </nav>
    </header>
  );
}

/* =========================================================
   LANGUAGE BUTTON
========================================================= */

function LanguageButton({
  language,
  onClick,
}: {
  language: Language;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        language === "fr"
          ? "Switch to English"
          : "Passer en français"
      }
      className="flex items-center gap-1.5 rounded-full px-1.5 py-2 text-[11px] font-semibold uppercase tracking-[0.04em] text-white/85 transition hover:bg-white/10 hover:text-white sm:gap-2 sm:px-2.5 sm:text-sm"
    >
      <span>
        {language === "fr"
          ? "FR"
          : "EN"}
      </span>

      {language === "fr" ? (
        <FranceFlag />
      ) : (
        <UKFlag />
      )}
    </button>
  );
}

/* =========================================================
   FRANCE FLAG
========================================================= */

function FranceFlag() {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 3 2"
      className="shrink-0 overflow-hidden rounded-[2px] shadow-sm"
      aria-hidden="true"
    >
      <rect
        width="1"
        height="2"
        x="0"
        fill="#002395"
      />

      <rect
        width="1"
        height="2"
        x="1"
        fill="#FFFFFF"
      />

      <rect
        width="1"
        height="2"
        x="2"
        fill="#ED2939"
      />
    </svg>
  );
}

/* =========================================================
   UK FLAG
========================================================= */

function UKFlag() {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 60 30"
      className="shrink-0 overflow-hidden rounded-[2px] shadow-sm"
      aria-hidden="true"
    >
      <clipPath id="ukFlagClip">
        <path d="M0 0v30h60V0z" />
      </clipPath>

      <g clipPath="url(#ukFlagClip)">
        <path
          d="M0 0v30h60V0z"
          fill="#012169"
        />

        <path
          d="M0 0 60 30M60 0 0 30"
          stroke="#fff"
          strokeWidth="6"
        />

        <path
          d="M0 0 60 30M60 0 0 30"
          stroke="#C8102E"
          strokeWidth="4"
        />

        <path
          d="M30 0v30M0 15h60"
          stroke="#fff"
          strokeWidth="10"
        />

        <path
          d="M30 0v30M0 15h60"
          stroke="#C8102E"
          strokeWidth="6"
        />
      </g>
    </svg>
  );
}