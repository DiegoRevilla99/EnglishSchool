import { useEffect } from "react";

import { useAppSelector } from "@/hooks/useRedux";
import { useLazyGetAllLevelsQuery } from "@/slices/LevelSlice";

import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import IFormikProps from "@/interfaces/IFormikProps";

const LevelSelect = ({ formik }: IFormikProps) => {
  const levels = useAppSelector((state) => state.levels.items);
  const [fetchLevels] = useLazyGetAllLevelsQuery({});

  useEffect(() => {
    if (levels.length === 0) {
      fetchLevels({});
    }
  }, []);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel color="info" id="lblNivelId" required>
          Nivel
        </InputLabel>
        <Select
          required
          labelId="lblNivelId"
          name="level"
          color="info"
          defaultValue="Elegir uno"
          value={formik.values.level}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.level && Boolean(formik.errors.level)}
          label="Nivel"
        >
          <MenuItem disabled value="Elegir uno">
            Elegir uno
          </MenuItem>
          {levels.map((level) => {
            return (
              <MenuItem key={level.id} value={level.name}>
                {level.name}
              </MenuItem>
            );
          })}
        </Select>
        {formik.touched.level && formik.errors.level ? (
          <FormHelperText error>
            <>{formik.errors.level}</>
          </FormHelperText>
        ) : null}
      </FormControl>
    </Grid>
  );
};

export default LevelSelect;
