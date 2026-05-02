import React from "react";

const EstatusTable = ({ data }) => {
  return (
    <div className="estatus__table-wrapper">
      <table className="estatus__table">
        <thead>
          <tr>
            <th>Unidad</th>
            <th>Producto</th>
            <th>Chofer</th>
            <th>Patente</th>
            <th>Hora Carguío</th>
            <th>Estimado Presentación</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.unidad}</td>
              <td>{item.producto}</td>
              <td>{item.chofer}</td>
              <td>{item.patente}</td>
              <td>{item.horaCarguio}</td>
              <td>{item.horaPresentacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstatusTable;