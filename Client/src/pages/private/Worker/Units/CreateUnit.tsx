import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import CustomTextField from "@/components/Textfield/CustomTextField";

import { UnitInitial } from "@/interfaces/Formik/IUnit";
import UnitSchema from "@/validation/schemas/UnitSchema";
import { useCreateUnitMutation } from "@/slices/UnitSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseCreateModal } from "@/reducers/ModalReducer";

const CreateUnit = () => {
  const dispatch = useAppDispatch();

  const { openCreate } = useAppSelector((state) => state.modal);
  const level = useAppSelector((state) => state.levels.itemSelected);
  const [createUnit, { isLoading }] = useCreateUnitMutation();

  const formik = useFormik({
    initialValues: UnitInitial,
    validationSchema: UnitSchema,
    onSubmit: async (values, { resetForm }) => {
      values.level = level.name;
      await createUnit(values);
      resetForm();
      dispatch(handleCloseCreateModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Agregar unidad"
      open={openCreate}
      closeFn={() => dispatch(handleCloseCreateModal())}
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
            Crear
          </LoadingButton>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default CreateUnit;
