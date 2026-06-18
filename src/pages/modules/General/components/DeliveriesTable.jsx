import { useGeneralData } from "../hooks/useGeneralData.jsx";

const DeliveriesTable = ({ data }) => {
  const { currentDate } = useGeneralData();

  return (
    <div className="table-card">
      <h4>Estatus {currentDate}</h4>
      <table>
        <thead>
          <tr>
            <th>Unidad</th>
            <th>Producto</th>
            <th>Chofer</th>
            <th>Patente</th>
            <th>Carga</th>
            <th>Descarga</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.unidad}</td>
              <td>{item.producto}</td>
              <td>{item.chofer}</td>
              <td>{item.patente}</td>
              <td>{item.carga}</td>
              <td>{item.descarga}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveriesTable;
