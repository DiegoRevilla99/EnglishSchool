import React from "react";

import { useFormik } from "formik";

import { Box, Button, Grid } from "@mui/material";
import ModalContainer from "@/components/Modals";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleCloseEditModal } from "@/reducers/ModalReducer";
import AddLinkForm from "@/components/Forms/Lesson/AddLinkForm";
import LinkSchema from "@/validation/schemas/LinkSchema";

interface Props {
  links: string[];
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddLink = ({ links, setLinks }: Props) => {
  const dispatch = useAppDispatch();
  const { openEdit } = useAppSelector((state) => state.modal);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { link: "" },
    validationSchema: LinkSchema,
    onSubmit: (values, { resetForm }) => {
      setLinks([...links, values.link]);
      resetForm();
      dispatch(handleCloseEditModal());
    },
  });

  return (
    <ModalContainer
      maxWidth={"sm"}
      title="Agregar enlace"
      open={openEdit}
      closeFn={() => {
        dispatch(handleCloseEditModal());
      }}
    >
      <Box
        noValidate
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ marginTop: 4 }}
      >
        <Grid container spacing={2}>
          <AddLinkForm formik={formik} />
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            marginTop: 3,
          }}
        >
          <Button type="submit" color="primary" variant="contained">
            Siguiente
          </Button>
        </Box>
      </Box>
    </ModalContainer>
  );
};

export default AddLink;
