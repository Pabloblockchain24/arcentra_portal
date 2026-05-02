import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useMemo } from "react";

export const exportToExcel = (datosFiltrados) => {
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
  
  const data = datosFiltrados.map((item) => ({
    Unidad: item.unidad,
    Producto: item.producto,
    "Almacén Destino": item.almacen,
    Nave: item.nave,
    "Depot Devolución Vacío": item.depot,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Programación");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, `Programación_transcurrin_${fechaManana}.xlsx`);
};
