import { Outlet } from "react-router-dom";

import Header from "../components/Template/Header";
import Footer from "../components/Template/Footer";

const PublicLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default PublicLayout;
