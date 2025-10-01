import { SITE } from "@config";
import Stamp from "./components/Stamp";

export default (logoDataUrl?: string) => {
  return (
    <div
      style={{
        background: "#fefbfb",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1px",
          right: "-1px",
          border: "4px solid #000",
          background: "#ecebeb",
          opacity: "0.9",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2.5rem",
          width: "88%",
          height: "80%",
        }}
      />

      <div
        style={{
          border: "4px solid #000",
          background: "#fefbfb",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          width: "88%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "20px",
            width: "90%",
            height: "90%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "90%",
              maxHeight: "90%",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 72, fontWeight: "bold" }}>{SITE.title}</p>
            <p style={{ fontSize: 28 }}>{SITE.desc}</p>
            <Stamp />
          </div>

          <div style={{ position: "relative", width: "100%", marginBottom: 8 }}>
            {/* bottom-right small logo (replaces hostname / site title) */}
            {logoDataUrl && (
              <div
                style={{
                  width: 110,
                  height: 110,
                  position: "absolute",
                  right: 8,
                  bottom: 8,
                  backgroundImage: `url(${logoDataUrl})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
