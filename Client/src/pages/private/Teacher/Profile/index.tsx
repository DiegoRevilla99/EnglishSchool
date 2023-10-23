import("@/assets/css/profileCard.css");

import { useFormik } from "formik";

import { Box, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleOpenEditModal } from "@/reducers/ModalReducer";

import EditProfileTeacher from "./EditProfileTeacher";

import HeroBannerForTables from "@/components/Template/Header/HeroBannerForTables";
import TeacherSchedule from "@/components/Forms/Teacher/TeacherSchedule";

import ImageBanner from "@/assets/images/hero/profile.jpg";
import Logo from "@/assets/images/logo.png";

import { BLACK_BUTTON_STYLE } from "@/utils/theme";

import { useUpdateScheduleMutation } from "@/slices/TeacherSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [updateSchedule, { isLoading }] = useUpdateScheduleMutation();

  const handleEdit = () => {
    dispatch(handleOpenEditModal());
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      schedule: currentUser?.schedule || [],
      eventualities: currentUser?.eventualities || [],
    },
    onSubmit: async (values) => {
      await updateSchedule({
        teacherId: currentUser?.teacherId ?? "",
        schedule: values.schedule,
      });
    },
  });

  return (
    <div>
      <HeroBannerForTables
        title="Mi perfil"
        image={ImageBanner}
        imagePosition="bottom"
      />
      <Grid container spacing={4} padding={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Informaci&oacute;n general
          </Typography>
          <main id="main" className="output">
            <div className="ac-card">
              <div
                className="ac-card-image"
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`,
                }}
              />
              <div className="ac-card-info">
                <p>
                  <strong>Nombre: </strong>
                  <span>{` ${currentUser?.firstName}`}</span>
                  <br />
                  <strong>Apellido: </strong>
                  <span>{` ${currentUser?.lastName}`}</span>
                  <br />
                  <strong>Correo: </strong>
                  <span>{` ${currentUser?.email}`}</span>
                  <br />
                  <strong>Tel&eacute;fono: </strong>
                  <span>{` ${currentUser?.phone}`}</span>
                  <br />
                  <strong>Fecha de nacimiento: </strong>
                  <span>{` ${currentUser?.dateOfBirth}`}</span>
                  <br />
                  <strong>Niveles: </strong>
                  <span>{` ${currentUser?.level}`}</span>
                </p>
              </div>
              <img
                className="ac-icon"
                onClick={() => handleEdit()}
                style={{ cursor: "pointer" }}
                src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-editor-pen-pencil-write-icon--4.png"
              />
              <div className="ac-card-footer">
                <img className="ac-logo" src={Logo} />
              </div>
            </div>
          </main>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="h4">Horario</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <LoadingButton
                fullWidth
                loading={isLoading}
                variant="contained"
                sx={BLACK_BUTTON_STYLE}
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Actualizar
              </LoadingButton>
            </Grid>
          </Grid>
          <Box
            sx={{ border: "1px solid #ffffff" }}
            bgcolor="#ffffff"
            borderRadius="3px"
            height="30rem"
            mt="1rem"
          >
            <TeacherSchedule formik={formik} />
          </Box>
        </Grid>
      </Grid>

      <EditProfileTeacher />
    </div>
  );
};

export default Profile;
