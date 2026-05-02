import * as XLSX from "xlsx";
import { groupByCarpeta } from "../utils/groupData";
import { formatClp } from "../utils/formatters";

export const exportFacturacionExcel = (data) => {
  const grouped = groupByCarpeta(data);

  const rows = [];

  let totalGeneral = 0;
  let totalServicios = 0;

  Object.entries(grouped).forEach(([carpeta, servicios]) => {

    // 🔹 Título de carpeta
    rows.push([`CARPETA: ${carpeta}`]);

    // 🔹 Encabezados
    rows.push([
      "Unidad",
      "Nave",
      "Operación",
      "Lugar Devolución",
      "Retiro",
      "Entrega",
      "Devolución",
      "Tarifa"
    ]);

    let subtotal = 0;

    servicios.forEach((s) => {
      rows.push([
        s.unidad,
        s.nave,
        s.operacion,
        s.lugarDev,
        s.retiro,
        s.entrega,
        s.devolucion,
        formatClp(s.tarifa),
      ]);

      subtotal += s.tarifa;
      totalServicios++;
    });

    // 🔹 Subtotal carpeta
    rows.push([
      "",
      "",
      "",
      "",
      "",
      "",
      "SUBTOTAL",
      formatClp(subtotal)
    ]);

    rows.push([]); // espacio visual

    totalGeneral += subtotal;
  });

  // 🔹 Resumen final
  rows.push([]);
  rows.push(["RESUMEN"]);
  rows.push(["Cantidad de servicios", totalServicios]);
  rows.push(["Total general", formatClp(totalGeneral)]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Facturación");
  const hoy = new Date();
const fechaFormateada = hoy.toLocaleDateString("es-CL").replace(/\//g, "-");

const nombreArchivo = `Facturación Transcurrin ${fechaFormateada}.xlsx`;
  XLSX.writeFile(workbook, nombreArchivo);
};