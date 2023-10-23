import IFormikProps from "@/interfaces/IFormikProps";

import {
  EmailOutlined,
  Face2Outlined,
  FaceOutlined,
  MapsHomeWorkOutlined,
  RecentActorsOutlined,
} from "@mui/icons-material";

import CustomTextField from "../../Textfield/CustomTextField";
import CustomDateField from "../../Textfield/CustomDateField";
import PhoneField from "../../Textfield/PhoneField";
import LevelMultiSelect from "@/components/Select/LevelMultiSelect";

const TeacherForm = ({ formik }: IFormikProps) => {
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

      <CustomTextField
        label="Licencia"
        icon={<RecentActorsOutlined />}
        formik={formik}
        field="license"
        withIcon
      />
      <LevelMultiSelect label="Niveles" formik={formik} field="levels" />
    </>
  );
};

export default TeacherForm;
