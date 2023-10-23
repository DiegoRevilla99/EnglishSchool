import * as yup from 'yup';

import { PHONE_REG_EXP } from '@/utils';

const UpdateUserSchema = yup.object({
  firstName: yup.string().required('Escribe el nombre'),
  lastName: yup.string().required('Escribe el apellido'),

  phone: yup
    .string()
    .matches(PHONE_REG_EXP, 'Escribe un teléfono válido')
    .required('Escribe tu teléfono'),
  address: yup.string().required('Escribe la dirección'),
});

export default UpdateUserSchema;
