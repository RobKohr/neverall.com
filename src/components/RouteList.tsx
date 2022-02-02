import { AppSettings } from "App";
import { Routes, Route } from "react-router-dom";

export interface Route {
  path: string;
  element: () => JSX.Element;
}
interface Props {
  routes: Route[];
  app: AppSettings;
}

export default function RouteList({ routes, app }: Props) {
  const baseUrl = app.baseUrl;
  return (
    <Routes>
      {routes.map(({ path, element: Element }) => {
        return (
          <Route key={path} path={`${baseUrl}/${path}`} element={<Element />} />
        );
      })}
    </Routes>
  );
}
