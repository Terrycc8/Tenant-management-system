import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { Redirect, Route, useLocation } from "react-router";
import { SignUpPage } from "../pages/SignUpPage";

import { routes } from "../routes";
export function RedirectForMember(props: {
  path: string;

  element: JSX.Element;
}) {
  const { path, element } = props;
  console.log("render RedirectForMember", element.type.name);
  const token = useSelector((state: RootState) => state.auth.token);
  const location = localStorage.getItem("location") || routes.home;
  return (
    <Route path={path}>
      {!token ? element : <Redirect from={path} to={location} />}
    </Route>
  );
}
