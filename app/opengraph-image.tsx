import { ImageResponse } from "next/og";

export const alt =
  "Ahmed-Farouk DAMERGI — Data & Business Analyst";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#111827",
          color: "#F8F6F1",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* DECORATIVE CIRCLES */}

        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: "1px solid rgba(188,150,93,0.18)",
            right: -80,
            top: -100,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            borderRadius: "50%",
            border: "1px solid rgba(188,150,93,0.12)",
            right: 10,
            top: -20,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            border: "1px solid rgba(188,150,93,0.1)",
            left: -220,
            bottom: -240,
            display: "flex",
          }}
        />

        {/* GOLD ACCENT */}

        <div
          style={{
            position: "absolute",
            left: 72,
            top: 72,
            width: 74,
            height: 3,
            borderRadius: 999,
            backgroundColor: "#BC965D",
            display: "flex",
          }}
        />

        {/* MAIN CONTENT */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "72px",
          }}
        >
          {/* BRAND */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 48,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 78,
                height: 78,
                borderRadius: "50%",
                border: "1px solid rgba(188,150,93,0.55)",
                color: "#BC965D",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "-0.08em",
                marginRight: 22,
              }}
            >
              AFD
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#BC965D",
                }}
              >
                Professional Portfolio
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                  fontSize: 14,
                  letterSpacing: "0.18em",
                  color: "rgba(248,246,241,0.55)",
                }}
              >
                DAMERGI.COM
              </div>
            </div>
          </div>

          {/* NAME */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 900,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 67,
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: "-0.045em",
              }}
            >
              Ahmed-Farouk
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 67,
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: "-0.045em",
              }}
            >
              DAMERGI
            </div>
          </div>

          {/* ROLE */}

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 29,
              fontWeight: 400,
              color: "rgba(248,246,241,0.72)",
            }}
          >
            Data &amp; Business Analyst
          </div>

          {/* SKILLS */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 50,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#BC965D",
            }}
          >
            Power BI · SQL · Python · Performance · Automation
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}