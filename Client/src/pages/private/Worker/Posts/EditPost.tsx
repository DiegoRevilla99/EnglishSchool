import "react-quill/dist/quill.snow.css";
import "@/assets/css/reactQuill.css";

import { useFormik } from "formik";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import PostForm from "@/components/Forms/PostForm";
import ReturnButton from "@/components/Buttons/ReturnButton";

import { useUpdatePostMutation } from "@/slices/PostSlice";
import PostSchema from "@/validation/schemas/PostSchema";
import { PostFilled } from "@/interfaces/Formik/IPost";

import { useAppSelector } from "@/hooks/useRedux";

import { BLACK_BUTTON_STYLE } from "@/utils/theme";

const EditPost = () => {
  const navigate = useNavigate();
  const { state } = useAppSelector((state) => state.posts);
  const post = useAppSelector((state) => state.posts.itemSelected);
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: PostFilled(post),
    validationSchema: PostSchema,
    onSubmit: async (values, { resetForm }) => {
      const inserted = await updatePost(values).unwrap();
      if (inserted) {
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (state === "ok") {
      navigate("/posts");
    }
  }, [state]);

  return (
    <Box noValidate component="form" onSubmit={formik.handleSubmit} padding={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Typography variant="h4">Editar post</Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          <ReturnButton />
        </Grid>
        <Grid item xs={12} sm={2}>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            loading={isLoading}
            sx={BLACK_BUTTON_STYLE}
          >
            <SaveOutlined />
            Actualizar
          </LoadingButton>
        </Grid>
      </Grid>
      <Grid container spacing={4} paddingTop={3}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <PostForm formik={formik} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditPost;
