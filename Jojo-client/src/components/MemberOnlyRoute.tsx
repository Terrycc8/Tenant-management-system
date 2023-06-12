import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { LoginPage } from "../pages/LoginPage";
import { Route } from "react-router";

import { ComponentType, useMemo } from "react";

export function MemberOnlyRoute(props: {
  path: string;
  component: ComponentType;
}) {
  console.log("render MemberOnlyRoute");
  const { path } = props;
  const token = useSelector((state: RootState) => {
    return state.auth.token;
  });
  const Child = props.component;
  return useMemo(
    () => <Route path={path}>{!token ? <LoginPage /> : <Child />}</Route>,
    [path, token, Child]
  );
}
