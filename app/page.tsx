"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Navbar from "@/components/Navbar/Navbar";
import StoryHero from "@/components/Hero/StoryHero";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import ExpertiseSection from "@/components/Expertise/ExpertiseSection";
import NextChapterRadarController from "@/components/NextChapter/NextChapterRadarController";
import ProfessionalReferencesController from "@/components/References/ProfessionalReferencesController";
import SeasonalHalloween from "@/components/Seasonal/SeasonalHalloween";
import PageProgress from "@/components/Progress/PageProgress";

import type {
  Language,
} from "@/data/timeline";

import {
  shouldUseHalloweenSeason,
} from "@/lib/season";

export default function Home() {
  const [
    language,
    setLanguage,
  ] = useState<Language>(
    "fr"
  );

  const [
    pageLoaded,
    setPageLoaded,
  ] = useState(false);

  const [
    introResolved,
    setIntroResolved,
  ] = useState(false);

  const [
    loaderDuration,
    setLoaderDuration,
  ] = useState(2600);

  const [
    showLoader,
    setShowLoader,
  ] = useState(true);

  const [
    loaderReady,
    setLoaderReady,
  ] = useState(false);

  const startedAt =
    useRef(
      Date.now()
    );

  useEffect(() => {
    document.documentElement.classList.add(
      "theme-dark"
    );

    localStorage.setItem(
      "damergi-theme",
      "dark"
    );
  }, []);

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "damergi-language"
      );

    if (
      savedLanguage ===
        "fr" ||
      savedLanguage ===
        "en"
    ) {
      setLanguage(
        savedLanguage
      );

      document.documentElement.lang =
        savedLanguage;
    }
  }, []);

  useEffect(() => {
    const alreadySeen =
      localStorage.getItem(
        "damergi-intro-seen"
      );

    const halloween =
      shouldUseHalloweenSeason();

    if (halloween) {
      setLoaderDuration(
        alreadySeen
          ? 2200
          : 2600
      );
    } else if (
      alreadySeen
    ) {
      setLoaderDuration(
        850
      );
    } else {
      setLoaderDuration(
        2600
      );
    }

    if (!alreadySeen) {
      localStorage.setItem(
        "damergi-intro-seen",
        "1"
      );
    }

    setIntroResolved(
      true
    );
  }, []);

  useEffect(() => {
    const handleLoad =
      () => {
        setPageLoaded(
          true
        );
      };

    if (
      document.readyState ===
      "complete"
    ) {
      handleLoad();
    } else {
      window.addEventListener(
        "load",
        handleLoad
      );
    }

    return () => {
      window.removeEventListener(
        "load",
        handleLoad
      );
    };
  }, []);

  useEffect(() => {
    if (
      !pageLoaded ||
      !introResolved
    ) {
      return;
    }

    const halloween =
      shouldUseHalloweenSeason();

    setLoaderReady(
      true
    );

    /*
      Halloween intentionally plays from 0 -> 100%
      AFTER the real page has finished loading.
      This prevents hydration / asset loading time from
      eating most of the seasonal intro.
    */
    if (halloween) {
      const timer =
        window.setTimeout(
          () => {
            setShowLoader(
              false
            );
          },
          loaderDuration
        );

      return () => {
        window.clearTimeout(
          timer
        );
      };
    }

    /*
      Normal DAMERGI intro keeps the original smart timing.
    */
    const elapsed =
      Date.now() -
      startedAt.current;

    const remaining =
      Math.max(
        0,
        loaderDuration -
          elapsed
      );

    const timer =
      window.setTimeout(
        () => {
          setShowLoader(
            false
          );
        },
        remaining
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    pageLoaded,
    introResolved,
    loaderDuration,
  ]);

  function changeLanguage(
    nextLanguage:
      Language
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

  return (
    <>
      <PageProgress />

      <SeasonalHalloween
        language={
          language
        }
        loaderVisible={
          showLoader
        }
        loaderReady={
          loaderReady
        }
        loaderDurationMs={
          loaderDuration
        }
      />

      <LoadingScreen
        visible={
          showLoader
        }
        language={
          language
        }
        durationMs={
          loaderDuration
        }
      />

      <Navbar
        language={
          language
        }
        onLanguageChange={
          changeLanguage
        }
      />

      <NextChapterRadarController
        language={
          language
        }
      />

      <ProfessionalReferencesController
        language={
          language
        }
      />

      <main className="pt-20 lg:pt-28">

        <StoryHero
          language={
            language
          }
        />

        <ExpertiseSection
          language={
            language
          }
        />

      </main>
    </>
  );
}
