import { INormalProps } from "@/interfaces/ICustomField";
import { Grid, InputAdornment, TextField } from "@mui/material";

const CustomTextField = ({
  sm = 12,
  hidden = false,
  required = true,
  withIcon = false,
  autoFocus = false,
  icon = <></>,
  type = "text",
  iconPosition = "start",
  ...props
}: INormalProps) => {
  return (
    <Grid item xs={12} sm={sm}>
      <TextField
        fullWidth
        type={type}
        hidden={hidden}
        required={required}
        autoFocus={autoFocus}
        id={props.field}
        name={props.field}
        label={props.label}
        onBlur={props.formik.handleBlur}
        onChange={props.formik.handleChange}
        value={props.formik.values[props.field]}
        error={
          props.formik.touched[props.field] &&
          Boolean(props.formik.errors[props.field])
        }
        helperText={
          props.formik.touched[props.field] &&
          props.formik.errors[props.field] ? (
            <>{props.formik.errors[props.field]}</>
          ) : null
        }
        InputProps={{
          ...(withIcon &&
            (iconPosition === "start"
              ? {
                  startAdornment: (
                    <InputAdornment position={iconPosition}>
                      {icon}
                    </InputAdornment>
                  ),
                }
              : {
                  endAdornment: (
                    <InputAdornment position={iconPosition}>
                      {icon}
                    </InputAdornment>
                  ),
                })),
        }}
      />
    </Grid>
  );
};

export default CustomTextField;
