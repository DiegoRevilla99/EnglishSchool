import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";

import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { SaveOutlined, TodayOutlined } from "@mui/icons-material";

import TeacherSchedule from "@/components/Forms/Teacher/TeacherSchedule";
import TeacherForm from "@/components/Forms/Teacher/TeacherForm";
import ReturnButton from "@/components/Buttons/ReturnButton";
import TeacherEventSchedule from "@/components/Forms/Teacher/TeacherEventSchedule";

import TeacherSchema from "@/validation/schemas/TeacherSchema";
import { useUpdateTeacherMutation } from "@/slices/TeacherSlice";

import { BLACK_BUTTON_STYLE } from "@/utils/theme";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleOpenCreateModal } from "@/reducers/ModalReducer";

import AddEventuality from "../../Teacher/Profile/AddEventuality";

const EditTeacher = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const teacher = useAppSelector((state) => state.teachers.itemSelected);
  const [updateTeacher, { isLoading }] = useUpdateTeacherMutation();

  const [tab, setTab] = useState("horario");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: teacher,
    validationSchema: TeacherSchema,
    onSubmit: async (values, { resetForm }) => {
      const inserted = await updateTeacher(values).unwrap();
      if (inserted) {
        resetForm();
        navigate("/profesores");
      }
    },
  });

  return (
    <Box noValidate component="form" onSubmit={formik.handleSubmit} padding={4}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={7}>
          <Typography variant="h4">Editar profesor</Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          <ReturnButton />
        </Grid>
        <Grid item xs={12} sm={2}>
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
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            color="info"
            sx={BLACK_BUTTON_STYLE}
            onClick={() => {
              dispatch(handleOpenCreateModal());
            }}
          >
            <TodayOutlined />
            Eventualidad
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4} paddingTop={3}>
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <TeacherForm formik={formik} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={7}>
          <TabContext value={tab}>
            <Box sx={{ borderColor: "divider" }}>
              <TabList onChange={(e, v) => setTab(v)} aria-label="teacherTabs">
                <Tab label="Horario" value="horario" />
                <Tab label="Agenda" value="agenda" />
              </TabList>
            </Box>
            <TabPanel value="horario" sx={{ height: "95%" }}>
              <TeacherSchedule formik={formik} />
            </TabPanel>
            <TabPanel value="agenda" sx={{ height: "95%" }}>
              <TeacherEventSchedule
                teacherId={formik.values.teacherId}
                eventualities={formik.values.eventualities}
              />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>

      <AddEventuality />
    </Box>
  );
};

export default EditTeacher;
