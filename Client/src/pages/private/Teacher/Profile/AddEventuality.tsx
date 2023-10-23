import dayjs from "dayjs";
import esMX from "dayjs/locale/es-mx";

import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { esES } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";

import { useAddEventualityMutation } from "@/slices/TeacherSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseCreateModal } from "@/reducers/ModalReducer";
import { addEventualityToTeacher } from "@/reducers/TeacherReducer";
import { addEventualityToSelf } from "@/reducers/AuthReducer";

import ModalContainer from "@/components/Modals";
import EventualityForm from "@/components/Forms/Teacher/EventualityForm";
import EventualitySchema from "@/validation/schemas/EventualitySchema";
import { successToast } from "@/utils";

export default function AddEventuality() {
  const dispatch = useAppDispatch();
  const { openCreate } = useAppSelector((state) => state.modal);
  const currentUser = useAppSelector((state) => state.auth.user);
  const teacherSelected = useAppSelector(
    (state) => state.teachers.itemSelected
  );

  const onClose = () => dispatch(handleCloseCreateModal());
  const [addEventuality, { isLoading }] = useAddEventualityMutation();

  const formik = useFormik({
    validationSchema: EventualitySchema,
    initialValues: {
      type: "Elegir uno",
      date: dayjs().toISOString(),
      startHour: dayjs().add(1, "minute").toISOString(),
      endHour: dayjs().add(1, "minute").add(1, "hour").toISOString(),
    },
    onSubmit: async (values) => {
      const teacherId = currentUser?.teacherId ?? teacherSelected.teacherId;
      const eventuality = {
        teacherId: teacherId,
        eventuality: { ...values },
      };

      const added = await addEventuality(eventuality).unwrap();

      if (added) {
        if (currentUser?.teacherId) {
          dispatch(addEventualityToSelf(eventuality));
        } else {
          dispatch(addEventualityToTeacher(eventuality));
        }

        successToast("Eventualidad agregada");
        onClose();
      }
    },
  });

  return (
    <ModalContainer
      maxWidth="xs"
      open={openCreate}
      closeFn={onClose}
      title="Agendar incidente"
    >
      <LocalizationProvider
        adapterLocale={esMX}
        dateAdapter={AdapterDayjs}
        localeText={
          esES.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <Box noValidate component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <EventualityForm formik={formik} />
          </Grid>

          <Box sx={{ width: 1, display: "flex" }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{ marginTop: 3, marginX: "auto", width: 0.65 }}
            >
              Agregar
            </LoadingButton>
          </Box>
        </Box>
      </LocalizationProvider>
    </ModalContainer>
  );
}
