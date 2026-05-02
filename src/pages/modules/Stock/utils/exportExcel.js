import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportStockExcel = (data) => {
  const formattedData = data.map((item) => ({
    Carpeta: item.carpeta,
    Nave: item.nave,
    Unidad: item.unidad,
    Producto: item.producto,
    Demurrage: item.demurrage,
    "Almacén Destino": item.almacen_destino,
    "Depot Devolución": item.depot,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Stock");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(blob, "stock_actual.xlsx");
};