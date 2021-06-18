const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const DIAS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

module.exports = (value) => {
  const dateObject = new Date(value);
  return `${DIAS[dateObject.getUTCDay()]} ${dateObject.getUTCDate()} de ${
    MESES[dateObject.getUTCMonth()]
  }`;
};
