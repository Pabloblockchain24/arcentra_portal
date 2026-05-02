import React from "react";
import { vaciosData } from "./hooks/useVacios";
import VaciosTable from "./components/VaciosTable";

const Vacios = () => {
  const total = vaciosData.length;
  const vencidos = vaciosData.filter(v => v.diasRestantes < 0).length;
  const porVencer = vaciosData.filter(v => v.diasRestantes <= 2 && v.diasRestantes >= 0).length;

  return (
    <div className="vacios">
      <div className="vacios__header">
        <h2>Control de Vacíos</h2>
        <span className="vacios__subtitle">
          Seguimiento de devolución de contenedores
        </span>
      </div>

      <div className="vacios__kpis">
        <div className="vacios__kpi-card">
          <span>Total Vacíos</span>
          <strong>{total}</strong>
        </div>

        <div className="vacios__kpi-card vacios__kpi-card--warning">
          <span>Por vencer (≤2 días)</span>
          <strong>{porVencer}</strong>
        </div>

        <div className="vacios__kpi-card vacios__kpi-card--danger">
          <span>Vencidos</span>
          <strong>{vencidos}</strong>
        </div>
      </div>

      <VaciosTable data={vaciosData} />
    </div>
  );
};

export default Vacios;