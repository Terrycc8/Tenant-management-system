import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { LoginPage } from "../pages/LoginPage";
import { Redirect, Route, useLocation } from "react-router";

import { routes } from "../routes";
import { useCallback } from "react";

export function UserOnlyRoute(props: { path: string; component: JSX.Element }) {
  const { path, component } = props;
  const token = useSelector((state: RootState) => {
    return state.auth.token;
  });
  const location = useLocation();
  localStorage.setItem("location", location.pathname);
  return (
    <Route path={path}>
      {!token ? <Redirect from={path} to={routes.login}></Redirect> : component}
    </Route>
  );
}
