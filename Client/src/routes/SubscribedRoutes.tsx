import { RouteObject } from "react-router-dom";
import { NavigationType } from "@/types/NavigationItemType";

import BlogPage from "@/pages/public/BlogPage";
import BlogSinglePage from "@/pages/public/BlogSinglePage";

import Session from "@/pages/private/General/VideoSession";

import LessonsList from "@/pages/private/Student/Subscribed/LessonsList";
import Profile from "@/pages/private/Student/Profile/Profile";
import Schedule from "@/pages/private/Student/Subscribed/Schedule";

export const SubscribedItems: NavigationType[] = [
  { label: "Mis clases", to: "/clases" },
  { label: "Mi horario", to: "/horario" },
  { label: "Mi Perfil", to: "/perfil" },
  { label: "Blog", to: "/blog/page/1" },
];

const SubscribedRoutes: RouteObject[] = [
  { path: "clases", element: <LessonsList /> },
  { path: "horario", element: <Schedule /> },
  { path: "perfil", element: <Profile /> },
  { path: "videosesion", element: <Session /> },
  { path: "/blog/page/:page", element: <BlogPage /> },
  { path: "/blog/post/:id", element: <BlogSinglePage /> },
];

export default SubscribedRoutes;
