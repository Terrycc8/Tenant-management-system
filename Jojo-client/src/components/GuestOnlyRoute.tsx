import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { Redirect, Route } from "react-router";
import { routes } from "../routes";
import { ComponentType, memo, useMemo } from "react";

export let GuestOnlyRoute = memo(
  (props: { path: string; children: JSX.Element }) => {
    const { path } = props;
    const token = useSelector((state: RootState) => state.auth.token);
    const Child = props.children;
    return (
      <Route path={path}>
        {!token ? Child : <Redirect to={routes.home} />}
      </Route>
    );
  }
);
