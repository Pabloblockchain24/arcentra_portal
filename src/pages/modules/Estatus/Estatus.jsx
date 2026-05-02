import React from "react";
import { estatusData } from "./hooks/useEstatus";
import EstatusTable from "./components/EstatusTable";
import EstatusMap from "./components/EstatusMap";

const Estatus = () => {
  return (
    <div className="estatus">
      <div className="estatus__header">
        <h2>Estatus de Unidades</h2>
        <span className="estatus__subtitle">
          Seguimiento en tiempo real
        </span>
      </div>

      <div className="estatus__grid">
        <EstatusTable data={estatusData} />
        <EstatusMap data={estatusData} />
      </div>
    </div>
  );
};

export default Estatus;