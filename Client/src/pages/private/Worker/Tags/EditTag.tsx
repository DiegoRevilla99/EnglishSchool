import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import TagForm from "@/components/Forms/TagForm";

import { TagFilled } from "@/interfaces/Formik/ITag";
import TagSchema from "@/validation/schemas/TagSchema";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseEditModal } from "@/reducers/ModalReducer";
import { useUpdateTagMutation } from "@/slices/TagsSlice";

const EditTag = () => {
  const dispatch = useAppDispatch();
  const tag = useAppSelector((state) => state.tags.itemSelected);
  const { openEdit } = useAppSelector((state) => state.modal);
  const [updateTag, { isLoading }] = useUpdateTagMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: TagFilled(tag),
    validationSchema: TagSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateTag(values);
      resetForm();
      dispatch(handleCloseEditModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Editar tag"
      open={openEdit}
      closeFn={() => dispatch(handleCloseEditModal())}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <TagForm formik={formik} />
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

export default EditTag;
