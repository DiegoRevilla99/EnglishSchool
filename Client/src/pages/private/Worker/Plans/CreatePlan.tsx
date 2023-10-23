import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import PlanForm from "@/components/Forms/PlanForm";

import { PlanInitial } from "@/interfaces/Formik/IPlan";
import PlanSchema from "@/validation/schemas/PlanSchema";
import { useCreatePlanMutation } from "@/slices/PlanSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseCreateModal } from "@/reducers/ModalReducer";

const CreatePlan = () => {
  const dispatch = useAppDispatch();
  const { openCreate } = useAppSelector((state) => state.modal);
  const [createPlan, { isLoading }] = useCreatePlanMutation();

  const formik = useFormik({
    initialValues: PlanInitial,
    validationSchema: PlanSchema,
    onSubmit: async (values, { resetForm }) => {
      await createPlan(values);
      resetForm();
      dispatch(handleCloseCreateModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Crear plan"
      open={openCreate}
      closeFn={() => dispatch(handleCloseCreateModal())}
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
            Crear
          </LoadingButton>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default CreatePlan;
