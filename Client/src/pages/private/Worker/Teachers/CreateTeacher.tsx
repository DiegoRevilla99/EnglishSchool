import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AddOutlined } from "@mui/icons-material";

import TeacherSchedule from "@/components/Forms/Teacher/TeacherSchedule";
import TeacherForm from "@/components/Forms/Teacher/TeacherForm";
import ReturnButton from "@/components/Buttons/ReturnButton";

import { TeacherInitial } from "@/interfaces/Formik/ITeacher";
import TeacherSchema from "@/validation/schemas/TeacherSchema";
import { useCreateTeacherMutation } from "@/slices/TeacherSlice";

import { ISchedule } from "@/interfaces/ICalendar";

import { BLACK_BUTTON_STYLE } from "@/utils/theme";

const CreateTeacher = () => {
  const navigate = useNavigate();
  const [createTeacher, { isLoading }] = useCreateTeacherMutation();

  const formik = useFormik({
    initialValues: TeacherInitial,
    validationSchema: TeacherSchema,
    onSubmit: async (values, { resetForm, setFieldValue }) => {
      const inserted = await createTeacher(values).unwrap();
      if (inserted) {
        resetForm();
        navigate("/profesores");
        setFieldValue("schedule", new Array<ISchedule>());
      }
    },
  });

  return (
    <Box noValidate component="form" onSubmit={formik.handleSubmit} padding={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10}>
          <Typography variant="h4">Crear profesor</Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          <ReturnButton />
        </Grid>
        <Grid item xs={12} sm={1}>
          <LoadingButton
            fullWidth
            type="submit"
            sx={BLACK_BUTTON_STYLE}
            variant="contained"
            loading={isLoading}
            disabled={
              !(formik.isValid && Object.keys(formik.touched).length > 0)
            }
          >
            <AddOutlined /> Crear
          </LoadingButton>
        </Grid>
      </Grid>
      <Grid container spacing={4} paddingTop={3}>
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <TeacherForm formik={formik} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <TeacherSchedule formik={formik} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateTeacher;
