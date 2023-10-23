import { HeroCarouselItem } from "@/types/HeroCarouselItem";
import { Link } from "react-router-dom";

type Props = {
  items: HeroCarouselItem[];
};

export const HeroCarousel = ({ items }: Props) => {
  const indicators = items.map((item, index) => {
    return (
      <li
        key={index}
        data-bs-target="#hero-carousel"
        data-bs-slide-to={`${index}`}
        className={index === 0 ? "active" : ""}
      ></li>
    );
  });

  const carouselItems = items.map((item, index) => {
    return (
      <div
        className={`carousel-item slide-${index + 1} ${
          index === 0 ? "active" : ""
        }`}
        data-interval="8000"
        key={index}
      >
        <div className="container">
          <div className="slide-box">
            <div className="slide-box-inner">
              <div className="text">{item.text}</div>
              <Link
                to={item.to}
                className="video-play-trigger"
                data-bs-toggle="modal"
                data-bs-target="#modal-video"
              >
                {item.iconLink && (
                  <img className="play-icon" src={item.iconLink} alt="" />
                )}
                {item.textLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="hero-carousel-wrapper">
      <div
        id="hero-carousel"
        className="hero-carousel carousel carousel-fade slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <ol className="carousel-indicators">{indicators}</ol>
          {carouselItems}
        </div>
      </div>
    </div>
  );
};
