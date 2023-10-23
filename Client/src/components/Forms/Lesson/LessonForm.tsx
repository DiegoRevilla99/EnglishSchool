import CustomTextArea from "@/components/Textfield/CustomTextArea";
import CustomTextField from "@/components/Textfield/CustomTextField";

import IFormikProps from "@/interfaces/IFormikProps";

import { Box, Grid, Typography } from "@mui/material";

export default function LessonForm({ formik }: IFormikProps) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ width: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Nombre*
            </Typography>
            <CustomTextField label="" formik={formik} field="name" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ width: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Rango de sesiones*
            </Typography>
            <Grid container spacing={1}>
              <CustomTextField
                sm={6}
                label=""
                type="number"
                formik={formik}
                field="fromSessionNumber"
              />
              <CustomTextField
                sm={6}
                label=""
                type="number"
                formik={formik}
                field="toSessionNumber"
              />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Descripci&oacute;n*
          </Typography>
        </Grid>
        <CustomTextArea
          sm={12}
          rows={4}
          label=""
          formik={formik}
          field="description"
        />
      </Grid>
    </div>
  );
}
