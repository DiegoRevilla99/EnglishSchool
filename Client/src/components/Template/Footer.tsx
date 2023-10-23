import Logo from "@/assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div className="logo-holder">
              <img src={Logo} alt="Logo" />
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="footer-links row">
              <div className="sub-col col-12 col-md-5">
                <h4 className="col-title">Ubicación</h4>
                <ul className="footer-links list-unstyled">
                  <li className="link-item">
                    <a style={{ textDecoration: "none" }}>
                      Río Grijalva núm. 103 Colonia La Cascada, Oaxaca de
                      Juarez, Oaxaca, México
                    </a>
                  </li>
                </ul>
              </div>
              <div className="sub-col col-12 col-md-3">
                <h4 className="col-title">Contacto</h4>
                <ul className="social-media list-inline">
                  <li className="list-inline-item">
                    <a href="tel:951-206-0556">
                      <i className="fa fa-phone" aria-hidden="true" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="mailto: contacto@minimundolingua.com.mx">
                      <i className="fa fa-envelope" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="sub-col col-12 col-md-4">
                <h4 className="col-title">Contenido</h4>
                <ul className="footer-links list-unstyled">
                  <li className="link-item">
                    <a href="/profesores">Profesores</a>
                  </li>
                  <li className="link-item">
                    <a href="/planes">Planes</a>
                  </li>
                  <li className="link-item">
                    <a href="/blog">Blog</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <small className="copyright">
            Impulsado por{" "}
            <a href="https://karimnot.com/public" target="_blank">
              Karimnot
            </a>{" "}
            © 2023
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
