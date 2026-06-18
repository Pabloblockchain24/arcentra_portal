import { useGeneralData } from "./hooks/useGeneralData.jsx";
import SummaryCard from "./components/SummaryCard";
import OperativeMetricCard from "./components/OperativeMetricCard";
import DeliveriesTable from "./components/DeliveriesTable";
import MapPanel from "./components/MapPanel";

const General = () => {
  const {
    summaryMetrics,
    operativeMetrics,
    entregasHoy,
    currentDate,
  } = useGeneralData();

  return (
    <div className="general">

      <div className="general__header">
        <div>
          <h2>Resumen ejecutivo</h2>
          <span>Estado operaciones • {currentDate}</span>
        </div>
      </div>

      <div className="general__summary-grid">
        {summaryMetrics.map((item, i) => (
          <SummaryCard key={i} {...item} />
        ))}
      </div>

      <div className="general__operacion-grid">
        <MapPanel />
        <DeliveriesTable data={entregasHoy} />
      </div>

      <div className="general__operative-section">
        {operativeMetrics.map((item, i) => (
          <OperativeMetricCard key={i} {...item} />
        ))}
      </div>

    </div>
  );
};

export default General;