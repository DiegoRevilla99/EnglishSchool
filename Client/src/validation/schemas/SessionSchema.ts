import * as yup from "yup";

const SessionSchema = yup.object({
  name: yup.string().required("Nombre requerido"),
  description: yup.string().required("Descripción requerida"),
});

export default SessionSchema;
