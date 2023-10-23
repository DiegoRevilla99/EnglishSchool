import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import SessionForm from "@/components/Forms/Session/SessionForm";

import { SessionFilled, SessionInitial } from "@/interfaces/Formik/ISession";
import SessionSchema from "@/validation/schemas/SessionSchema";
import { useUpdateSessionMutation } from "@/slices/SessionSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseEditModal } from "@/reducers/ModalReducer";

const EditSession = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.sessions.itemSelected);
  const { openEdit } = useAppSelector((state) => state.modal);
  const [updateSession, { isLoading }] = useUpdateSessionMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: SessionFilled(session),
    validationSchema: SessionSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateSession(values);
      resetForm();
      dispatch(handleCloseEditModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Reagendar sesión"
      open={openEdit}
      closeFn={() => dispatch(handleCloseEditModal())}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <SessionForm formik={formik} />
        </Grid>

        <Box sx={{ width: 1, display: "flex" }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={{ marginTop: 3, marginX: "auto", width: 0.65 }}
          >
            Actualizar
          </LoadingButton>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default EditSession;
