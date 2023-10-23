import { IHeroBanner } from "@/interfaces/IHeroBanner";

const HeroBanner = ({ title, image, imagePosition }: IHeroBanner) => {
  return (
    <section
      className="page-hero"
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${image})`,
        backgroundPosition: imagePosition,
      }}
    >
      <div className="hero-page-title container">
        <h1>{title}</h1>
      </div>
      <div className="mask"></div>
    </section>
  );
};

export default HeroBanner;
