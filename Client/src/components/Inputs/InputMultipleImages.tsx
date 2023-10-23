import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useRef, useState } from "react";

import { IImageProps } from "@/interfaces/ICustomField";

const InputMultipleImages = ({
  sm = 12,
  hidden = false,
  required = true,
  withIcon = false,
  autoFocus = false,
  multiple = true,
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

      //   props.formik.setFieldValue("gallery.title", event.target.value);

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
        const images = [...results];
        const imagesWithTitle = images.map((img, index) => {
          return img;
          //   return { image: img, title: event?.target?.files[index]?.name };
        });

        // props.formik.setFieldValue("gallery.images", [
        //   ...props.formik.values.gallery.images,
        //   ...imagesWithTitle,
        // ]);

        props.formik.setFieldValue("gallery", [
          ...props.formik.values.gallery,
          ...imagesWithTitle,
        ]);

        setSelectedImages([...selectedImages, ...results]);
      });
    }
  };

  function handleButtonClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleDeleteImage = (index: number) => {
    const array = [...props.formik.values.gallery];
    const newArray = array.filter((el, index1) => index1 !== index);

    props.formik.setFieldValue(`gallery`, newArray);
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
            Galeria de imágenes
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
          <Grid item xs={12} height="auto">
            <Box
              p={3}
              borderRadius="2rem"
              display="flex"
              justifyContent="center"
              height="auto"
            >
              <Grid container spacing={2}>
                {props.formik.values.gallery.map(
                  (image: any, index: number) => {
                    return (
                      <Grid item xs={12} sm={6} md={3}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="100%"
                        >
                          <Box>
                            <Box position="relative">
                              <img
                                style={{
                                  height: "100%",
                                  overflow: "hidden",
                                  objectFit: "cover",
                                }}
                                src={image}
                                width={200}
                                height={200}
                                alt={image}
                              />
                              <Box
                                width="100%"
                                height="100%"
                                onClick={() => handleDeleteImage(index)}
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
                                      fontSize: "40px",
                                    }}
                                    htmlColor="#b20100"
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  }
                )}
                <Grid item xs={12} sm={6} md={3}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
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
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Box>
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
        multiple
      />
    </Grid>
  );
};

export default InputMultipleImages;
