export const groupByCarpeta = (data) => {
  const grouped = {};

  data.forEach((item) => {
    if (!grouped[item.carpeta]) {
      grouped[item.carpeta] = [];
    }
    grouped[item.carpeta].push(item);
  });

  return grouped;
};