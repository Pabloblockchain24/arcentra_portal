export default function Loader({ size = 50, color = "#115d8f" }) {
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