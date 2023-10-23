import { Link } from "react-router-dom";

export const CarouselOverlay = () => {
  return (
    <div className="hero-overlay">
      <div className="container-fluid">
        <div className="overlay-upper">
          <div className="container clearfix">
            <div className="contact-info float-start">
              <div className="item">
                Tel: <Link to="tel:0800123456">0800 123 45678</Link>
              </div>
              <div className="item">
                Email:{" "}
                <Link to="mailto:info@yourschoolsite.com">
                  info@yourschoolsite.com
                </Link>
              </div>
            </div>

            <ul className="social-media list-inline float-end">
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-flickr" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#">
                  <i className="fab fa-youtube" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="overlay-lower">
          <div className="container">
            <div className="links">
              <div className="link">
                <Link to="/about" title="Our School">
                  <i
                    className="fas fa-university link-icon"
                    aria-hidden="true"
                  ></i>
                  <span className="link-text">Our School</span>
                </Link>
              </div>
              <div className="link">
                <Link to="/admissions" title="Admissions">
                  <i
                    className="fas fa-graduation-cap link-icon"
                    aria-hidden="true"
                  ></i>
                  <span className="link-text">Admissions</span>
                </Link>
              </div>
              <div className="link">
                <Link to="/news" title="News &amp; Events">
                  <i
                    className="fas fa-newspaper link-icon"
                    aria-hidden="true"
                  ></i>
                  <span className="link-text">News &amp; Events</span>
                </Link>
              </div>
              <div className="link">
                <Link to="/docs" title="Key Info">
                  <i
                    className="fas fa-info-circle link-icon"
                    aria-hidden="true"
                  ></i>
                  <span className="link-text">Key Info</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
