import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Slider from "react-slick";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  gallery: string[];
}

const GalleryCarousel = ({ gallery }: Props) => {
  const isSmallScreen = useMediaQuery("(max-width:946px)");

  const [imageIndex, setImageIndex] = useState(0);

  const NextArrow = ({ onClick }: any) => {
    return (
      <div className="arrowBlog nextBlog" onClick={onClick}>
        <ArrowForwardIosIcon sx={{ fontSize: "4rem" }} />
      </div>
    );
  };

  const PrevArrow = ({ onClick }: any) => {
    return (
      <div className="arrowBlog prevBlog" onClick={onClick}>
        <ArrowBackIosNewIcon sx={{ fontSize: "4rem" }} />
      </div>
    );
  };

  const settings = {
    swipe: true,
    infinite: !isSmallScreen,
    centerMode: true,
    speed: 500,
    centerPadding: "0",
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: number, next: number) => setImageIndex(next),
  };
  return (
    <Box>
      <Slider {...settings} lazyLoad="progressive">
        {gallery?.map((images, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <img
              src={images?.image || images}
              alt="Image"
              style={{ margin: "0 auto", maxHeight: "100%", maxWidth: "100%" }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default GalleryCarousel;
