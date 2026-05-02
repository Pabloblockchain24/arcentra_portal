// Metrics.jsx
import React from "react";
import { useMetricas } from "./hooks/useMetricas";
import KPIBox from "./components/KPIBox";
import ServicesStackedChart from "./components/ServicesStackedChart";
import EntregasMesChart from "./components/EntregaMesChart";

const Metricas = () => {
  const {
    meses,
    mesSeleccionado,
    setMesSeleccionado,
    kpis,
    serviciosStacked,
    entregasMensuales,
  } = useMetricas();

  return (
    <div className="metrics">

      {/* 🔥 HEADER CORPORATIVO */}
      <div className="metrics__header">
        <div>
          <h2>Operational Intelligence</h2>
          <span>Executive Performance Dashboard</span>
        </div>

        {/* 👉 AQUÍ VA EL PUNTO 5 */}
        <select
          value={mesSeleccionado}
          onChange={(e) => setMesSeleccionado(e.target.value)}
          className="filter-select"
        >
          {meses.map((mes) => (
            <option key={mes} value={mes}>
              {mes}
            </option>
          ))}
        </select>
      </div>

      {/* KPIs */}
      <div className="metrics__kpi-grid">
        <KPIBox
          title="OTIF"
          value={kpis.otif}
          suffix="%"
          variation={kpis.otifVar}
          meta={kpis.metaOTIF}
        />
        <KPIBox title="Lead Time Puerto" value={kpis.leadTimePuerto} suffix=" días" />
        <KPIBox title="Lead Time Entrega" value={kpis.leadTimeEntrega} suffix=" días" />
        <KPIBox title="Permanencia Puerto" value={kpis.permanenciaPuerto} suffix=" días" />
        <KPIBox title="Devolución Vacíos" value={kpis.devolucionVacios} suffix=" días" />
      </div>

      {/* Charts */}
      <div className="metrics__charts-grid">
        <ServicesStackedChart data={serviciosStacked} />
        <EntregasMesChart data={entregasMensuales} />
      </div>

    </div>
  );
};

export default Metricas;