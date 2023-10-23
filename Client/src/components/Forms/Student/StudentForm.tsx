import { FormikForCrud } from "@/types/FormsType";

import {
  EmailOutlined,
  Face2Outlined,
  FaceOutlined,
  MapsHomeWorkOutlined,
} from "@mui/icons-material";

import CustomTextField from "../../Textfield/CustomTextField";
import PhoneField from "../../Textfield/PhoneField";
import CustomDateField from "../../Textfield/CustomDateField";
import LevelSelect from "@/components/Select/LevelSelect";

const StudentForm = ({ formik }: FormikForCrud) => {
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
      <CustomDateField
        label="Fecha de nacimiento"
        formik={formik}
        field="dateOfBirth"
      />
      <CustomTextField
        label="Direccón"
        icon={<MapsHomeWorkOutlined />}
        formik={formik}
        field="address"
        withIcon
      />
      <PhoneField formik={formik} />

      <CustomTextField
        label="Correo electrónico"
        icon={<EmailOutlined />}
        formik={formik}
        field="email"
        type="email"
        withIcon
      />

      <LevelSelect formik={formik} />
    </>
  );
};

export default StudentForm;
