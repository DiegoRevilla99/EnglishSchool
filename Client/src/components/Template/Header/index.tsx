import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppSelector } from "@/hooks/useRedux";
import { useLogoutMutation } from "@/slices/AuthSlice";

import { NavigationType } from "@/types/NavigationItemType";
import navItems from "@/navigation";

import Logo from "@/assets/images/logo.png";

const Header = () => {
  const [items, setItems] = useState<NavigationType[]>([]);

  const location = useLocation();
  const [logoff] = useLogoutMutation();
  const currentUser = useAppSelector((state) => state.auth.user);

  function isOnPage(link: string) {
    return `nav-link ${location.pathname === link ? "active" : ""}`;
  }

  async function exit() {
    await logoff({});
  }

  useEffect(() => {
    setItems(navItems(currentUser));
  }, [currentUser]);

  return (
    <header id="header" className="header">
      <div className="top-bar container-fluid">
        <nav className="main-nav navbar navbar-expand-md" role="navigation">
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-collapse"
          >
            <span> </span>
            <span> </span>
            <span> </span>
          </button>
          <div id="navbar-collapse" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              {items.map((link, index) => {
                return (
                  <li className="nav-item" key={index}>
                    <Link to={link.to} className={isOnPage(link.to)}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" onClick={exit} to="/">
                    Salir
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <div className="branding">
        <div className="container">
          <h1 className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </h1>
          <h2 className="tagline">
            Nuestra pasión... hacer del inglés tu segunda lengua
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
