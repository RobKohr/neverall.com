import Logout from "pages/Logout";
import SignIn from "pages/Register";
import Register from "pages/SignIn";
import Test from "./pages/Test";

export const routes = [
  { path: "signin", element: SignIn },
  { path: "register", element: Register },
  { path: "Logout", element: Logout },
  { path: "test", element: Test },
];
