import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { LoginPage } from "../pages/LoginPage";
import {
  Redirect,
  Route,
  RouteComponentProps,
  useLocation,
} from "react-router";

import { routes } from "../routes";
import { useCallback, useEffect } from "react";
import { SignUpPage } from "../pages/SignUpPage";
let props_history: RouteComponentProps[] = [];

Object.assign(window, { props_history });
export function MemberOnlyRoute(props: {
  path: string;
  component: JSX.Element;
}) {
  const { path, component } = props;
  const token = useSelector((state: RootState) => {
    return state.auth.token;
  });
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("location", location.pathname);
  }, [location.pathname]);
  return (
    <Route path={path}>
      {!token ? (
        <SignUpPage />
      ) : (
        <Redirect from={routes.signup} to={location} />
      )}
    </Route>
  );
}
