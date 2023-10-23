import Auth from "@/models/Auth";

import { NavigationType } from "@/types/NavigationItemType";

import { UserItems } from "@/routes/UserRoutes";
import { PublicItems } from "@/routes/PublicRoutes";
import { TeacherItems } from "@/routes/TeacherRoutes";
import { CoordinatorItems } from "@/routes/CoordinatorRoutes";

import { NotVerifiedItems } from "@/routes/NotVerifiedRoutes";
import { NotSubscribedItems } from "@/routes/NotSubscribedRoutes";
import { SubscribedItems } from "@/routes/SubscribedRoutes";

const navItems = (user: Auth | null) => {
  let defaultNavItem: NavigationType[] = [{ label: "Inicio", to: "/" }];

  if (!user) {
    return defaultNavItem.concat(PublicItems);
  }

  if (!user.verified) {
    return defaultNavItem.concat(NotVerifiedItems);
  }

  if (user.role === "ESTUDIANTE") {
    if (!user.subscriptions || user.subscriptions.length === 0) {
      return defaultNavItem.concat(NotSubscribedItems);
    }

    return defaultNavItem.concat(SubscribedItems);
  }

  switch (user.role) {
    case "PROFESOR":
      return defaultNavItem.concat(TeacherItems);

    case "COORDINADOR":
      return defaultNavItem.concat(CoordinatorItems);

    default:
      return defaultNavItem.concat(UserItems);
  }
};

export default navItems;
