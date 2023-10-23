import { useFormik } from "formik";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ModalContainer from "@/components/Modals";
import StudentForm from "@/components/Forms/Student/StudentForm";

import { StudentInitial } from "@/interfaces/Formik/IStudent";
import StudentSchema from "@/validation/schemas/StudentSchema";
import { useCreateStudentMutation } from "@/slices/StudentSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseCreateModal } from "@/reducers/ModalReducer";

const CreateStudent = () => {
  const dispatch = useAppDispatch();
  const { openCreate } = useAppSelector((state) => state.modal);
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const formik = useFormik({
    initialValues: StudentInitial,
    validationSchema: StudentSchema,
    onSubmit: async (values, { resetForm }) => {
      await createStudent(values);
      resetForm();
      dispatch(handleCloseCreateModal());
    },
  });

  return (
    <ModalContainer
      maxWidth="sm"
      title="Crear estudiante"
      open={openCreate}
      closeFn={() => dispatch(handleCloseCreateModal())}
    >
      <Box noValidate component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <StudentForm formik={formik} />
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

export default CreateStudent;
