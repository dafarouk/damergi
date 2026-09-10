"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  BookOpenText,
  BriefcaseBusiness,
  Home,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  Language,
} from "@/data/timeline";

import CommandPalette from "@/components/Navigation/CommandPalette";
import RecruiterMode from "@/components/Recruiter/RecruiterMode";

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
  const pathname = usePathname();

  const onPortfolioPage =
    pathname === "/";

  const onGuidePage =
    pathname === "/cv-guide";

  const [
    darkMode,
    setDarkMode,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "damergi-theme"
      );

    if (savedTheme === "dark") {
      document.documentElement.classList.add(
        "theme-dark"
      );

      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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

  function openRecruiterMode() {
    setMobileMenuOpen(false);

    window.dispatchEvent(
      new Event(
        "damergi:open-recruiter"
      )
    );
  }

  function goToContact(
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    event.preventDefault();

    if (pathname !== "/") {
      window.location.href =
        "/#contact-panel";

      return;
    }

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
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#111827]/96 text-white backdrop-blur-xl">

        <nav className="relative mx-auto flex h-20 max-w-[1800px] items-center px-3 sm:px-6 lg:h-28 lg:px-14">

          {/* MOBILE LEFT */}
          <div className="flex -translate-y-2 items-center md:hidden">

            <LanguageButton
              language={language}
              onClick={toggleLanguage}
            />

          </div>

          {/* DESKTOP LEFT */}
          <div className="hidden items-center gap-3 md:flex">

            <span className="relative flex h-2.5 w-2.5 shrink-0">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#bc965d] opacity-35" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#bc965d] shadow-[0_0_12px_rgba(188,150,93,0.55)]" />

            </span>

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d2ad73] lg:text-[10px]">
                {language === "fr"
                  ? "Objectif · CDI fév. 2027"
                  : "Goal · Permanent role Feb. 2027"}
              </p>

              <p className="mt-1 hidden max-w-[360px] text-[10px] font-light tracking-[0.04em] text-white/60 xl:block xl:text-[11px]">
                {language === "fr"
                  ? "Paris / Île-de-France en priorité · mobilité pour une belle opportunité"
                  : "Paris / Île-de-France preferred · open to relocation for the right opportunity"}
              </p>

            </div>

          </div>

          {/* CENTER BRAND */}
          <a
            href="/"
            aria-label="Ahmed Farouk Damergi"
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
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

          {/* RIGHT UTILITIES */}
          <div className="ml-auto flex -translate-y-2 items-center gap-0.5 sm:gap-2 md:-translate-y-3">

            <CommandPalette
              language={language}
            />

            <div className="hidden md:block">

              <LanguageButton
                language={language}
                onClick={toggleLanguage}
              />

            </div>

            {/* MOBILE MENU */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  (current) => !current
                )
              }
              aria-expanded={mobileMenuOpen}
              aria-label={
                language === "fr"
                  ? "Ouvrir le menu"
                  : "Open menu"
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? (
                <X
                  size={17}
                  strokeWidth={1.8}
                />
              ) : (
                <Menu
                  size={18}
                  strokeWidth={1.8}
                />
              )}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                language === "fr"
                  ? "Changer le thème"
                  : "Change theme"
              }
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white lg:h-10 lg:w-10"
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

            <a
              href="#contact"
              onClick={goToContact}
              className="ml-0.5 rounded-full border border-white/25 px-3 py-2 text-[11px] font-medium transition hover:bg-white hover:text-[#111827] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Contact
            </a>

          </div>

          {/* DESKTOP / TABLET TABS */}
          <div className="absolute bottom-0 right-3 z-20 hidden items-end gap-1 sm:right-6 md:flex lg:right-14">

            {/* PORTFOLIO */}
            <a
              href="/"
              aria-label={
                language === "fr"
                  ? "Mon portfolio"
                  : "My portfolio"
              }
              aria-current={
                onPortfolioPage
                  ? "page"
                  : undefined
              }
              className={`
                relative flex h-8 w-9 items-center justify-center gap-2
                rounded-t-lg border border-b-0
                transition-all duration-300
                lg:w-auto lg:px-4

                ${
                  onPortfolioPage
                    ? `
                      border-white/40
                      bg-white/[0.14]
                      text-white
                      shadow-[0_-5px_20px_rgba(255,255,255,0.13)]
                    `
                    : `
                      border-white/10
                      bg-[#172131]
                      text-white/50
                      hover:border-white/25
                      hover:bg-[#202b3d]
                      hover:text-white
                    `
                }
              `}
            >
              <Home
                size={14}
                strokeWidth={1.8}
              />

              <span className="hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] lg:inline">
                {language === "fr"
                  ? "Mon portfolio"
                  : "My portfolio"}
              </span>

              {onPortfolioPage && (
                <span className="absolute left-2 right-2 top-0 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              )}
            </a>

            {/* CV GUIDE */}
            <a
              href="/cv-guide"
              aria-label={
                language === "fr"
                  ? "Guide CV"
                  : "CV Guide"
              }
              aria-current={
                onGuidePage
                  ? "page"
                  : undefined
              }
              className={`
                relative flex h-8 w-9 items-center justify-center gap-2
                rounded-t-lg border border-b-0
                transition-all duration-300
                lg:w-auto lg:px-4

                ${
                  onGuidePage
                    ? `
                      border-white/40
                      bg-white/[0.14]
                      text-white
                      shadow-[0_-5px_20px_rgba(255,255,255,0.13)]
                    `
                    : `
                      border-white/10
                      bg-[#172131]
                      text-white/50
                      hover:border-white/25
                      hover:bg-[#202b3d]
                      hover:text-white
                    `
                }
              `}
            >
              <BookOpenText
                size={14}
                strokeWidth={1.8}
              />

              <span className="hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] lg:inline">
                {language === "fr"
                  ? "Guide CV"
                  : "CV Guide"}
              </span>

              {onGuidePage && (
                <span className="absolute left-2 right-2 top-0 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              )}
            </a>

            {/* RECRUITER */}
            <button
              type="button"
              onClick={openRecruiterMode}
              className="
                relative flex h-8 w-9 items-center justify-center gap-2
                rounded-t-lg border border-b-0
                border-[#bc965d]/50
                bg-[#bc965d]/[0.10]
                text-[#e5c48f]
                shadow-[0_-4px_20px_rgba(188,150,93,0.10)]
                transition-all duration-300
                hover:border-[#d2ad73]
                hover:bg-[#bc965d]/20
                lg:w-auto lg:px-4
              "
            >

              <span className="relative hidden h-2 w-2 lg:flex">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#bc965d] opacity-40" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d2ad73] shadow-[0_0_12px_rgba(210,173,115,0.9)]" />

              </span>

              <BriefcaseBusiness
                size={14}
                strokeWidth={1.8}
              />

              <span className="hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] lg:inline">
                {language === "fr"
                  ? "Vous êtes recruteur ?"
                  : "Are you a recruiter?"}
              </span>

              <span className="absolute left-2 right-2 top-0 h-[2px] bg-[#bc965d] shadow-[0_0_12px_rgba(188,150,93,0.9)]" />

            </button>

          </div>

        </nav>

        {/* MOBILE DROPDOWN */}
        {mobileMenuOpen && (
          <div className="absolute right-3 top-[calc(100%-6px)] z-50 w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.42)] md:hidden">

            <a
              href="/"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                onPortfolioPage
                  ? "bg-white/[0.10] text-white"
                  : "text-white/65 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Home
                size={16}
                strokeWidth={1.8}
              />

              {language === "fr"
                ? "Mon portfolio"
                : "My portfolio"}
            </a>

            <a
              href="/cv-guide"
              className={`mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                onGuidePage
                  ? "bg-white/[0.10] text-white"
                  : "text-white/65 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <BookOpenText
                size={16}
                strokeWidth={1.8}
              />

              {language === "fr"
                ? "Guide CV"
                : "CV Guide"}
            </a>

            <button
              type="button"
              onClick={openRecruiterMode}
              className="mt-1 flex w-full items-center gap-3 rounded-xl border border-[#bc965d]/20 bg-[#bc965d]/[0.08] px-4 py-3 text-left text-sm text-[#e0bd88] transition hover:border-[#bc965d]/45 hover:bg-[#bc965d]/15"
            >
              <span className="relative flex h-2 w-2 shrink-0">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#bc965d] opacity-40" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d2ad73]" />

              </span>

              <BriefcaseBusiness
                size={16}
                strokeWidth={1.8}
              />

              {language === "fr"
                ? "Vous êtes recruteur ?"
                : "Are you a recruiter?"}
            </button>

          </div>
        )}

      </header>

      <RecruiterMode
        language={language}
      />
    </>
  );
}

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

function FranceFlag() {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 3 2"
      className="shrink-0 overflow-hidden rounded-[2px] shadow-sm"
      aria-hidden="true"
    >
      <rect width="1" height="2" x="0" fill="#002395" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#ED2939" />
    </svg>
  );
}

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
        <path d="M0 0v30h60V0z" fill="#012169" />

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