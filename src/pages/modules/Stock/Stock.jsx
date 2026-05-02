import { useMemo, useState } from "react";
import { stockData } from "./hooks/useStock"; 
import { exportStockExcel } from "./utils/exportExcel";

const Stock = () => {
  const [stock, setStock] = useState(stockData);
  const [filtro, setFiltro] = useState("");

  // 📅 Fecha actual automática
  const fechaHoy = useMemo(() => {
    const hoy = new Date();
    return hoy.toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

   // 🔎 Filtro dinámico
  const datosFiltrados = useMemo(() => {
    return stock.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(filtro.toLowerCase())
    );
  }, [filtro, stock]);

  // 📊 Totales dinámicos
  const totales = useMemo(() => {
    return datosFiltrados.reduce(
      (acc, item) => {
        if (item.almacen_destino === "Full") acc.full += 1;
        if (item.almacen_destino === "Retail") acc.retail += 1;
        if (item.almacen_destino === "B2B") acc.b2b += 1;
        return acc;
      },
      { full: 0, retail: 0, b2b: 0 }
    );
  }, [datosFiltrados]);

 

  return (
    <div className="stock">
      <div className="stock__header">
        <div>
          <h2>Stock en depósito</h2>
          <span className="stock__date">{fechaHoy}</span>
        </div>

        <div className="stock__actions">
          <input
            type="text"
            placeholder="Filtrar..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="stock__filter"
          />

          <button onClick={() => exportStockExcel(datosFiltrados)} className="stock__export">
            Exportar a Excel
          </button>
        </div>
      </div>

      {/* Totales */}
<div className="stock__totales">
  <div className="stock__total-card stock__total-card--full">
    <span className="stock__total-label">Full</span>
    <span className="stock__total-value">{totales.full}</span>
  </div>

  <div className="stock__total-card stock__total-card--retail">
    <span className="stock__total-label">Retail</span>
    <span className="stock__total-value">{totales.retail}</span>
  </div>

  <div className="stock__total-card stock__total-card--b2b">
    <span className="stock__total-label">B2B</span>
    <span className="stock__total-value">{totales.b2b}</span>
  </div>
</div>

      <div className="stock__table-wrapper">
        <div className="stock__table-container">
          <table className="stock__table">
            <thead>
              <tr>
                <th>Carpeta</th>
                <th>Nave</th>
                <th>Unidad</th>
                <th>Producto</th>
                <th>Demurrage</th>
                <th>Almacén Destino</th>
                <th>Depot Devolución</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.length > 0 ? (
                datosFiltrados.map((item) => (
                  <tr key={item.id}>
                    <td>{item.carpeta}</td>
                    <td>{item.nave}</td>
                    <td>{item.unidad}</td>
                    <td>{item.producto}</td>
                    <td>{item.demurrage}</td>
                    <td>{item.almacen_destino}</td>
                    <td>{item.depot}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="stock__empty">
                    No hay resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stock;