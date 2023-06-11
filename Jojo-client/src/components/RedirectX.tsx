import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { Redirect, Route, useLocation } from "react-router";
import { SignUpPage } from "../pages/SignUpPage";

import { routes } from "../routes";

export function RedirectX(props: {
  path: string;

  component: JSX.Element;
}) {
  const { path, component } = props;
  const token = useSelector((state: RootState) => state.auth.token);
  let location = localStorage.getItem("location");
  if (location == null) {
    location = routes.home;
  }
  return (
    <Route path={path}>
      {!token ? component : <Redirect from={path} to={location} />}
    </Route>
  );
}
