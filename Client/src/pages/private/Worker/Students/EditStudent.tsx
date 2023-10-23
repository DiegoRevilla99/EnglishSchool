import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import { Box, Grid, Tab, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";

import StudentForm from "@/components/Forms/Student/StudentForm";

import StudentSchema from "@/validation/schemas/StudentSchema";
import { useUpdateStudentMutation } from "@/slices/StudentSlice";

import { BLACK_BUTTON_STYLE } from "@/utils/theme";

import { useAppSelector } from "@/hooks/useRedux";

import StudentEventSchedule from "@/components/Forms/Student/StudentEventSchedule";
import ReturnButton from "@/components/Buttons/ReturnButton";
import StudentTimeline from "./StudentTimeline";
import StudentSubs from "./StudentSubs";

const EditStudent = () => {
  const navigate = useNavigate();
  const student = useAppSelector((state) => state.students.itemSelected);
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();

  const [tab, setTab] = useState("perfil");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: student,
    validationSchema: StudentSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateStudent(values);
      resetForm();
      navigate("/estudiantes");
    },
  });

  return (
    <Box noValidate component="form" onSubmit={formik.handleSubmit} padding={2}>
      <Box sx={{ width: 1, height: "100%", padding: 2 }}>
        <TabContext value={tab}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} md={8} lg={9}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={(e, v) => setTab(v)}
                  aria-label="videoSession"
                >
                  <Tab label="Perfil" value="perfil" />
                  <Tab label="Resumen" value="resumen" />
                </TabList>
              </Box>
            </Grid>
            <Grid item xs={3} sm={2} md={1} lg={1}>
              <ReturnButton />
            </Grid>
            <Grid item xs={9} sm={3} md={3} lg={2}>
              <LoadingButton
                fullWidth
                type="submit"
                sx={BLACK_BUTTON_STYLE}
                variant="contained"
                loading={isLoading}
              >
                <SaveOutlined /> Guardar
              </LoadingButton>
            </Grid>
          </Grid>
          <TabPanel value="perfil">
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Typography variant="h4" gutterBottom>
                  Información
                </Typography>
                <Grid container spacing={2}>
                  <StudentForm formik={formik} isCreating={false} />
                </Grid>
              </Grid>
              <Grid item xs={12} md={7}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                      Agenda
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ height: "64vh" }}>
                    <StudentEventSchedule />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <StudentSubs studentId={student.studentId} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="resumen">
            <StudentTimeline />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default EditStudent;
