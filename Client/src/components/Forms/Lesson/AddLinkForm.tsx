import { MouseEventHandler, useState } from "react";

import ModalContainer from "../../Modals";

import IFormikProps from "@/interfaces/IFormikProps";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { LinkOutlined } from "@mui/icons-material";

const AddLinkForm = ({
  formik,
  field,
  open,
  onClose,
}: IFormikProps & {
  field: string;
  open: boolean;
  onClose: MouseEventHandler;
}) => {
  const [value, setValue] = useState<string>("");

  function addLinkToFormik() {
    if (value.replaceAll(" ", "").length > 0) {
      const newData = [...formik.values[field]];
      newData.push(value);
      formik.setFieldValue(field, newData);

      setValue("");
    }
  }

  return (
    <ModalContainer
      open={open}
      closeFn={onClose}
      title="Agregar enlace"
      maxWidth="sm"
    >
      <FormControl fullWidth variant="standard">
        <InputLabel htmlFor="addLinkForm">Enlace</InputLabel>
        <Input
          fullWidth
          value={value}
          id="addLinkForm"
          onChange={(e) => setValue(e.currentTarget.value)}
          startAdornment={
            <InputAdornment position="start">
              <LinkOutlined />
            </InputAdornment>
          }
        />
      </FormControl>
      <Box
        sx={{ width: 1, display: "flex", justifyContent: "end", paddingTop: 2 }}
      >
        <Button variant="contained" color="success" onClick={addLinkToFormik}>
          Aceptar
        </Button>
      </Box>
    </ModalContainer>
  );
};

export default AddLinkForm;
