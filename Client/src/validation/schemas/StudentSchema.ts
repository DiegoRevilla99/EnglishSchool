import * as yup from "yup";

import { PHONE_REG_EXP } from "@/utils";

const StudentSchema = yup.object({
  firstName: yup.string().required("Escribe el nombre"),
  lastName: yup.string().required("Escribe el apellido"),
  dateOfBirth: yup.string().required("Selecciona el fecha de nacimiento"),
  phone: yup
    .string()
    .matches(PHONE_REG_EXP, "Escribe un teléfono válido")
    .required("Escribe el teléfono"),
  address: yup.string().required("Escribe la dirección"),
  email: yup
    .string()
    .email("Escribe un correo válido")
    .required("Escribe el correo"),
});

export default StudentSchema;
