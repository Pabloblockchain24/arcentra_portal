import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { groupByCarpeta } from "../utils/groupData";
import { formatClp } from "../utils/formatters";

 export const exportarFacturacionPDF  = (data) => {

    const grouped = groupByCarpeta(data);
  const totalGeneral = data.reduce((acc, item) => acc + item.tarifa, 0);

    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString("es-CL");
    const numero = `574`;
    const IVA = 0.19;

    const subtotal = totalGeneral;
    const ivaMonto = subtotal * IVA;
    const totalFinal = subtotal + ivaMonto;

    const img = new Image();
    img.src = "/logoTranscurrin.png";

    img.onload = () => {
      // =========================
      // HEADER
      // =========================

      const maxWidth = 35; // ancho máximo permitido
      const imgWidth = img.width;
      const imgHeight = img.height;

      // calcular proporción
      const ratio = imgHeight / imgWidth;

      const finalWidth = maxWidth;
      const finalHeight = maxWidth * ratio;

      doc.addImage(img, "PNG", 14, 22, finalWidth, finalHeight);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(
        "LOGISTICA EN TRANSPORTES CLAUDIA ISABEL CURRIN CASTILLO EIRL",
        55,
        15,
        { maxWidth: 80 },
      );

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("R.U.T.: 77.241.873-6", 55, 24);
      doc.text("Direccion: AV. C ALESSANDRI N°2170 DPTO 102", 55, 29);
      doc.text(
        "Giro: Actividades de servicios vinculadas al transporte",
        55,
        35,
        { maxWidth: 80 },
      );
      doc.text("Email: parcepaiva@gmail.com", 55, 41);

      // =========================
      // CAJA PROFORMA
      // =========================

      doc.setDrawColor(253, 177, 0);
      doc.setLineWidth(1.1);
      doc.rect(145, 10, 50, 30);

      doc.setDrawColor(0, 0, 0);
      doc.setFontSize(9);
      doc.text("R.U.T.: 77.241.873-6", 154, 17);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("PROFORMA", 158, 26);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`N° ${numero}`, 164, 32);

      // =========================
      // FECHA
      // =========================

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Fecha Emision: ${fecha}`, 14, 52);

      doc.setLineWidth(0.2);
      doc.line(14, 56, 196, 56);

      // =========================
      // CLIENTE
      // =========================

      doc.setFont("helvetica", "bold");
      doc.text("SEÑOR(ES):", 14, 62);

      doc.setFont("helvetica", "normal");
      doc.text("CONSTRUMART S.A.", 35, 62);

      doc.setFont("helvetica", "bold");
      doc.text("R.U.T:", 14, 68);
      doc.setFont("helvetica", "normal");
      doc.text("96.511.460-2", 35, 68);

      doc.setFont("helvetica", "bold");
      doc.text("Dirección:", 14, 74);
      doc.setFont("helvetica", "normal");
      doc.text("PANAMERICANA NORTE 9275", 35, 74);

      doc.setFont("helvetica", "bold");
      doc.text("Ciudad:", 14, 80);
      doc.setFont("helvetica", "normal");
      doc.text("SANTIAGO", 35, 80);

      doc.setFont("helvetica", "bold");
      doc.text("Comuna:", 14, 86);
      doc.setFont("helvetica", "normal");
      doc.text("Quilicura", 35, 86);

      doc.setFont("helvetica", "bold");
      doc.text("Giro:", 14, 92);
      doc.setFont("helvetica", "normal");
      doc.text("VENTA AL POR MAYOR DE MATERIALES DE CONSTRUCCIÓN", 35, 92, {
        maxWidth: 95,
      });

      doc.setFont("helvetica", "bold");
      doc.text("Contacto:", 135, 62);
      doc.setFont("helvetica", "normal");
      doc.text("Yerko Caceres", 158, 62);

      doc.setFont("helvetica", "bold");
      doc.text("Cond. venta:", 135, 68);
      doc.setFont("helvetica", "normal");
      doc.text("Crédito", 158, 68);

      doc.setFont("helvetica", "bold");
      doc.text("Email:", 135, 74);
      doc.setFont("helvetica", "normal");
      doc.text("ycaceres@construmart.cl", 158, 74);

      doc.setFont("helvetica", "bold");
      doc.text("Telefono:", 135, 80);
      doc.setFont("helvetica", "normal");
      doc.text("983910235", 158, 80);

      doc.setLineWidth(0.2);
      doc.line(14, 97, 196, 97);

      // =========================
      // TABLA
      // =========================
      // =========================
      // TABLA CON SUBTOTALES
      // =========================

      // =========================
      // TABLA CON SUBTOTALES + RESUMEN
      // =========================

      const tableData = [];
      let totalServicios = 0;
      let totalGeneralTabla = 0;

      Object.entries(grouped).forEach(([carpeta, items]) => {
        let subtotal = 0;

        // Filas de detalle
        items.forEach((row) => {
          subtotal += row.tarifa;
          totalServicios++;

          tableData.push([
            row.carpeta,
            row.unidad,
            row.operacion,
            row.lugarDev,
            row.retiro,
            row.entrega,
            row.devolucion,
            formatClp(row.tarifa),
          ]);
        });

        totalGeneralTabla += subtotal;

        // Fila subtotal por carpeta
        tableData.push([
          {
            content: `Total ${carpeta}`,
            colSpan: 7,
            styles: {
              halign: "right",
              fontStyle: "bold",
              fillColor: [240, 240, 240],
            },
          },
          {
            content: formatClp(subtotal),
            styles: {
              halign: "right",
              fontStyle: "bold",
              fillColor: [240, 240, 240],
            },
          },
        ]);
      });

      // -----------------------------
      // FILA: CANTIDAD DE SERVICIOS
      // -----------------------------
      tableData.push([
        {
          content: `Cantidad de servicios`,
          colSpan: 7,
          styles: {
            halign: "right",
            fontStyle: "bold",
          },
        },
        {
          content: totalServicios.toString(),
          styles: {
            halign: "right",
            fontStyle: "bold",
          },
        },
      ]);

      // -----------------------------
      // FILA: TOTAL GENERAL
      // -----------------------------
      tableData.push([
        {
          content: `TOTAL`,
          colSpan: 7,
          styles: {
            halign: "right",
            fontStyle: "bold",
            fillColor: [253, 177, 0],
          },
        },
        {
          content: formatClp(totalGeneralTabla),
          styles: {
            halign: "right",
            fontStyle: "bold",
            fillColor: [253, 177, 0],
          },
        },
      ]);
      autoTable(doc, {
        startY: 102,
        head: [
          [
            "Carpeta",
            "Unidad",
            "Operación",
            "Lugar Dev.",
            "Retiro",
            "Entrega",
            "Devolución",
            "Tarifa",
          ],
        ],
        body: tableData,
        styles: { fontSize: 8 },
        headStyles: {
          fillColor: [220, 220, 220],
          textColor: 0,
        },
        columnStyles: {
          7: { halign: "right" },
        },
      });

      const finalY = doc.lastAutoTable.finalY;

      // =========================
      // TOTALES
      // =========================

      let boxTop = finalY + 10;

      if (boxTop + 40 > doc.internal.pageSize.height) {
        doc.addPage();
        boxTop = 20;
      }

      doc.setFontSize(7);
      doc.setLineWidth(0.2);

      doc.rect(140, boxTop, 55, 35);
      doc.rect(14, boxTop, 110, 35);

      doc.setFontSize(9);
      doc.text("Exento:", 145, boxTop + 8);
      doc.text("$ 0", 185, boxTop + 8, { align: "right" });

      doc.text("Afecto:", 145, boxTop + 14);
      doc.text(formatClp(subtotal), 185, boxTop + 14, { align: "right" });

      doc.text("IVA (19%):", 145, boxTop + 20);
      doc.text(formatClp(ivaMonto), 185, boxTop + 20, { align: "right" });

      doc.setFont("helvetica", "bold");
      doc.text("Total:", 145, boxTop + 26);
      doc.text(formatClp(totalFinal), 185, boxTop + 26, {
        align: "right",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);

      doc.text("DATOS PARA TRANSFERENCIA BANCARIA", 20, boxTop + 6);
      doc.text("Banco: Banco Santander Chile", 20, boxTop + 12);
      doc.text("Cuenta Corriente: xxxxxx", 20, boxTop + 17);
      doc.text("RUT: 77.241.873-6", 20, boxTop + 22);
      doc.text("Email: rogeliosalcedo@hotmail.cl", 20, boxTop + 27);

      doc.save(`Proforma_${numero}.pdf`);
    };
  };