import { useFormik } from "formik";

import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";

import Auth from "@/models/Auth";

import ModalContainer from "@/components/Modals";
import EditUserForm from "@/components/Forms/User/EditUserForm";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseEditModal } from "@/reducers/ModalReducer";

import UpdateUserSchema from "@/validation/schemas/UpdateUserSchema";

import { useUpdateProfileMutation } from "@/slices/AuthSlice";

const EditProfileTeacher = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { openEdit } = useAppSelector((state) => state.modal);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: user || new Auth(),
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { resetForm }) => {
      const inserted = await updateProfile(values).unwrap();
      if (inserted) {
        resetForm();
        dispatch(handleCloseEditModal());
      }
    },
  });

  return (
    <ModalContainer
      maxWidth={"sm"}
      title="Editar perfil"
      open={openEdit}
      closeFn={() => {
        dispatch(handleCloseEditModal());
      }}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <EditUserForm formik={formik} />
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            flexDirection: "row",
            marginTop: 3,
          }}
        >
          <LoadingButton
            loading={isLoading}
            type="submit"
            color="warning"
            variant="contained"
          >
            Guardar
          </LoadingButton>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default EditProfileTeacher;
