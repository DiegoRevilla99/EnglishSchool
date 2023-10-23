import CustomTextField from '@/components/Textfield/CustomTextField';
import PhoneField from '@/components/Textfield/PhoneField';
import IFormikProps from '@/interfaces/IFormikProps';
import {
  Face2Outlined,
  FaceOutlined,
  MapsHomeWorkOutlined,
} from '@mui/icons-material';

const EditUserForm = ({ formik }: IFormikProps) => {
  return (
    <>
      <CustomTextField
        label="Nombre(s)"
        icon={<FaceOutlined />}
        formik={formik}
        field="firstName"
        withIcon
      />
      <CustomTextField
        label="Apellido(s)"
        icon={<Face2Outlined />}
        formik={formik}
        field="lastName"
        withIcon
      />
      <CustomTextField
        label="Direccón"
        icon={<MapsHomeWorkOutlined />}
        formik={formik}
        field="address"
        withIcon
      />
      <PhoneField formik={formik} />
    </>
  );
};

export default EditUserForm;
