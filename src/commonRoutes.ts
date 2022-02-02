import LoginRegisterCard from "components/LoginRegisterCard";
import { Error404 } from "pages/Error404";
import Logout from "pages/Logout";
import SignIn from "pages/Register";
import Register from "pages/SignIn";

export const commonRoutes = [
  { path: "login", element: LoginRegisterCard },
  { path: "logout", element: Logout },
  { path: "*", element: Error404 },
];
