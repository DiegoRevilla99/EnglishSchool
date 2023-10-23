import IFormikProps from "@/interfaces/IFormikProps";

import CustomTextField from "../Textfield/CustomTextField";

const LevelForm = ({ formik }: IFormikProps) => {
  return (
    <>
      <CustomTextField label="Nombre" formik={formik} field="name" />
      <CustomTextField
        label="Descripción"
        formik={formik}
        field="description"
      />
    </>
  );
};

export default LevelForm;
