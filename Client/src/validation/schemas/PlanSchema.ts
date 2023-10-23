import * as yup from "yup";

const PlanSchema = yup.object({
  name: yup.string().required("Nombre requerido"),
  description: yup.string().required("Descripción requerida"),
  price: yup
    .number()
    .min(1, "Escriba un precio válido")
    .max(99999, "Escriba un precio válido")
    .required("Precio requerido")
    .typeError("Escriba un precio válido"),
  paypalId: yup.string().required("Paypal Id requerido"),
});

export default PlanSchema;
