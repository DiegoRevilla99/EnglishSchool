import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import { Box, Grid, Tab, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";

import ReturnButton from "@/components/Buttons/ReturnButton";
import LessonMaterial from "@/components/Forms/Lesson/LessonMaterial";

import { LessonFilled } from "@/interfaces/Formik/ILesson";
import LessonSchema from "@/validation/schemas/LessonSchema";
import { useUpdateLessonMutation } from "@/slices/LessonSlice";

import { useAppSelector } from "@/hooks/useRedux";
import LessonForm from "@/components/Forms/Lesson/LessonForm";

import { BLACK_BUTTON_STYLE } from "@/utils/theme";

const EditLesson = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("estudiante");
  const [updateLesson, { isLoading }] = useUpdateLessonMutation();
  const lesson = useAppSelector((state) => state.lessons.itemSelected);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: LessonFilled(lesson),
    validationSchema: LessonSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.teacherNotes.replaceAll(" ", "").length === 0) {
        values.teacherNotes = "N/A";
      }

      if (values.studentNotes.replaceAll(" ", "").length === 0) {
        values.studentNotes = "N/A";
      }

      await updateLesson(values);
      resetForm();
      navigate(-1);
    },
  });

  return (
    <Box noValidate component="form" onSubmit={formik.handleSubmit} padding={4}>
      <Grid container spacing={1}>
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
            sx={BLACK_BUTTON_STYLE}
            loading={isLoading}
          >
            <SaveOutlined /> Guardar
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

export default EditLesson;
