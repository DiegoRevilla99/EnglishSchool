import { RouteObject } from "react-router-dom";
import { NavigationType } from "@/types/NavigationItemType";

import Roles from "@/pages/private/Worker/Roles";
import Users from "@/pages/private/Worker/Users";
import Students from "@/pages/private/Worker/Students";

import Teachers from "@/pages/private/Worker/Teachers";
import CreateTeacher from "@/pages/private/Worker/Teachers/CreateTeacher";
import EditTeacher from "@/pages/private/Worker/Teachers/EditTeacher";

import Plans from "@/pages/private/Worker/Plans";
import Sessions from "@/pages/private/Worker/Sessions";
import Subscriptions from "@/pages/private/Worker/Subscriptions";
import Levels from "@/pages/private/Worker/Levels";
import Units from "@/pages/private/Worker/Units";

import Lessons from "@/pages/private/Worker/Lessons";
import CreateLesson from "@/pages/private/Worker/Lessons/CreateLesson";
import EditLesson from "@/pages/private/Worker/Lessons/EditLesson";

import Tags from "@/pages/private/Worker/Tags";

import Posts from "@/pages/private/Worker/Posts";
import CreatePost from "@/pages/private/Worker/Posts/CreatePost";
import EditPost from "@/pages/private/Worker/Posts/EditPost";
import EditStudent from "@/pages/private/Worker/Students/EditStudent";

export const UserItems: NavigationType[] = [
  { label: "Niveles", to: "/niveles" },
  { label: "Planes", to: "/planes" },
  { label: "Roles", to: "/roles" },
  { label: "Administrativos", to: "/usuarios" },
  { label: "Profesores", to: "/profesores" },
  { label: "Estudiantes", to: "/estudiantes" },
  { label: "Sesiones", to: "/sesiones" },
  { label: "Suscripciones", to: "/suscripciones" },
  { label: "Tags", to: "/tags" },
  { label: "Posts", to: "/posts" },
];

const UserRoutes: RouteObject[] = [
  { path: "roles", element: <Roles /> },
  { path: "usuarios", element: <Users /> },
  { path: "estudiantes", element: <Students /> },
  { path: "estudiantes/editar", element: <EditStudent /> },
  { path: "profesores", element: <Teachers /> },
  { path: "profesores/crear", element: <CreateTeacher /> },
  { path: "profesores/editar", element: <EditTeacher /> },
  { path: "niveles", element: <Levels /> },
  { path: "unidades", element: <Units /> },
  { path: "lecciones", element: <Lessons /> },
  { path: "lecciones/crear", element: <CreateLesson /> },
  { path: "lecciones/editar", element: <EditLesson /> },
  { path: "planes", element: <Plans /> },
  { path: "sesiones", element: <Sessions /> },
  { path: "suscripciones", element: <Subscriptions /> },
  { path: "tags", element: <Tags /> },
  { path: "posts", element: <Posts /> },
  { path: "posts/crear", element: <CreatePost /> },
  { path: "posts/editar", element: <EditPost /> },
];

export default UserRoutes;
