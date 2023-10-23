import * as yup from "yup";

import { PHONE_REG_EXP } from "@/utils";

const UserSchema = yup.object({
  firstName: yup.string().required("Escribe el nombre"),
  lastName: yup.string().required("Escribe el apellido"),
  dateOfBirth: yup.string().required("Selecciona tu fecha de nacimiento"),
  phone: yup
    .string()
    .matches(PHONE_REG_EXP, "Escribe un teléfono válido")
    .required("Escribe tu teléfono"),
  address: yup.string().required("Escribe la dirección"),
  email: yup.string().email("Escribe un correo válido").required("Escribe el correo"),
  role: yup.string().required("El rol es requerido"),
});

export default UserSchema;
