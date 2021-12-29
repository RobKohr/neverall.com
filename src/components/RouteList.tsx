import { AppSettings } from "App";
import { Routes, Route } from "react-router-dom";

interface Props {
  routes: {
    path: string;
    element: () => JSX.Element;
  }[];
  app: AppSettings;
}

export default function RouteList({ routes, app }: Props) {
  const baseUrl = app.baseUrl;
  return (
    <Routes>
      {routes.map(({ path, element: Element }) => {
        console.log(`${baseUrl}/${path}`);
        return (
          <Route key={path} path={`${baseUrl}/${path}`} element={<Element />} />
        );
      })}
    </Routes>
  );
}
