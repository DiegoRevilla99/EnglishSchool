import { ChangeEvent, useRef, useState } from "react";

import {
  Box,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { AddLinkOutlined, AttachFileOutlined } from "@mui/icons-material";

import AddLinkForm from "./AddLinkForm";

import IFormikProps from "@/interfaces/IFormikProps";
import FilesArchivesList from "@/components/Lists/FilesArchivesList";
import CustomTextArea from "@/components/Textfield/CustomTextArea";

export default function LessonMaterial({
  formik,
  type,
}: IFormikProps & { type: "student" | "teacher" }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const newData = [...formik.values[`${type}Files`]];

      newData.push({ fileName: file.name, fileUrl: "www.google.com" });
      formik.setFieldValue(`${type}Files`, newData);
    }
  };

  return (
    <Grid container spacing={2}>
      <input
        hidden
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
        accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain, application/pdf, image/*"
      />

      <Grid item xs={12} sm={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Archivos
          </Typography>
          <IconButton
            onClick={() => {
              if (fileInput.current) {
                fileInput.current.click();
              }
            }}
          >
            <AttachFileOutlined color="secondary" />
          </IconButton>
        </Box>
        <FilesArchivesList
          type="files"
          formik={formik}
          field={`${type}Files`}
          items={formik.values[`${type}Files`]}
        />
      </Grid>

      <Grid item xs={12} sm={2} display="flex" justifyContent="center">
        <Divider orientation="vertical" sx={{ borderColor: "black" }} />
      </Grid>

      <Grid item xs={12} sm={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Enlaces
          </Typography>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddLinkOutlined color="secondary" />
          </IconButton>
        </Box>
        <FilesArchivesList
          type="links"
          formik={formik}
          field={`${type}Links`}
          items={formik.values[`${type}Links`]}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Anotaciones
        </Typography>
        <CustomTextArea
          field={`${type}Notes`}
          formik={formik}
          label=""
          rows={4}
        />
      </Grid>

      <AddLinkForm
        field={`${type}Links`}
        open={open}
        formik={formik}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Grid>
  );
}
