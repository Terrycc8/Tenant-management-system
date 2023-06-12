import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { LoginPage } from "../pages/LoginPage";
import { Redirect, Route, useLocation } from "react-router";

import { routes } from "../routes";
import { useCallback, useEffect } from "react";

export function MemberOnlyRoute(props: {
  path: string;
  component: JSX.Element;
}) {
  const { path, component } = props;
  console.log("render MemberOnlyRoute", component.type.name);
  const token = useSelector((state: RootState) => {
    return state.auth.token;
  });
  const location = useLocation();
  useEffect(() => {
    console.log("set location:", location.pathname);
    localStorage.setItem("location", location.pathname);
  }, [location.pathname]);
  return (
    <Route path={path}>
      {!token ? <Redirect from={path} to={routes.login}></Redirect> : component}
    </Route>
  );
}
