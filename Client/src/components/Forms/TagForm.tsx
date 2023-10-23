import IFormikProps from "@/interfaces/IFormikProps";

import CustomTextField from "../Textfield/CustomTextField";

const TagForm = ({ formik }: IFormikProps) => {
  return (
    <>
      <CustomTextField label="Nombre" formik={formik} field="name" />
    </>
  );
};

export default TagForm;
