
export const formatearFecha = (fecha) => {
  if (!fecha) return "";
  return new Intl.DateTimeFormat("es-CL").format(new Date(fecha));
};

export const formatearMoneda = (valor) => {
  if (valor === null || valor === undefined) return "";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0
  }).format(valor);
};