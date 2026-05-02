export default function Loader({ size = 50, color = "#c79500" }) {
  return (
    <div className="loader-wrapper">
      <div
        className="loader"
        style={{
          width: size,
          height: size,
          borderTop: `6px solid ${color}`,
        }}
      ></div>
    </div>
  );
}