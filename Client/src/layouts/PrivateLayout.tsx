import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useRedux";

import Header from "@/components/Template/Header";
import Footer from "../components/Template/Footer";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!currentUser?.verified) {
      navigate("/verificar");
    }
  }, [currentUser]);

  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default PrivateLayout;
