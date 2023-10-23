import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import UserForm from "@/components/Forms/User/UserForm";

import { UserInitial } from "@/interfaces/Formik/IUser";
import UserSchema from "@/validation/schemas/UserSchema";
import { useCreateUserMutation } from "@/slices/UserSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseCreateModal } from "@/reducers/ModalReducer";

const CreateUser = () => {
  const dispatch = useAppDispatch();
  const { openCreate } = useAppSelector((state) => state.modal);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const formik = useFormik({
    initialValues: UserInitial,
    validationSchema: UserSchema,
    onSubmit: async (values, { resetForm }) => {
      await createUser(values);
      resetForm();
      dispatch(handleCloseCreateModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Crear usuario"
      open={openCreate}
      closeFn={() => dispatch(handleCloseCreateModal())}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <UserForm formik={formik} />
        </Grid>

        <Box sx={{ width: 1, display: "flex" }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={{ marginTop: 3, marginX: "auto", width: 0.65 }}
          >
            Crear
          </LoadingButton>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default CreateUser;
