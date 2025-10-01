export default () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100px",
        height: "100px",
      }}
    >
      <img
        src="/peachfuzzz_logo_nobg.png"
        width={100}
        height={100}
        style={{
          objectFit: "contain",
        }}
        alt="Steff 'n Stuff"
      />
    </div>
  );
};