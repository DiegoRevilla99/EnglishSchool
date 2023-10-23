import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import RoleForm from "@/components/Forms/RoleForm";

import { RoleFilled, RoleInitial } from "@/interfaces/Formik/IRole";
import RoleSchema from "@/validation/schemas/RoleSchema";
import { useUpdateRoleMutation } from "@/slices/RoleSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseEditModal } from "@/reducers/ModalReducer";

const EditRole = () => {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.roles.itemSelected);
  const { openEdit } = useAppSelector((state) => state.modal);
  const [updateRole, { isLoading }] = useUpdateRoleMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: RoleFilled(role),
    validationSchema: RoleSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateRole(values);
      resetForm();
      dispatch(handleCloseEditModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Editar rol"
      open={openEdit}
      closeFn={() => dispatch(handleCloseEditModal())}
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
            Actualizar
          </LoadingButton>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default EditRole;
