export function isOctoberInParis(
  date: Date = new Date()
) {
  return (
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          "Europe/Paris",

        month:
          "2-digit",
      }
    ).format(
      date
    ) === "10"
  );
}

export function getSeasonOverride(
  search?: string
) {
  let source =
    search;

  if (
    source === undefined &&
    typeof window !==
      "undefined"
  ) {
    source =
      window.location.search;
  }

  if (!source) {
    return null;
  }

  const value =
    new URLSearchParams(
      source
    ).get(
      "season"
    );

  if (
    value ===
    "halloween"
  ) {
    return true;
  }

  if (
    value ===
    "normal"
  ) {
    return false;
  }

  return null;
}

export function shouldUseHalloweenSeason(
  search?: string,
  date: Date = new Date()
) {
  const override =
    getSeasonOverride(
      search
    );

  if (
    override !== null
  ) {
    return override;
  }

  return isOctoberInParis(
    date
  );
}
