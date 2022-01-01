import Logout from "pages/Logout";
import SignIn from "pages/Register";
import Register from "pages/SignIn";
import Home from "./pages/Home";

export const routes = [
  { path: "", element: Home },
  { path: "signin", element: SignIn },
  { path: "register", element: Register },
  { path: "Logout", element: Logout },
];
