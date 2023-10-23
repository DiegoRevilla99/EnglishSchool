import { Link } from "react-router-dom";

export const BlogPost = ({
  image = "",
  to = "#",
  title = "Lorem Ipsum",
  date = "00-00-0000",
  description = "Lorem Ipsum",
  buttonText = "Lorem",
}) => {
  return (
    <div className="post">
      <div className="post-thumb">
        <Link className="thumb-link" to={to}>
          <img className="img-fluid" src={image} alt="" />
        </Link>
      </div>

      <div className="content">
        <h3 className="post-title">
          <Link to={to}>{title}</Link>
        </h3>
        <div className="date">{date}</div>

        <div className="post-entry">
          <p>{description}</p>
          <Link className="read-more btn btn-ghost-alt" to={to}>
            {buttonText}
            <i className="fas fa-angle-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
