import { RouteObject } from "react-router-dom";
import { NavigationType } from "@/types/NavigationItemType";

import VerifyAccount from "@/pages/private/Student/NotVerified/VerifyAccount";

export const NotVerifiedItems: NavigationType[] = [
  { label: "Verificar cuenta", to: "/verificar" },
];

const NotVerifiedRoutes: RouteObject[] = [
  { path: "verificar", element: <VerifyAccount /> },
];

export default NotVerifiedRoutes;
