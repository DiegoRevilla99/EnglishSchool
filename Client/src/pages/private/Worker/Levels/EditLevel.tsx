import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import LevelForm from "@/components/Forms/LevelForm";

import { LevelFilled } from "@/interfaces/Formik/ILevel";
import LevelSchema from "@/validation/schemas/LevelSchema";
import { useUpdateLevelMutation } from "@/slices/LevelSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseEditModal } from "@/reducers/ModalReducer";

const EditLevel = () => {
  const dispatch = useAppDispatch();
  const level = useAppSelector((state) => state.levels.itemSelected);
  const { openEdit } = useAppSelector((state) => state.modal);
  const [updateLevel, { isLoading }] = useUpdateLevelMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: LevelFilled(level),
    validationSchema: LevelSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateLevel(values);
      resetForm();
      dispatch(handleCloseEditModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Editar nivel"
      open={openEdit}
      closeFn={() => dispatch(handleCloseEditModal())}
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
            Actualizar
          </LoadingButton>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default EditLevel;
