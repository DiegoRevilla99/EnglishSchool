import * as yup from "yup";

const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Escribe un correo válido")
    .required("Ingresa tu correo"),
  password: yup.string().required("Escribe tu contraseña"),
});

export default LoginSchema;
