import { useState } from "react";
import ReactQuill from "react-quill";

import { Grid } from "@mui/material";

import IFormikProps from "@/interfaces/IFormikProps";

import CustomTextField from "../Textfield/CustomTextField";
import TagMultiSelect from "../Select/TagMultiSelect";
import InputImage from "../Inputs/InputImage";
import InputMultipleImages from "../Inputs/InputMultipleImages";
import TextEditor from "../Others/TextEditor";

const PostForm = ({ formik }: IFormikProps) => {
  return (
    <>
      <CustomTextField label="Título" formik={formik} field="title" />
      <InputImage
        label="Imagen principal"
        formik={formik}
        field="image"
        withIcon
        sm={12}
      />
      <Grid item xs={12} height="auto" minHeight="20rem">
        <TextEditor field="body" formik={formik} />
      </Grid>

      <InputMultipleImages
        label="Galería de imágenes"
        formik={formik}
        field="gallery"
        withIcon
        sm={12}
      />

      <TagMultiSelect label="Tags" formik={formik} field="tags" />
    </>
  );
};

export default PostForm;
