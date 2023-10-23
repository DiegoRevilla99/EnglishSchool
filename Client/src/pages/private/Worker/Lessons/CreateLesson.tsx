import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import { Box, Grid, Tab, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";

import ReturnButton from "@/components/Buttons/ReturnButton";
import LessonMaterial from "@/components/Forms/Lesson/LessonMaterial";
import LessonForm from "@/components/Forms/Lesson/LessonForm";

import { LessonInitial } from "@/interfaces/Formik/ILesson";
import LessonSchema from "@/validation/schemas/LessonSchema";
import { useCreateLessonMutation } from "@/slices/LessonSlice";

import { useAppSelector } from "@/hooks/useRedux";

import { BLACK_BUTTON_STYLE } from "@/utils/theme";

const CreateLesson = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("estudiante");
  const [createLesson, { isLoading }] = useCreateLessonMutation();
  const unit = useAppSelector((state) => state.units.itemSelected);

  const formik = useFormik({
    initialValues: LessonInitial,
    validationSchema: LessonSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.teacherNotes.replaceAll(" ", "").length === 0) {
        values.teacherNotes = "N/A";
      }

      if (values.studentNotes.replaceAll(" ", "").length === 0) {
        values.studentNotes = "N/A";
      }

      values.unit = unit.id;
      await createLesson(values);

      resetForm();
      values.teacherNotes = "";
      values.studentNotes = "";
      navigate(-1);
    },
  });

  return (
    <Box noValidate component="form" onSubmit={formik.handleSubmit} padding={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} lg={9}>
          <Typography variant="h4">Editar lecci&oacute;n</Typography>
        </Grid>
        <Grid item xs={12} sm={2} lg={1}>
          <ReturnButton />
        </Grid>
        <Grid item xs={12} sm={3} lg={2}>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={BLACK_BUTTON_STYLE}
            disabled={
              !(formik.isValid && Object.keys(formik.touched).length > 0)
            }
          >
            <AddOutlined />
            Crear
          </LoadingButton>
        </Grid>
      </Grid>
      <Grid container spacing={4} paddingTop={3}>
        <Grid item xs={12}>
          <LessonForm formik={formik} />
        </Grid>
        <Grid item xs={12} height="auto" minHeight="20rem">
          <Typography variant="h5" gutterBottom>
            Material de clase
          </Typography>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={(e, v) => setTab(v)}>
                <Tab label="Estudiante" value="estudiante" />
                <Tab label="Profesor" value="profesor" />
              </TabList>
            </Box>
            <TabPanel value="estudiante">
              <LessonMaterial type="student" formik={formik} />
            </TabPanel>
            <TabPanel value="profesor">
              <LessonMaterial type="teacher" formik={formik} />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateLesson;
