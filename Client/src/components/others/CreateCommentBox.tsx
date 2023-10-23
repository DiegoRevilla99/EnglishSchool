import { commentInitial } from "@/interfaces/IComment";
import Auth from "@/models/Auth";

import { useCreateCommentMutation } from "@/slices/CommentSlice";

import CommentSchema from "@/validation/schemas/CommentSchema";
import { LoadingButton } from "@mui/lab";

import { Box, Button, TextField } from "@mui/material";

import { useFormik } from "formik";

interface Props {
  currentUser: Auth | null;
  postId: string;
}

export const CreateCommentBox = ({ currentUser, postId }: Props) => {
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const formik = useFormik({
    initialValues: commentInitial,
    validationSchema: CommentSchema,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      const newComment = {
        parentId: null,
        userId: currentUser?.id,
        content: values.content,
        postId,
      };

      const inserted = await createComment(newComment).unwrap();
      if (inserted) {
        resetForm();
      }
    },
  });
  return (
    <div className="comment-form-container mb-5">
      <h3 className="title">Deja un comentario</h3>
      <form id="comment-form" className="comment-form form" method="post" action="#">
        <div className="row g-3">
          <div className="col-12">
            <TextField
              label="Escribe tu comentario"
              variant="standard"
              fullWidth
              multiline
              value={formik.values.content}
              name="content"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={
                formik.touched.content && formik.errors.content ? (
                  <>{formik.errors.content}</>
                ) : null
              }
            />
          </div>
          <Box display="flex" justifyContent="end">
            <LoadingButton
              color="primary"
              size="medium"
              variant="contained"
              onClick={formik.submitForm}
              loading={isLoading}
              sx={{
                mt: 2,
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
              Enviar Comentario
            </LoadingButton>
          </Box>
        </div>

        <div id="form-messages"></div>
      </form>
    </div>
  );
};
