import dayjs from "dayjs";

import { IDateProps } from "@/interfaces/ICustomField";

import { Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomDateField = ({
  sm = 12,
  hidden = false,
  required = true,
  autoFocus = false,
  ...props
}: IDateProps) => {
  return (
    <Grid item xs={12} sm={sm}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast={props.disablePast}
          disableFuture={props.disableFuture}
          sx={{ width: 1 }}
          label={props.label}
          format="DD/MM/YYYY"
          value={dayjs(props.formik.values[props.field])}
          onChange={(value) =>
            props.formik.setFieldValue(props.field, value?.toISOString().split("T")[0])
          }
          slotProps={{
            textField: {
              error: props.formik.touched[props.field] && Boolean(props.formik.errors[props.field]),
              helperText:
                props.formik.touched[props.field] && props.formik.errors[props.field] ? (
                  <>{props.formik.errors[props.field]}</>
                ) : null,
            },
          }}
        />
      </LocalizationProvider>
    </Grid>
  );
};

export default CustomDateField;
