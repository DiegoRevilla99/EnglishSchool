import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import PlanForm from "@/components/Forms/PlanForm";

import { PlanFilled, PlanInitial } from "@/interfaces/Formik/IPlan";
import PlanSchema from "@/validation/schemas/PlanSchema";
import { useUpdatePlanMutation } from "@/slices/PlanSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseEditModal } from "@/reducers/ModalReducer";

const EditPlan = () => {
  const dispatch = useAppDispatch();
  const plane = useAppSelector((state) => state.plans.itemSelected);
  const { openEdit } = useAppSelector((state) => state.modal);
  const [updatePlan, { isLoading }] = useUpdatePlanMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: PlanFilled(plane),
    validationSchema: PlanSchema,
    onSubmit: async (values, { resetForm }) => {
      await updatePlan(values);
      resetForm();
      dispatch(handleCloseEditModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Editar plan"
      open={openEdit}
      closeFn={() => dispatch(handleCloseEditModal())}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <PlanForm formik={formik} />
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

export default EditPlan;
