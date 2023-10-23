import { Link } from "react-router-dom";

export const ShortCutItem = ({
  className = "",
  icon = "",
  title = "Lorem Ipsum",
  to = "#",
}) => {
  return (
    <div className={className}>
      <i className={icon} aria-hidden="true"></i>
      <span className="text">
        <Link to="#">{title}</Link>
      </span>
    </div>
  );
};
