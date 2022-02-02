import { commonRoutes } from "commonRoutes";
import { Route } from "components/RouteList";
import Create from "./pages/Create";
import Forum from "./pages/Forum";
import Home from "./pages/Home";

export const routes: Route[] = [
  { path: "", element: Home },
  { path: "forum/:forumId", element: Forum },
  { path: "create", element: Create },
  ...commonRoutes,
];
