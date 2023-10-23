import IFormikProps from "@/interfaces/IFormikProps";

import CustomTextField from "../Textfield/CustomTextField";
import NumberField from "../Textfield/NumberField";
import SwitchField from "../Textfield/SwitchField";

const PlanForm = ({ formik }: IFormikProps) => {
  return (
    <>
      <CustomTextField label="Nombre" formik={formik} field="name" />
      <CustomTextField
        label="Descripción"
        formik={formik}
        field="description"
      />
      <CustomTextField label="Paypal Id" formik={formik} field="paypalId" />
      <NumberField label="Precio" formik={formik} field="price" withIcon />
      <NumberField sm={6} label="Créditos" formik={formik} field="credits" />
      <SwitchField sm={6} label="Activo" formik={formik} field="status" />
    </>
  );
};

export default PlanForm;
