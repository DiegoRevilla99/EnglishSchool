import { RouteObject } from "react-router-dom";
import { NavigationType } from "@/types/NavigationItemType";

import Login from "@/pages/public/Login";
import Register from "@/pages/public/Register";
import StaffPage from "@/pages/public/StaffPage";
import BlogPage from "@/pages/public/BlogPage";
import BlogSinglePage from "@/pages/public/BlogSinglePage";

import CarouselPlans from "@/pages/public/Plans";

export const PublicItems: NavigationType[] = [
  { label: "Profesores", to: "/profesores" },
  { label: "Planes", to: "/planes" },
  { label: "Blog", to: "/blog/page/1" },
  { label: "Iniciar sesión", to: "/entrar" },
  { label: "Registrarse", to: "/registro" },
];

const PublicRoutes: RouteObject[] = [
  { path: "entrar", element: <Login /> },
  { path: "registro", element: <Register /> },
  { path: "profesores", element: <StaffPage /> },
  { path: "planes", element: <CarouselPlans /> },
  { path: "/blog/page/:page", element: <BlogPage /> },
  { path: "/blog/post/:id", element: <BlogSinglePage /> },
];

export default PublicRoutes;
