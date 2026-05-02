const today = new Date();
today.setHours(0, 0, 0, 0);

const diffDays = (futureDate, currentDate) => {
  const diff = futureDate - currentDate;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const parseDateCL = (dateString) => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
};

const baseData = [
  {
    id: 1,
    carpeta: "6200002025",
    unidad: "UETU 403020-1",
    lugarDev: "CIS COLENGUAO",
    demurrage: "04-03-2026",
    fechaEntrega: "12-03-2026",
  },
  {
    id: 2,
    carpeta: "6200002025",
    unidad: "MSKU 851020-1",
    lugarDev: "CIS COLENGUAO",
    demurrage: "05-03-2026",
    fechaEntrega: "12-03-2026",
  },
  {
    id: 3,
    carpeta: "6200002025",
    unidad: "MSKU 222541-9",
    lugarDev: "CIS COLENGUAO",
    demurrage: "06-03-2026",
    fechaEntrega: "12-03-2026",
  },
  {
    id: 4,
    carpeta: "6200002025",
    unidad: "FCIU 748000-1",
    lugarDev: "CONTOPSA SAI",
    demurrage: "15-03-2026",
    fechaEntrega: "12-03-2026",
  },
];

export const vaciosData = baseData.map((item) => {
  const demurrageDate = parseDateCL(item.demurrage);
  const fechaEntregaDate = parseDateCL(item.fechaEntrega);

  const diasRestantes = diffDays(demurrageDate, today);

  return {
    ...item,
    fechaEntrega: fechaEntregaDate.toLocaleDateString("es-CL"),
    demurrage: demurrageDate.toLocaleDateString("es-CL"),
    diasRestantes,
  };
});