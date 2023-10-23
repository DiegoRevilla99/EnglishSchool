import * as yup from 'yup';

const LinkSchema = yup.object({
  link: yup
    .string()
    .url('El enlace no es válido')
    .required('Escribe el enlace'),
});

export default LinkSchema;
