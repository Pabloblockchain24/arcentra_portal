 
 import * as XLSX from "xlsx";

 
 export const exportarExcel = (tarifaActual) => {
    const data = tarifaActual.data.map((row) => ({
      Item: row.item,
      "San Antonio": row.sanAntonio,
      Valparaiso: row.valparaiso,
      Santiago: row.santiago,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tarifas");

    XLSX.writeFile(workbook, `${tarifaActual.titulo}.xlsx`);
  };