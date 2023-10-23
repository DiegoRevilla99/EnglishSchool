import { Grid } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

import IFormikProps from "@/interfaces/IFormikProps";

const PhoneField = ({
  formik,
  sm = 12,
}: IFormikProps & {
  sm?: number;
}) => {
  return (
    <Grid item xs={12} sm={sm}>
      <MuiTelInput
        fullWidth
        label="Teléfono"
        variant="outlined"
        value={formik.values["phone"]}
        error={Boolean(formik.errors["phone"])}
        helperText={
          formik.errors["phone"] ? <>{formik.errors["phone"]}</> : null
        }
        onChange={(value) => {
          formik.setFieldValue("phone", value.toString());
        }}
      />
    </Grid>
  );
};

export default PhoneField;
