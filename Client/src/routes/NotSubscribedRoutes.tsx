import { RouteObject } from "react-router-dom";
import { NavigationType } from "@/types/NavigationItemType";

import Plans from "@/pages/public/Plans";

import TrialClass from "@/pages/private/Student/NotSubscribed/TrialClass";
import Profile from "@/pages/private/Student/Profile/Profile";

export const NotSubscribedItems: NavigationType[] = [
  { label: "Planes", to: "/planes" },
  { label: "Clase Muestra", to: "/clase-muestra" },
  { label: "Mi Perfil", to: "/perfil" },
];

const NotSubscribedRoutes: RouteObject[] = [
  { path: "planes", element: <Plans /> },
  { path: "clase-muestra", element: <TrialClass /> },
  { path: "perfil", element: <Profile /> },
];

export default NotSubscribedRoutes;
