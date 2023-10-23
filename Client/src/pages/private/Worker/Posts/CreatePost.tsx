import "react-quill/dist/quill.snow.css";
import "@/assets/css/reactQuill.css";

import { useFormik } from "formik";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import PostForm from "@/components/Forms/PostForm";
import ReturnButton from "@/components/Buttons/ReturnButton";

import { PostInitial } from "@/interfaces/Formik/IPost";
import PostSchema from "@/validation/schemas/PostSchema";

import { useAppSelector } from "@/hooks/useRedux";

import { useCreatePostMutation } from "@/slices/PostSlice";

import { BLACK_BUTTON_STYLE } from "@/utils/theme";

const CreatePost = () => {
  const navigate = useNavigate();
  const { state } = useAppSelector((state) => state.posts);
  const [createPost, { isLoading }] = useCreatePostMutation();

  const formik = useFormik({
    initialValues: PostInitial,
    validationSchema: PostSchema,
    onSubmit: async (values, { resetForm }) => {
      const inserted = await createPost(values).unwrap();
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
        <Grid item xs={12} sm={10}>
          <Typography variant="h4">Crear post</Typography>
        </Grid>
        <Grid item xs={12} sm={1}>
          <ReturnButton />
        </Grid>
        <Grid item xs={12} sm={1}>
          <LoadingButton
            fullWidth
            type="submit"
            color="success"
            variant="contained"
            loading={isLoading}
            sx={BLACK_BUTTON_STYLE}
            disabled={
              !(formik.isValid && Object.keys(formik.touched).length > 0)
            }
          >
            <AddOutlined /> Crear
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

export default CreatePost;
