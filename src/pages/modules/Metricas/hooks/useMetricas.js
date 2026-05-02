// hooks/useMetricas.js
import { useMemo, useState } from "react";

export const useMetricas = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState("Feb");

  return useMemo(() => {
    const meses = ["Oct", "Nov", "Dic", "Ene", "Feb"];

    const historicoOTIF = {
      Oct: 91,
      Nov: 93,
      Dic: 95,
      Ene: 92,
      Feb: 94,
    };

    const mesIndex = meses.indexOf(mesSeleccionado);
    const mesAnterior = meses[mesIndex - 1];

    const otifActual = historicoOTIF[mesSeleccionado];
    const otifAnterior = historicoOTIF[mesAnterior] || otifActual;

    const otifVar = (
      ((otifActual - otifAnterior) / otifAnterior) *
      100
    ).toFixed(1);

    const serviciosStacked = [
      { dia: 1, FULL: 2, RETAIL: 1, B2B: 1 },
      { dia: 2, FULL: 3, RETAIL: 0, B2B: 2 },
      { dia: 3, FULL: 4, RETAIL: 1, B2B: 2 },
      { dia: 4, FULL: 1, RETAIL: 2, B2B: 1 },
      { dia: 5, FULL: 3, RETAIL: 1, B2B: 3 },
    ];

    const entregasMensuales = Array.from({ length: 30 }, (_, i) => ({
      dia: i + 1,
      entregas: Math.floor(Math.random() * 6) + 1,
    }));

    const kpis = {
      otif: otifActual,
      otifVar: Number(otifVar),
      metaOTIF: 95,
      leadTimePuerto: 2.3,
      leadTimeEntrega: 1.8,
      permanenciaPuerto: 4.1,
      devolucionVacios: 3.5,
    };

    return {
      meses,
      mesSeleccionado,
      setMesSeleccionado,
      kpis,
      serviciosStacked,
      entregasMensuales,
    };
  }, [mesSeleccionado]);
};