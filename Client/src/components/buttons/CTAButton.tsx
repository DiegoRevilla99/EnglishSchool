import { Link } from "react-router-dom";

export const CTAButton = ({ title = "Lorem", to = "#" }) => {
  return (
    <div className="cta-button">
      <Link className="btn btn-secondary btn-block btn-cta" to={to}>
        {title}
      </Link>
    </div>
  );
};
