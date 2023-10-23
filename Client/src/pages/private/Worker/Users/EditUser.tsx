import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import UserForm from "@/components/Forms/User/UserForm";

import UserSchema from "@/validation/schemas/UserSchema";
import { useUpdateUserMutation } from "@/slices/UserSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseEditModal } from "@/reducers/ModalReducer";

const EditUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.itemSelected);
  const { openEdit } = useAppSelector((state) => state.modal);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: user,
    validationSchema: UserSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateUser(values);
      resetForm();
      dispatch(handleCloseEditModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Editar usuario"
      open={openEdit}
      closeFn={() => dispatch(handleCloseEditModal())}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <UserForm formik={formik} isCreating={false} />
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

export default EditUser;
