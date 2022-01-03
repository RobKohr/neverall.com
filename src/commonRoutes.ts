import {Error404} from "pages/Error404";
import Logout from "pages/Logout";
import SignIn from "pages/Register";
import Register from "pages/SignIn";

export const commonRoutes = [
  {path: "signin", element: SignIn},
  {path: "register", element: Register},
  {path: "Logout", element: Logout},
  {path: "*", element: Error404},
];
