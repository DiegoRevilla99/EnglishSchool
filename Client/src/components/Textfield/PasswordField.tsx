import { useState } from "react";
import { IPasswordProps } from "@/interfaces/ICustomField";

import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { KeyOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
  sm = 12,
  hidden = false,
  required = true,
  withIcon = false,
  autoFocus = false,
  iconPosition = "start",
  ...props
}: IPasswordProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Grid item xs={12} sm={sm}>
      <TextField
        fullWidth
        id="password"
        name="password"
        label={props.label}
        hidden={hidden}
        required={required}
        autoFocus={autoFocus}
        type={visible ? "text" : "password"}
        onBlur={props.formik.handleBlur}
        onChange={props.formik.handleChange}
        value={props.formik.values["password"]}
        error={
          props.formik.touched["password"] &&
          Boolean(props.formik.errors["password"])
        }
        helperText={
          props.formik.touched["password"] &&
          props.formik.errors["password"] ? (
            <>{props.formik.errors["password"]}</>
          ) : null
        }
        InputProps={{
          ...(withIcon &&
            iconPosition === "start" && {
              startAdornment: (
                <InputAdornment position={iconPosition}>
                  <KeyOutlined />
                </InputAdornment>
              ),
            }),
          endAdornment: (
            <InputAdornment position={iconPosition}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                {withIcon && iconPosition === "end" && <KeyOutlined />}
                <IconButton onClick={() => setVisible(!visible)} edge="end">
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </Box>
            </InputAdornment>
          ),
        }}
        // InputProps={{
        //   ...(withIcon &&
        //     (iconPosition === "start"
        //       ? {
        //           startAdornment: (
        //             <InputAdornment position={iconPosition}>
        //               <KeyOutlined />
        //             </InputAdornment>
        //           ),
        //         }
        //       : {
        //           endAdornment: (
        //             <InputAdornment position={iconPosition}>
        //               <IconButton
        //                 onClick={() => setVisible(!visible)}
        //                 edge="end"
        //               >
        //                 {visible ? <Visibility /> : <VisibilityOff />}
        //               </IconButton>
        //               <KeyOutlined />
        //             </InputAdornment>
        //           ),
        //         })),
        // }}
      />
    </Grid>
  );
};

export default PasswordField;
