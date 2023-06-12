import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { Redirect, Route, useLocation } from "react-router";
import { SignUpPage } from "../pages/SignUpPage";

import { routes } from "../routes";
console.log(Date.now());
export function RedirectForMember(props: {
  path: string;

  component: JSX.Element;
}) {
  const { path, component } = props;
  console.log("render RedirectForMember", component.type.name);
  const token = useSelector((state: RootState) => state.auth.token);
  const location = localStorage.getItem("location") || routes.home;
  return (
    <Route path={path}>
      {!token ? component : <Redirect from={path} to={location} />}
    </Route>
  );
}
