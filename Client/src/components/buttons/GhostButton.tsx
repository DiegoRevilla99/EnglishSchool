import { Link } from "react-router-dom";

export const GhostButton = ({
  title = "",
  to = "#",
  align = "left",
  onClick = () => {},
}) => {
  return (
    <div className={`action ${align}`}>
      <Link to={to} className="btn btn-ghost-alt" onClick={onClick}>
        {title}
      </Link>
    </div>
  );
};
