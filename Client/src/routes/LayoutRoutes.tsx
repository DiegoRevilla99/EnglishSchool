import { Navigate } from "react-router-dom";
import { IRoutes } from "@/interfaces/IRoutes";

import PublicLayout from "@/layouts/PublicLayout";
import PrivateLayout from "@/layouts/PrivateLayout";

import Home from "@/pages/public/Home";

export const RoutesPublic: IRoutes = {
  path: "/",
  element: <PublicLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: "*", element: <Navigate to="/" /> },
  ],
};

export const RoutesPrivate: IRoutes = {
  path: "/",
  element: <PrivateLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: "*", element: <Navigate to="/" /> },
  ],
};
