import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import RoleForm from "@/components/Forms/RoleForm";

import { RoleInitial } from "@/interfaces/Formik/IRole";
import RoleSchema from "@/validation/schemas/RoleSchema";
import { useCreateRoleMutation } from "@/slices/RoleSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseCreateModal } from "@/reducers/ModalReducer";

const CreateRole = () => {
  const dispatch = useAppDispatch();
  const { openCreate } = useAppSelector((state) => state.modal);
  const [createRole, { isLoading }] = useCreateRoleMutation();

  const formik = useFormik({
    initialValues: RoleInitial,
    validationSchema: RoleSchema,
    onSubmit: async (values, { resetForm }) => {
      await createRole(values);
      resetForm();
      dispatch(handleCloseCreateModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Crear rol"
      open={openCreate}
      closeFn={() => dispatch(handleCloseCreateModal())}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <RoleForm formik={formik} />
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

export default CreateRole;
