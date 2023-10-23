import { useEffect } from "react";

import { useAppSelector } from "@/hooks/useRedux";
import { useLazyGetAllLevelsQuery } from "@/slices/LevelSlice";

import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

import { IMultiSelect } from "@/interfaces/ICustomField";

const LevelMultiSelect = ({ formik, field, label, sm = 12 }: IMultiSelect) => {
  const levels = useAppSelector((state) => state.levels.items);
  const [fetchLevels] = useLazyGetAllLevelsQuery({});

  useEffect(() => {
    if (levels.length === 0) {
      fetchLevels({});
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    formik.setFieldValue(field, event.target.value);
  };

  const handleDelete = (valueToDelete: number | string) => {
    const oldData = formik.values[field];
    const newData = oldData?.filter(
      (item: number | string) => item !== valueToDelete
    );
    formik.setFieldValue(field, newData);
  };

  return (
    <Grid item xs={12} sm={sm}>
      <FormControl sx={{ width: 1 }}>
        <InputLabel id="lblMultiLevelSelect">{label}</InputLabel>
        <Select
          multiple
          fullWidth
          id="multiLevelSelect"
          labelId="lblMultiLevelSelect"
          label={label}
          onChange={(e) => handleChange(e)}
          value={formik.values[field]}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: number | string, index: number) => (
                <Chip
                  key={index}
                  label={
                    levels.find(
                      (level) => level.id === value || level.name === value
                    )?.name
                  }
                  onDelete={() => handleDelete(value)}
                  deleteIcon={
                    <DeleteOutline
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                />
              ))}
            </Box>
          )}
        >
          {levels.map((level) => (
            <MenuItem key={level.id} value={level.id}>
              {level.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default LevelMultiSelect;
