import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { Redirect, Route } from "react-router";
import { routes } from "../routes";
import { ComponentType, memo, useMemo } from "react";

export let GuestOnlyRoute = memo(
  (props: { path: string; component: ComponentType }) => {
    const { path } = props;
    const token = useSelector((state: RootState) => state.auth.token);
    console.log("render GuestOnlyRoute", props);
    const Child = props.component;
    return (
      <Route path={path}>
        {!token ? <Child /> : <Redirect to={routes.home} />}
      </Route>
    );
  }
);
