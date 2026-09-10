"use client";

import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function SiteEffects() {
  const [
    active,
    setActive,
  ] = useState(false);

  const sequenceRef =
    useRef("");

  const resetTimerRef =
    useRef<
      number | null
    >(null);

  const effectTimerRef =
    useRef<
      number | null
    >(null);

  useEffect(() => {
    function resetSequenceSoon() {
      if (
        resetTimerRef.current
      ) {
        window.clearTimeout(
          resetTimerRef.current
        );
      }

      resetTimerRef.current =
        window.setTimeout(
          () => {
            sequenceRef.current =
              "";
          },
          1200
        );
    }

    function triggerAFD() {
      setActive(
        false
      );

      document.documentElement.classList.remove(
        "afd-easter-active"
      );

      requestAnimationFrame(
        () => {
          setActive(
            true
          );

          document.documentElement.classList.add(
            "afd-easter-active"
          );
        }
      );

      if (
        effectTimerRef.current
      ) {
        window.clearTimeout(
          effectTimerRef.current
        );
      }

      effectTimerRef.current =
        window.setTimeout(
          () => {
            setActive(
              false
            );

            document.documentElement.classList.remove(
              "afd-easter-active"
            );
          },
          1250
        );
    }

    function handleKeyDown(
      event:
        KeyboardEvent
    ) {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      const target =
        event.target as
          | HTMLElement
          | null;

      const tagName =
        target?.tagName?.toLowerCase();

      if (
        tagName ===
          "input" ||
        tagName ===
          "textarea" ||
        target?.isContentEditable
      ) {
        return;
      }

      const key =
        event.key.toLowerCase();

      if (
        !/^[a-z]$/.test(
          key
        )
      ) {
        return;
      }

      sequenceRef.current =
        `${
          sequenceRef.current
        }${key}`.slice(
          -3
        );

      resetSequenceSoon();

      if (
        sequenceRef.current ===
        "afd"
      ) {
        sequenceRef.current =
          "";

        triggerAFD();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      if (
        resetTimerRef.current
      ) {
        window.clearTimeout(
          resetTimerRef.current
        );
      }

      if (
        effectTimerRef.current
      ) {
        window.clearTimeout(
          effectTimerRef.current
        );
      }

      document.documentElement.classList.remove(
        "afd-easter-active"
      );
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`afd-easter-overlay ${
        active
          ? "is-active"
          : ""
      }`}
    >

      <div className="afd-easter-grid" />

      <div className="afd-easter-flare" />

      {[
        [
          "12%",
          "18%",
          -12,
        ],

        [
          "31%",
          "30%",
          8,
        ],

        [
          "53%",
          "16%",
          -5,
        ],

        [
          "78%",
          "26%",
          10,
        ],

        [
          "18%",
          "67%",
          7,
        ],

        [
          "49%",
          "70%",
          -8,
        ],

        [
          "75%",
          "72%",
          5,
        ],
      ].map(
        (
          [
            left,
            top,
            rotate,
          ],
          index
        ) => (
          <div
            key={`${left}-${top}`}
            className="afd-easter-mark"
            style={{
              left:
                String(
                  left
                ),

              top:
                String(
                  top
                ),

              transform:
                `translate(-50%, -50%) rotate(${rotate}deg)`,

              animationDelay:
                `${index * 45}ms`,
            }}
          >

            <Image
              src="/images/branding/afd-gold.png"
              alt=""
              width={120}
              height={120}
              className="h-auto w-full object-contain"
            />

          </div>
        )
      )}

      <div className="afd-easter-center">

        <Image
          src="/images/branding/afd-gold.png"
          alt=""
          width={190}
          height={190}
          className="h-auto w-full object-contain"
        />

      </div>

    </div>
  );
}