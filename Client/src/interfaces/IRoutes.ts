import { RouteObject } from "react-router-dom";

export interface IRoutes {
  path: string;
  element: Element | JSX.Element;
  children: RouteObject[];
}
