import dayjs from "dayjs";

import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker, MobileTimePicker } from "@mui/x-date-pickers";

import IFormikProps from "@/interfaces/IFormikProps";

export default function EventualityForm({ formik }: IFormikProps) {
  return (
    <>
      <Grid item xs={12}>
        <DatePicker
          disablePast
          label="Fecha"
          sx={{ width: 1 }}
          value={dayjs(formik.values["date"])}
          onChange={(value) => {
            formik.setFieldValue("date", value?.toISOString());
          }}
          slotProps={{
            textField: {
              error: formik.touched["date"] && Boolean(formik.errors["date"]),
              helperText:
                formik.touched["date"] && formik.errors["date"] ? (
                  <>{formik.errors["date"]}</>
                ) : null,
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <MobileTimePicker
          disablePast
          sx={{ width: 1 }}
          label="Hora de inicio:"
          value={dayjs(formik.values["startHour"])}
          onChange={(value) => {
            formik.setFieldValue("startHour", value?.toISOString());
          }}
          slotProps={{
            textField: {
              error:
                formik.touched["startHour"] &&
                Boolean(formik.errors["startHour"]),
              helperText:
                formik.touched["startHour"] && formik.errors["startHour"] ? (
                  <>{formik.errors["startHour"]}</>
                ) : null,
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <MobileTimePicker
          sx={{ width: 1 }}
          label="Hora de fin"
          value={dayjs(formik.values["endHour"])}
          onChange={(value) => {
            formik.setFieldValue("endHour", value?.toISOString());
          }}
          slotProps={{
            textField: {
              error:
                formik.touched["endHour"] && Boolean(formik.errors["endHour"]),
              helperText:
                formik.touched["endHour"] && formik.errors["endHour"] ? (
                  <>{formik.errors["endHour"]}</>
                ) : null,
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel color="info" id="lblEventualidadId" required>
            Eventualidad
          </InputLabel>
          <Select
            required
            labelId="lblEventualidadId"
            name="type"
            color="info"
            defaultValue={formik.values.type}
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.type && Boolean(formik.errors.type)}
            inputProps={{}}
            label="Eventualidad"
          >
            <MenuItem disabled value="Elegir uno">
              Elegir uno
            </MenuItem>
            <MenuItem value="Ausencia">Ausencia</MenuItem>
            <MenuItem value="Horas extra">Horas extra</MenuItem>
          </Select>
          {formik.touched.type && formik.errors.type ? (
            <FormHelperText error>
              <>{formik.errors.type}</>
            </FormHelperText>
          ) : null}
        </FormControl>
      </Grid>
    </>
  );
}
