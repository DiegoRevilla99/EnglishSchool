import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import LevelForm from "@/components/Forms/LevelForm";

import { LevelInitial } from "@/interfaces/Formik/ILevel";
import LevelSchema from "@/validation/schemas/LevelSchema";
import { useCreateLevelMutation } from "@/slices/LevelSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseCreateModal } from "@/reducers/ModalReducer";

const CreateLevel = () => {
  const dispatch = useAppDispatch();
  const { openCreate } = useAppSelector((state) => state.modal);
  const [createLevel, { isLoading }] = useCreateLevelMutation();

  const formik = useFormik({
    initialValues: LevelInitial,
    validationSchema: LevelSchema,
    onSubmit: async (values, { resetForm }) => {
      await createLevel(values);
      resetForm();
      dispatch(handleCloseCreateModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Crear nivel"
      open={openCreate}
      closeFn={() => dispatch(handleCloseCreateModal())}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <LevelForm formik={formik} />
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

export default CreateLevel;
