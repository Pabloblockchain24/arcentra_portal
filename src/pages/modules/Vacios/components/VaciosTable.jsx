import React from "react";

const VaciosTable = ({ data }) => {

  const getEstadoClass = (dias) => {
    if (dias < 3) return "danger";
    if (dias <= 4) return "warning";
    return "success";
  };

  return (
    <div className="vacios__table-wrapper">
      <table className="vacios__table">
        <thead>
          <tr>
            <th>Carpeta</th>
            <th>Unidad</th>
            <th>Depot Dev</th>
            <th>Demurrage</th>
            <th>Fecha Entrega</th>
            <th>Días para devolver</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.carpeta}</td>
              <td>{item.unidad}</td>
              <td>{item.lugarDev}</td>
              <td>{item.demurrage}</td>
              <td>{item.fechaEntrega}</td>
              <td>
                <span className={`vacios__badge vacios__badge--${getEstadoClass(item.diasRestantes)}`}>
                  {item.diasRestantes} días
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaciosTable;