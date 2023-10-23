import * as yup from "yup";

const TagSchema = yup.object({
  name: yup.string().required("Nombre requerido"),
});

export default TagSchema;
