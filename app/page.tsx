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
import PageProgress from "@/components/Progress/PageProgress";

import type {
  Language,
} from "@/data/timeline";

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

  const startedAt =
    useRef(
      Date.now()
    );

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

    if (
      alreadySeen
    ) {
      setLoaderDuration(
        850
      );
    } else {
      setLoaderDuration(
        2600
      );

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