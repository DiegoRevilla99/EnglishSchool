import { RouteObject } from "react-router-dom";
import { NavigationType } from "@/types/NavigationItemType";

import BlogPage from "@/pages/public/BlogPage";
import BlogSinglePage from "@/pages/public/BlogSinglePage";

import VideoSession from "@/pages/private/General/VideoSession";

import LessonsList from "@/pages/private/Teacher/LessonsList";
import Profile from "@/pages/private/Teacher/Profile";
import Schedule from "@/pages/private/Teacher/Schedule";

export const TeacherItems: NavigationType[] = [
  { label: "Mis clases", to: "/clases" },
  { label: "Mi horario", to: "/horario" },
  { label: "Mi perfil", to: "/perfil" },
  { label: "Blog", to: "/blog/page/1" },
];

const TeacherRoutes: RouteObject[] = [
  { path: "clases", element: <LessonsList /> },
  { path: "perfil", element: <Profile /> },
  { path: "horario", element: <Schedule /> },
  { path: "videosesion", element: <VideoSession /> },
  { path: "/blog/page/:page", element: <BlogPage /> },
  { path: "/blog/post/:id", element: <BlogSinglePage /> },
];

export default TeacherRoutes;
