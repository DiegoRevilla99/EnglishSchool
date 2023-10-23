import * as yup from "yup";

const UnitSchema = yup.object({
  name: yup.string().required("Nombre requerido"),
});

export default UnitSchema;
