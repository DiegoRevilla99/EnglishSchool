import dayjs from "dayjs";

import * as yup from "yup";

const EventualitySchema = yup.object({
  date: yup
    .date()
    .min(dayjs().subtract(1, "day").toDate(), "Debe ser hoy o despúes")
    .required("Fecha requerida"),
  startHour: yup
    .string()
    .test(
      "is-lesser",
      "La hora de inicio debe ser antes de la hora de fin",
      function (value) {
        const { endHour } = this.parent;
        return dayjs(value).isBefore(dayjs(endHour));
      }
    )
    .required("Hora de inicio requerido"),
  endHour: yup
    .string()
    .test(
      "is-greater",
      "La hora de fin debe ser después de la hora de inicio",
      function (value) {
        const { startHour } = this.parent;
        return dayjs(value).isAfter(dayjs(startHour));
      }
    )
    .required("Hora de fin requerido"),
  type: yup
    .string()
    .test("not-selected", "Debes elegir una opción", function (value) {
      return value !== "Elegir uno";
    })
    .required("Tipo de eventualidad es requerido"),
});

export default EventualitySchema;
