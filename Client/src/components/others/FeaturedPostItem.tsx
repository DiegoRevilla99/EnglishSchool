export const FeaturedPostItem = ({
  title = "Lorem Ipsum",
  date = "00-00-0000",
  imageSrc = "",
  imageAlt = "",
}) => {
  return (
    <div className="item">
      <div className="post-thumb">
        <img className="img-fluid" src={imageSrc} alt={imageAlt} />
      </div>
      <div className="post-intro">
        <h4 className="post-title">
          <a href="#">{title}</a>
        </h4>
        <div className="meta">{date}</div>
      </div>
    </div>
  );
};
