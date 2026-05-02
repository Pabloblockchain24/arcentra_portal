// hooks/useGeneralData.js
import { useMemo } from "react";
import {
  FaShip,
  FaAnchor,
  FaTruck,
  FaExchangeAlt,
  FaChartLine,
  FaClock,
} from "react-icons/fa";
import {
  MdOutlineWarehouse,
  MdAutorenew,
  MdOutlineTimer,
} from "react-icons/md";

export const useGeneralData = () => {
  return useMemo(() => {
    const summaryMetrics = [
      { title: "Tránsito Marítimo", value: 15, icon: <FaShip /> },
      { title: "En Puerto", value: 10, icon: <FaAnchor /> },
      { title: "En Depósito", value: 5, icon: <MdOutlineWarehouse /> },
      { title: "Entregas Hoy", value: 2, icon: <FaTruck /> },
      { title: "Vacíos por Devolver", value: 15, icon: <MdAutorenew /> },
    ];

    const operativeMetrics = [
      {
        title: "OTIF",
        value: "96%",
        subtitle: "On Time In Full",
        icon: <FaChartLine />,
      },
      {
        title: "Lead Time Puerto",
        value: "2.4 días",
        subtitle: "Recalada → Retiro",
        icon: <FaClock />,
      },
      {
        title: "Lead Time Entrega",
        value: "1.2 días",
        subtitle: "Depósito → Cliente",
        icon: <MdOutlineTimer />,
      },
      {
        title: "Lead Time Devolución",
        value: "0.8 días",
        subtitle: "Vacío → Devolución",
        icon: <FaExchangeAlt />,
      },
    ];

    const entregasHoy = [
      {
        unidad: "TCLU 204215-2",
        producto: "40 - FULL",
        chofer: "Mario Gonzalez",
        patente: "VV7049",
        carga: "08:30",
        descarga: "12:15",
      },
      {
        unidad: "FSDU 114789-5",
        producto: "20 - CERÁMICA",
        chofer: "Fabian Gonzalez",
        patente: "RV6905",
        carga: "09:15",
        descarga: "13:45",
      },
    ];

    const currentMonth = new Date().toLocaleString("es-CL", {
      month: "long",
      year: "numeric",
    });

    return {
      summaryMetrics,
      operativeMetrics,
      entregasHoy,
      currentMonth,
    };
  }, []);
};