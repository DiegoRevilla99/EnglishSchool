import * as yup from "yup";

const PostSchema = yup.object({
  title: yup.string().required("Título requerido"),
  body: yup.string().required("Contenido requerido"),
  mainImage: yup.string().required(),
});

export default PostSchema;
