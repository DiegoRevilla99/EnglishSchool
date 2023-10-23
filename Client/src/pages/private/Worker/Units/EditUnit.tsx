import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import CustomTextField from "@/components/Textfield/CustomTextField";

import { UnitFilled } from "@/interfaces/Formik/IUnit";
import UnitSchema from "@/validation/schemas/UnitSchema";
import { useUpdateUnitMutation } from "@/slices/UnitSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseEditModal } from "@/reducers/ModalReducer";

const EditUnit = () => {
  const dispatch = useAppDispatch();
  const unit = useAppSelector((state) => state.units.itemSelected);
  const { openEdit } = useAppSelector((state) => state.modal);
  const [updateUnit, { isLoading }] = useUpdateUnitMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: UnitFilled(unit),
    validationSchema: UnitSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateUnit(values);
      resetForm();
      dispatch(handleCloseEditModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Editar unidad"
      open={openEdit}
      closeFn={() => dispatch(handleCloseEditModal())}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <CustomTextField label="Nombre" formik={formik} field="name" />
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

export default EditUnit;
