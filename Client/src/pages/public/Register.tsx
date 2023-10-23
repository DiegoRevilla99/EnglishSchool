import { useFormik } from "formik";

import { Avatar, Grid, Box, Typography } from "@mui/material";
import { PersonAddOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { UserInitial } from "@/interfaces/Formik/IUser";
import StudentSchema from "@/validation/schemas/StudentSchema";

import { useSignUpMutation } from "@/slices/AuthSlice";

import RegisterBanner from "@/assets/images/school/register-banner.jpg";
import RegisterForm from "@/components/Forms/RegisterForm";

const Register = () => {
  const [register, { isLoading }] = useSignUpMutation();

  const formik = useFormik({
    initialValues: UserInitial,
    validationSchema: StudentSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  return (
    <Grid container sx={{ height: "100vh" }}>
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
            <PersonAddOutlined />
          </Avatar>
          <Typography component="h1" variant="h5" color="black">
            Registrarse
          </Typography>
          <Box
            noValidate
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ padding: 3, maxWidth: 400 }}
          >
            <Grid container spacing={2}>
              <RegisterForm formik={formik} isCreating />
            </Grid>

            <Box sx={{ width: 1, display: "flex" }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                sx={{ marginY: 3, marginX: "auto", width: 0.65 }}
              >
                Inscribirse
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        lg={6}
        sx={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${RegisterBanner})`,
        }}
      />
    </Grid>
  );
};

export default Register;
