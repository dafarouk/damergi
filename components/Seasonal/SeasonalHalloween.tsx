"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";

import type {
  Language,
} from "@/data/timeline";

import {
  shouldUseHalloweenSeason,
} from "@/lib/season";

type SeasonalHalloweenProps = {
  language: Language;
  loaderVisible: boolean;
  loaderReady: boolean;
  loaderDurationMs: number;
};

const batFlight = [
  {
    top:
      "13%",

    delay:
      "0.1s",

    duration:
      "7.8s",

    width:
      72,
  },
  {
    top:
      "21%",

    delay:
      "0.85s",

    duration:
      "9.2s",

    width:
      52,
  },
  {
    top:
      "30%",

    delay:
      "1.55s",

    duration:
      "8.5s",

    width:
      62,
  },
];

export default function SeasonalHalloween({
  language,
  loaderVisible,
  loaderReady,
  loaderDurationMs,
}: SeasonalHalloweenProps) {
  const [
    active,
    setActive,
  ] = useState(
    () =>
      shouldUseHalloweenSeason()
  );

  const [
    showBats,
    setShowBats,
  ] = useState(false);

  const [
    renderLoader,
    setRenderLoader,
  ] = useState(
    loaderVisible
  );

  const [
    loaderExiting,
    setLoaderExiting,
  ] = useState(false);

  const [
    progressStarted,
    setProgressStarted,
  ] = useState(false);

  const [
    assetsReady,
    setAssetsReady,
  ] = useState(false);

  const isFr =
    language === "fr";

  useEffect(() => {
    function applySeason() {
      const next =
        shouldUseHalloweenSeason();

      document.documentElement.classList.add(
        "theme-dark"
      );

      localStorage.setItem(
        "damergi-theme",
        "dark"
      );

      if (next) {
        document.documentElement.setAttribute(
          "data-season",
          "halloween"
        );
      } else {
        document.documentElement.removeAttribute(
          "data-season"
        );
      }

      setActive(
        next
      );
    }

    applySeason();

    const interval =
      window.setInterval(
        applySeason,
        30_000
      );

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, []);

  useEffect(() => {
    if (!active) {
      setAssetsReady(
        false
      );

      return;
    }

    const assets = [
      "/images/seasonal/evil-pumpkin.svg",
      "/images/seasonal/bat-silhouette.svg",
      "/images/seasonal/spider-web.svg",
      "/images/seasonal/forest-back.svg",
      "/images/seasonal/forest-front.svg",
    ];

    let cancelled =
      false;

    Promise.all(
      assets.map(
        (
          source
        ) =>
          new Promise<void>(
            (
              resolve
            ) => {
              const image =
                new Image();

              let settled =
                false;

              const done =
                async () => {
                  if (settled) {
                    return;
                  }

                  settled =
                    true;

                  try {
                    await image.decode();
                  } catch {
                    /*
                      Some browsers can reject decode() for an
                      already-cached SVG even though it is usable.
                    */
                  }

                  resolve();
                };

              image.onload =
                done;

              image.onerror =
                () => {
                  resolve();
                };

              image.src =
                source;

              if (
                image.complete
              ) {
                void done();
              }
            }
          )
      )
    ).then(
      () => {
        if (
          !cancelled
        ) {
          setAssetsReady(
            true
          );
        }
      }
    );

    return () => {
      cancelled =
        true;
    };
  }, [
    active,
  ]);

  useEffect(() => {
    if (loaderVisible) {
      setRenderLoader(
        true
      );

      setLoaderExiting(
        false
      );

      return;
    }

    if (!renderLoader) {
      return;
    }

    setLoaderExiting(
      true
    );

    const timer =
      window.setTimeout(
        () => {
          setRenderLoader(
            false
          );

          setLoaderExiting(
            false
          );
        },
        340
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    loaderVisible,
    renderLoader,
  ]);

  useEffect(() => {
    if (
      !active ||
      !loaderVisible ||
      !loaderReady ||
      !assetsReady
    ) {
      setProgressStarted(
        false
      );

      return;
    }

    setProgressStarted(
      false
    );

    let secondFrame =
      0;

    const firstFrame =
      window.requestAnimationFrame(
        () => {
          secondFrame =
            window.requestAnimationFrame(
              () => {
                setProgressStarted(
                  true
                );
              }
            );
        }
      );

    return () => {
      window.cancelAnimationFrame(
        firstFrame
      );

      if (secondFrame) {
        window.cancelAnimationFrame(
          secondFrame
        );
      }
    };
  }, [
    active,
    loaderVisible,
    loaderReady,
    loaderDurationMs,
    assetsReady,
  ]);

  useEffect(() => {
    if (
      !active ||
      loaderVisible
    ) {
      setShowBats(
        false
      );

      return;
    }

    setShowBats(
      true
    );

    const timer =
      window.setTimeout(
        () => {
          setShowBats(
            false
          );
        },
        11_500
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    active,
    loaderVisible,
  ]);

  if (!active) {
    return null;
  }

  const sceneReady =
    loaderReady &&
    assetsReady;

  return (
    <>
      <div
        className="halloween-ambience"
        aria-hidden="true"
      >
        <HalloweenNightScene
          showBats={
            showBats
          }
        />
      </div>

      {renderLoader && (
        <div
          className={`halloween-loader ${
            loaderExiting
              ? "halloween-loader-exit"
              : ""
          }`}
          role="presentation"
        >
          <div
            className={`halloween-loader-visuals ${
              sceneReady
                ? "halloween-loader-visuals-ready"
                : ""
            }`}
          >
            <div
              className="halloween-loader-scene"
              aria-hidden="true"
            >
              <HalloweenNightScene
                showBats={
                  false
                }
              />
            </div>

            <div className="halloween-loader-core">
              <div className="halloween-loader-pumpkin-stage">
                <img
                  src="/images/seasonal/evil-pumpkin.svg"
                  alt=""
                  className="halloween-loader-pumpkin"
                />
              </div>

              <p className="halloween-loader-brand">
                DAMERGI.COM
              </p>

              <p className="halloween-loader-edition">
                {isFr
                  ? "ÉDITION HALLOWEEN"
                  : "HALLOWEEN EDITION"}
              </p>

              <div className="halloween-loader-keywords">
                <span>
                  DATA
                </span>

                <img
                  src="/images/seasonal/evil-pumpkin.svg"
                  alt=""
                />

                <span>
                  BUSINESS
                </span>

                <img
                  src="/images/seasonal/evil-pumpkin.svg"
                  alt=""
                />

                <span>
                  PERFORMANCE
                </span>

                <img
                  src="/images/seasonal/evil-pumpkin.svg"
                  alt=""
                />

                <span>
                  AUTOMATION
                </span>
              </div>

              <div className="halloween-loader-progress">
                <div
                  className="halloween-loader-progress-fill"
                  style={{
                    transform:
                      progressStarted
                        ? "scaleX(1)"
                        : "scaleX(0)",

                    transitionDuration:
                      `${Math.max(
                        loaderDurationMs -
                          120,
                        700
                      )}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="halloween-season-chip"
        aria-hidden="true"
      >
        <img
          src="/images/seasonal/evil-pumpkin.svg"
          alt=""
        />

        <span>
          {isFr
            ? "OCTOBRE"
            : "OCTOBER"}
        </span>
      </div>
    </>
  );
}

function HalloweenNightScene({
  showBats,
}: {
  showBats: boolean;
}) {
  return (
    <>
      <div className="halloween-stars" />

      <div className="halloween-moon-wrap">
        <div className="halloween-moon" />
      </div>

      <div className="halloween-clouds halloween-clouds-one" />

      <div className="halloween-clouds halloween-clouds-two" />

      <div className="halloween-fog halloween-fog-one" />

      <div className="halloween-fog halloween-fog-two" />

      <img
        src="/images/seasonal/spider-web.svg"
        alt=""
        className="halloween-web halloween-web-left"
      />

      <img
        src="/images/seasonal/spider-web.svg"
        alt=""
        className="halloween-web halloween-web-right"
      />

      {showBats && (
        <div className="halloween-bats">
          {batFlight.map(
            (
              bat,
              index
            ) => (
              <div
                key={
                  index
                }
                className="halloween-bat"
                style={
                  {
                    top:
                      bat.top,

                    width:
                      `${bat.width}px`,

                    animationDelay:
                      bat.delay,

                    animationDuration:
                      bat.duration,
                  } as CSSProperties
                }
              >
                <span className="halloween-bat-bob">
                  <img
                    src="/images/seasonal/bat-silhouette.svg"
                    alt=""
                    className="halloween-real-bat"
                  />
                </span>
              </div>
            )
          )}
        </div>
      )}

      <div className="halloween-forest halloween-forest-back" />

      <div className="halloween-forest halloween-forest-front" />
    </>
  );
}
