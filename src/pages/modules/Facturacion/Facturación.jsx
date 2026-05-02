import { useMemo, useState, Fragment } from "react";
import { facturacionData } from "./hooks/useFacturacion";
import { formatClp } from "./utils/formatters";
import { groupByCarpeta } from "./utils/groupData";
import { exportFacturacionExcel } from "./exporters/exportExcel";
import { exportarFacturacionPDF } from "./exporters/exportPdf";

export default function Facturacion() {
  const IVA = 0.19;
  const data = facturacionData;
  const groupedData = useMemo(() => groupByCarpeta(data), [data]);

  const [selectedCarpetas, setSelectedCarpetas] = useState([]);

  const carpetas = Object.keys(groupedData);

  const toggleCarpeta = (carpeta) => {
    setSelectedCarpetas((prev) =>
      prev.includes(carpeta)
        ? prev.filter((c) => c !== carpeta)
        : [...prev, carpeta],
    );
  };

  const seleccionarTodas = () => {
    setSelectedCarpetas(carpetas);
  };

  const limpiarSeleccion = () => {
    setSelectedCarpetas([]);
  };

  const filteredData =
    selectedCarpetas.length > 0
      ? data.filter((item) => selectedCarpetas.includes(item.carpeta))
      : [];

  const totalGeneral = filteredData.reduce((acc, item) => acc + item.tarifa, 0);

  const totalConIva = totalGeneral * (1 + IVA);

  const isDisabled = selectedCarpetas.length === 0;

  return (
    <div className="facturacion-page">
      {/* DASHBOARD SUPERIOR */}


      <div className="header-actions">
        <h2>Facturación</h2>

        <div className="buttons">
          <div className="selection-actions">
            <button className="btn-outline" onClick={seleccionarTodas}>
              Seleccionar todas
            </button>

            <button className="btn-ghost" onClick={limpiarSeleccion}>
              Limpiar
            </button>
          </div>

          <div className="export-actions">
            <button
              className="btn-excel"
              onClick={() => exportFacturacionExcel(filteredData)}
              disabled={isDisabled}
            >
              Exportar Excel Seleccionados
            </button>

            <button
              className="btn-pdf"
              onClick={() => exportarFacturacionPDF(filteredData)}
              disabled={isDisabled}
            >
              Generar Proforma
            </button>
          </div>
        </div>

        
      </div>

            <div className="dashboard">
        <div className="card carpetas-card">
          <span>Carpetas seleccionadas</span>

          {selectedCarpetas.length === 0 ? (
            <p className="empty">Ninguna seleccionada</p>
          ) : (
            <div className="badges">
              {selectedCarpetas.map((carpeta) => (
                <div key={carpeta} className="badge">
                  {carpeta}
                  <button onClick={() => toggleCarpeta(carpeta)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <span>Total seleccionado</span>
          <h3>{formatClp(totalGeneral)}</h3>
        </div>

        <div className="card highlight">
          <span>Total + IVA</span>
          <h3>{formatClp(totalConIva)}</h3>
        </div>
      </div>

      <div className="tablaf-wrapper">
        <table className="facturacion-table">
          <thead>
            <tr>
              <th>Carpeta</th>
              <th>Unidad</th>
              <th>Nave</th>
              <th>Operación</th>
              <th>Lugar Dev</th>
              <th>Retiro</th>
              <th>Entrega</th>
              <th>Devolución</th>
              <th>Tarifa</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(groupedData).map(([carpeta, items]) => {
              const totalCarpeta = items.reduce(
                (acc, item) => acc + item.tarifa,
                0,
              );

              const isSelected = selectedCarpetas.includes(carpeta);

              return (
                <Fragment key={carpeta}>
                  {items.map((row, index) => (
                    <tr key={carpeta + index}>
                      <td>{row.carpeta}</td>
                      <td>{row.unidad}</td>
                      <td>{row.nave}</td>
                      <td>{row.operacion}</td>
                      <td>{row.lugarDev}</td>
                      <td>{row.retiro}</td>
                      <td>{row.entrega}</td>
                      <td>{row.devolucion}</td>
                      <td className="money">{formatClp(row.tarifa)}</td>
                    </tr>
                  ))}

                  <tr className={`subtotal ${isSelected ? "selected" : ""}`}>
                    <td colSpan="8" className="subtotal-label">
                      <div className="subtotal-content">

                        <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleCarpeta(carpeta)}
                          />
                          <span className="checkmark"></span>
                        </label>
                                                <span>Total {carpeta}</span>

                      </div>
                    </td>

                    <td className="money">{formatClp(totalCarpeta)}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
