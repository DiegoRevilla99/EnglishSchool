import Auth from "@/models/Auth";

import { RouteObject } from "react-router-dom";

import { RoutesPrivate, RoutesPublic } from "./LayoutRoutes";

import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";
import TeacherRoutes from "./TeacherRoutes";
import CoordinatorRoutes from "./CoordinatorRoutes";

import NotVerifiedRoutes from "./NotVerifiedRoutes";
import NotSubscribedRoutes from "./NotSubscribedRoutes";
import SubscribedRoutes from "./SubscribedRoutes";

const routes = (user: Auth | null) => {
  const finalPublicRoutes = { ...RoutesPublic };

  if (!user) {
    finalPublicRoutes.children =
      finalPublicRoutes.children.concat(PublicRoutes);
    return [finalPublicRoutes] as RouteObject[];
  }

  const finalPrivateRoutes = { ...RoutesPrivate };

  if (!user.verified) {
    finalPrivateRoutes.children =
      finalPrivateRoutes.children.concat(NotVerifiedRoutes);
    return [finalPrivateRoutes] as RouteObject[];
  }

  if (user.role === "ESTUDIANTE") {
    if (!user.subscriptions || user.subscriptions.length === 0) {
      finalPrivateRoutes.children =
        finalPrivateRoutes.children.concat(NotSubscribedRoutes);
      return [finalPrivateRoutes] as RouteObject[];
    }

    finalPrivateRoutes.children =
      finalPrivateRoutes.children.concat(SubscribedRoutes);
    return [finalPrivateRoutes] as RouteObject[];
  }

  switch (user.role) {
    case "PROFESOR":
      finalPrivateRoutes.children =
        finalPrivateRoutes.children.concat(TeacherRoutes);
      break;

    case "COORDINADOR":
      finalPrivateRoutes.children =
        finalPrivateRoutes.children.concat(CoordinatorRoutes);
      break;

    default:
      finalPrivateRoutes.children =
        finalPrivateRoutes.children.concat(UserRoutes);
      break;
  }

  return [finalPrivateRoutes] as RouteObject[];
};

export default routes;
