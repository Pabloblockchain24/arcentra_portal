import React from "react";

const KPIBox = ({ title, value, suffix, variation, meta }) => {
  const cumpleMeta = meta ? value >= meta : null;

  return (
    <div className="kpi-box">
      <div className="kpi-box__header">
        <span>{title}</span>
        {variation && (
          <span className={`kpi-box__variation ${variation > 0 ? "up" : "down"}`}>
            {variation > 0 ? "▲" : "▼"} {Math.abs(variation)}%
          </span>
        )}
      </div>

      <strong>{value}{suffix}</strong>

      {meta && (
        <div className="kpi-meta">
          Meta: {meta}%{" "}
          <span className={cumpleMeta ? "meta-ok" : "meta-bad"}>
            {cumpleMeta ? "✔" : "✖"}
          </span>
        </div>
      )}
    </div>
  );
};
export default KPIBox;