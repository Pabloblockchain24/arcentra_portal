  export const formatCLP = (value) => {
    if (!value) return "-";
    return value.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
  };
