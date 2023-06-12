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
let props_history: RouteComponentProps[] = [];

Object.assign(window, { props_history });
export function MemberOnlyRoute(props: { path: string }) {
  const { path } = props;

  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("location", location.pathname);
  }, [location.pathname]);
  return <Route path={path}></Route>;
}
