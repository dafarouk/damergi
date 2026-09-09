import {
  ImageResponse,
} from "next/og";

export const alt =
  "Ahmed-Farouk DAMERGI - Data & Business Analyst";

export const size = {
  width:
    1200,
  height:
    630,
};

export const contentType =
  "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width:
            "100%",
          height:
            "100%",
          display:
            "flex",
          position:
            "relative",
          overflow:
            "hidden",
          background:
            "#111827",
          color:
            "#ffffff",
          fontFamily:
            "Arial, sans-serif",
        }}
      >

        {/* GRID */}
        <div
          style={{
            position:
              "absolute",
            inset:
              0,
            opacity:
              0.08,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
            backgroundSize:
              "70px 70px",
          }}
        />

        {/* GOLD GLOW */}
        <div
          style={{
            position:
              "absolute",
            width:
              700,
            height:
              700,
            right:
              -170,
            top:
              -210,
            borderRadius:
              "50%",
            background:
              "radial-gradient(circle, rgba(188,150,93,.22), rgba(188,150,93,0) 67%)",
          }}
        />

        {/* LEFT CONTENT */}
        <div
          style={{
            display:
              "flex",
            flexDirection:
              "column",
            justifyContent:
              "center",
            padding:
              "80px 90px",
            width:
              "72%",
            zIndex:
              2,
          }}
        >

          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap:
                15,
              color:
                "#bc965d",
              fontSize:
                18,
              letterSpacing:
                "0.25em",
              textTransform:
                "uppercase",
            }}
          >
            <div
              style={{
                width:
                  55,
                height:
                  2,
                background:
                  "#bc965d",
              }}
            />

            PORTFOLIO
          </div>

          <div
            style={{
              marginTop:
                34,
              fontSize:
                66,
              fontWeight:
                700,
              lineHeight:
                1.03,
              letterSpacing:
                "-0.045em",
            }}
          >
            Ahmed-Farouk
            <br />
            DAMERGI
          </div>

          <div
            style={{
              marginTop:
                28,
              fontSize:
                30,
              color:
                "#bcc4d0",
            }}
          >
            Data & Business Analyst
          </div>

          <div
            style={{
              marginTop:
                36,
              display:
                "flex",
              gap:
                16,
              fontSize:
                17,
              color:
                "#8893a5",
            }}
          >
            Power BI · SQL · Python · Performance · Automation
          </div>

        </div>

        {/* AFD MONOGRAM */}
        <div
          style={{
            position:
              "absolute",
            right:
              90,
            top:
              150,
            width:
              270,
            height:
              270,
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            borderRadius:
              "50%",
            border:
              "1px solid rgba(188,150,93,.45)",
            color:
              "#ffffff",
            fontFamily:
              "Georgia, serif",
            fontSize:
              92,
            letterSpacing:
              "-0.12em",
            zIndex:
              2,
          }}
        >
          AFD
        </div>

        <div
          style={{
            position:
              "absolute",
            right:
              60,
            top:
              120,
            width:
              330,
            height:
              330,
            borderRadius:
              "50%",
            border:
              "1px dashed rgba(255,255,255,.12)",
          }}
        />

        <div
          style={{
            position:
              "absolute",
            bottom:
              50,
            right:
              90,
            fontSize:
              16,
            letterSpacing:
              "0.18em",
            color:
              "#bc965d",
            textTransform:
              "uppercase",
          }}
        >
          damergi.com
        </div>

      </div>
    ),
    {
      ...size,
    }
  );
}