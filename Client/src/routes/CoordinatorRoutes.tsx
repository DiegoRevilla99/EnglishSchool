import { RouteObject } from "react-router-dom";
import { NavigationType } from "@/types/NavigationItemType";

import Materials from "@/pages/private/Coordinator/Materials/Materials";
import BlogPage from "@/pages/public/BlogPage";
import BlogSinglePage from "@/pages/public/BlogSinglePage";

export const CoordinatorItems: NavigationType[] = [
  { label: "materiales", to: "/materiales" },
  { label: "Blog", to: "/blog/page/1" },
];

const CoordinatorRoutes: RouteObject[] = [
  { path: "materiales", element: <Materials /> },
  { path: "/blog/page/:page", element: <BlogPage /> },
  { path: "/blog/post/:id", element: <BlogSinglePage /> },
];

export default CoordinatorRoutes;
