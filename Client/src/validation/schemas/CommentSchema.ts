import * as yup from "yup";

const CommentSchema = yup.object({
  content: yup.string().required("Contenido requerido"),
});

export default CommentSchema;
