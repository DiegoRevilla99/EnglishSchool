import * as yup from "yup";

import { PHONE_REG_EXP } from "@/utils";

const TeacherSchema = yup.object({
  firstName: yup.string().required("Escribe el nombre"),
  lastName: yup.string().required("Escribe el apellido"),
  dateOfBirth: yup.string().required("Selecciona el fecha de nacimiento"),
  phone: yup
    .string()
    .matches(PHONE_REG_EXP, "Escribe un teléfono válido")
    .required("Escribe el teléfono"),
  address: yup.string().required("Escribe el dirección"),
  email: yup
    .string()
    .email("Escribe un correo válido")
    .required("Escribe el correo"),
  levels: yup
    .array()
    .min(1, "Por lo menos un nivel es requerido")
    .required("Por lo menos un nivel es requerido"),
  license: yup
    .string()
    .min(8, "La licencia consta de 8 caracteres")
    .max(8, "La licencia consta de 8 caracteres")
    .required("Cédula profesional requerida"),
});

export default TeacherSchema;
