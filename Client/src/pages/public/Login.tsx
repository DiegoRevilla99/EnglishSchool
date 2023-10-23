import { useFormik } from "formik";

import { Avatar, Grid, Box, Typography } from "@mui/material";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { useLoginMutation } from "@/slices/AuthSlice";
import { LoginInitial } from "@/interfaces/ILogin";
import LoginSchema from "@/validation/schemas/LoginSchema";
import LoginBanner from "@/assets/images/school/login-banner.jpg";

import CustomTextField from "@/components/Textfield/CustomTextField";
import PasswordField from "@/components/Textfield/PasswordField";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: LoginInitial,
    validationSchema: LoginSchema,
    validateOnBlur: false,
    onSubmit: async (values) => {
      await login(values).unwrap();
    },
  });

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        lg={6}
        sx={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${LoginBanner})`,
        }}
      />
      <Grid item xs={12} sm={12} md={5} lg={6}>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5" color="black">
            Iniciar sesi&oacute;n
          </Typography>
          <Box
            noValidate
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ padding: 3, maxWidth: 400 }}
          >
            <Grid container spacing={2}>
              <CustomTextField
                label="Correo electrónico"
                icon={<EmailOutlined />}
                formik={formik}
                field="email"
                type="email"
                autoFocus
                withIcon
              />
              <PasswordField label="Contraseña" formik={formik} withIcon />
            </Grid>

            <Box sx={{ width: 1, display: "flex" }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                sx={{ marginY: 3, marginX: "auto", width: 0.65 }}
              >
                Entrar
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
