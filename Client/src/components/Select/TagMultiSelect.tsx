import { useEffect } from "react";

import { useAppSelector } from "@/hooks/useRedux";
import { useLazyGetAllTagsQuery } from "@/slices/TagsSlice";

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

const TagMultiSelect = ({ formik, field, label }: IMultiSelect) => {
  const tags = useAppSelector((state) => state.tags.items);
  const [fetchTags] = useLazyGetAllTagsQuery({});

  useEffect(() => {
    if (tags.length === 0) {
      fetchTags({});
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
    <Grid item xs={12}>
      <FormControl sx={{ width: 1 }}>
        <InputLabel id="lblMultiTagSelect">{label}</InputLabel>
        <Select
          multiple
          fullWidth
          id="multiTagSelect"
          labelId="lblMultiTagSelect"
          label={label}
          onChange={(e) => handleChange(e)}
          value={formik.values[field]}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: number | string, index: number) => (
                <Chip
                  key={index}
                  label={
                    tags.find((tag) => tag.id === value || tag.name === value)
                      ?.name
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
          {tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default TagMultiSelect;
