import { INormalProps } from "@/interfaces/ICustomField";
import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";

const SwitchField = ({
  sm = 12,
  hidden = false,
  required = true,
  withIcon = false,
  autoFocus = false,
  type = "text",
  iconPosition = "start",
  ...props
}: Omit<INormalProps, "icon">) => {
  return (
    <Grid item xs={12} sm={sm}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              name={props.field}
              checked={props.formik.values[props.field]}
              onChange={(event) =>
                props.formik.setFieldValue(props.field, event.target.checked)
              }
            />
          }
          label={props.label}
        />
      </FormGroup>
    </Grid>
  );
};

export default SwitchField;
