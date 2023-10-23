import { useEffect } from "react";

import { useAppSelector } from "@/hooks/useRedux";
import { useLazyGetAllRolesQuery } from "@/slices/RoleSlice";

import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

import IFormikProps from "@/interfaces/IFormikProps";

const RoleSelect = ({ formik }: IFormikProps) => {
  const roles = useAppSelector((state) => state.roles.items);
  const [fetchRoles] = useLazyGetAllRolesQuery({});

  useEffect(() => {
    if (roles.length === 0) {
      fetchRoles({});
    }
  }, []);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel color="info" id="lblRolId" required>
          Rol
        </InputLabel>
        <Select
          required
          labelId="lblRolId"
          name="role"
          color="info"
          defaultValue={formik.values.role}
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.role && Boolean(formik.errors.role)}
          label="Rol"
        >
          <MenuItem disabled value="Elegir uno">
            Elegir uno
          </MenuItem>
          {roles
            .filter((role) => {
              return role.name !== "PROFESOR" && role.name !== "ESTUDIANTE";
            })
            .map((role) => {
              return (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default RoleSelect;
