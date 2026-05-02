import { useMemo, useState } from "react";
import { programacionData } from "./hooks/useProgramacion";
import { exportToExcel } from "./exporters/exportExcel";

const Programacion = () => {

  const [programaciones, setProgramaciones] = useState(programacionData);
  const [filtro, setFiltro] = useState("");

  // 📅 Fecha automática mañana
  const fechaManana = useMemo(() => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    return hoy.toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  // 🔎 Filtro
  const datosFiltrados = useMemo(() => {
    return programaciones.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(filtro.toLowerCase()),
    );
  }, [filtro, programaciones]);

  return (
    <div className="programacion">
      <div className="programacion__header">
        <div>
          <h2>Programación</h2>
          <span className="programacion__date">{fechaManana}</span>
        </div>

        <div className="programacion__actions">
          <input
            type="text"
            placeholder="Filtrar..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="programacion__filter"
          />

          <button onClick={() => exportToExcel(datosFiltrados)} className="programacion__export">
            Exportar Programación
          </button>
        </div>
      </div>

      <div className="programacion__table-wrapper">
        <div className="programacion__table-container">
          <table className="programacion__table">
            <thead>
              <tr>
                <th>Unidad</th>
                <th>Producto</th>
                <th>Almacén Destino</th>
                <th>Nave</th>
                <th>Depot Devolución Vacío</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.length > 0 ? (
                datosFiltrados.map((item) => (
                  <tr key={item.id}>
                    <td>{item.unidad}</td>
                    <td>{item.producto}</td>
                    <td>{item.almacen}</td>
                    <td>{item.nave}</td>
                    <td>{item.depot}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="programacion__empty">
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

export default Programacion;
