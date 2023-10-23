import { Avatar, Box, Button, TextField } from "@mui/material";

import IFormikProps from "@/interfaces/IFormikProps";

import Auth from "@/models/Auth";
import { useFormik } from "formik";
import CommentSchema from "@/validation/schemas/CommentSchema";
import { useUpdateCommentMutation } from "@/slices/CommentSlice";
import { LoadingButton } from "@mui/lab";

interface Props {
  originalContent: string;
  currentUser: Auth | null;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: number;
  parentId: number;
  postId: string;
}

const EditCommentBox = ({
  originalContent,
  currentUser,
  setEditState,
  commentId,
  parentId,
  postId,
}: Props) => {
  const [updateComment, { isLoading }] = useUpdateCommentMutation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: originalContent,
      userId: currentUser?.id,
      parentId: parentId === commentId ? null : parentId,
      postId,
      id: commentId,
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { resetForm }) => {
      const inserted = await updateComment(values).unwrap();
      if (inserted) {
        resetForm();
        setEditState(false);
      }
    },
  });

  return (
    <>
      <Box>
        <TextField
          label="Edita tu comentario"
          variant="standard"
          fullWidth
          multiline
          value={formik.values.content}
          name="content"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={
            formik.touched.content && formik.errors.content ? <>{formik.errors.content}</> : null
          }
        />
      </Box>
      <Box display="flex" justifyContent="right" pt={3}>
        <Button
          variant="contained"
          size="small"
          onClick={() => setEditState(false)}
          sx={{
            backgroundColor: "#2c3d4f",
            border: `2px solid #2c3d4f`,
            transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
            "&:hover": {
              background: "transparent",
              boxShadow: 0,
              color: "#2c3d4f",
            },
          }}
        >
          Cancelar
        </Button>

        <LoadingButton
          size="small"
          type="submit"
          variant="contained"
          loading={isLoading}
          onClick={formik.submitForm}
          sx={{
            ml: 4,
            backgroundColor: "#61b3ea",
            border: `2px solid #61b3ea`,
            transition: "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
            "&:hover": {
              background: "transparent",
              boxShadow: 0,
              color: "#61b3ea",
            },
          }}
        >
          Guardar
        </LoadingButton>
      </Box>
    </>
  );
};

export default EditCommentBox;
