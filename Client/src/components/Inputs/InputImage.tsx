import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Box, Grid, IconButton, Typography } from "@mui/material";

import { useRef, useState } from "react";

import { IImageProps } from "@/interfaces/ICustomField";

const InputImage = ({
  sm = 12,
  hidden = false,
  required = true,
  withIcon = false,
  autoFocus = false,
  multiple = false,
  icon = <></>,
  type = "file",
  iconPosition = "start",
  ...props
}: IImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      // props.formik.setFieldValue("image.title", event.target.files[0].name);

      const readerPromises = imageFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises).then((results) => {
        props.formik.setFieldValue("mainImage", results[0]);

        setSelectedImages([...selectedImages, ...results]);
      });
    }
  };

  function handleButtonClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleDeleteImage = () => {
    props.formik.setFieldValue("mainImage", "");
    // props.formik.setFieldValue("image.title", "");
  };

  return (
    <Grid item xs={12} sm={12}>
      <Box>
        <Box
          display="flex"
          justifyContent="center"
          py="0.1rem"
          sx={{
            border: "1px solid #cbcbcb",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          <Typography variant="caption" sx={{ color: "#6a6a6a" }}>
            Imagen Principal
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          py={1}
          sx={{
            borderLeft: "1px solid #cbcbcb",
            borderRight: "1px solid #cbcbcb",
            borderBottom: "1px solid #cbcbcb",
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        >
          {props.formik.values.mainImage !== "" ? (
            <Grid item xs={6} height="auto">
              <Box
                p={3}
                borderRadius="2rem"
                display="flex"
                justifyContent="center"
                height="auto"
              >
                <Box position="relative">
                  <img
                    style={{
                      height: "100%",
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                    src={props.formik.values.mainImage}
                    width={800}
                    height={800}
                    alt="imagen principal"
                  />
                  <Box
                    width="100%"
                    height="100%"
                    onClick={handleDeleteImage}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease-in-out",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      "&:hover": {
                        opacity: 1,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      alignContent="center"
                      alignItems="center"
                    >
                      <DeleteForeverOutlinedIcon
                        sx={{
                          fontSize: "90px",
                        }}
                        htmlColor="#b20100"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ) : (
            <Box>
              <IconButton onClick={handleButtonClick}>
                <Box p={2}>
                  <AddBoxOutlinedIcon fontSize="large" />
                  <Typography
                    variant="body1"
                    fontSize="0.8rem"
                    sx={{ color: "#6a6a6a" }}
                  >
                    Agregar imagen
                  </Typography>
                </Box>
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </Grid>
  );
};

export default InputImage;
