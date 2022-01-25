import { commonRoutes } from "commonRoutes";
import Forum from "./pages/Forum";

export const routes = [
  { path: "forum/:forumId", element: Forum },
  ...commonRoutes,
];
