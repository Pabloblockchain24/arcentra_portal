import { useState } from "react";
import { tarifasData } from "./hooks/useTarifas";
import { formatCLP } from "./utils/formatters";
import { exportarExcel } from "./exporters/exportarExcel";

export default function Tarifas() {
  const tarifas = tarifasData;
  const [servicio, setServicio] = useState("desconsolidado20par");
  const tarifaActual = tarifas[servicio];

  return (
    <div className="tarifas-page">
      <div className="tarifas-header">
        <h2>Tarifas </h2>
        <div className="controls">
          <select
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
          >
            <option value="desconsolidado20par">
              Desconsolidados 20" - Pares
            </option>
            <option value="desconsolidado20impar">
              Desconsolidados 20" - Impares
            </option>
            <option value="desconsolidado40tinas">
              Desconsolidados 40" - Tinas
            </option>
            <option value="full40">Full 20" y 40"</option>
          </select>
          <button onClick={() => exportarExcel(tarifaActual)}>
            Exportar Tarifas
          </button>
        </div>
      </div>

      <div className="tabla-wrapper">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>San Antonio</th>
              <th>Valparaíso</th>
              <th>Santiago</th>
            </tr>
          </thead>
          <tbody>
            {tarifaActual.data.map((row, index) => (
              <tr
                key={index}
                className={row.item === "Tarifa" ? "fila-total" : ""}
              >
                <td>{row.item}</td>
                <td>{formatCLP(row.sanAntonio)}</td>
                <td>{formatCLP(row.valparaiso)}</td>
                <td>{formatCLP(row.santiago)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
