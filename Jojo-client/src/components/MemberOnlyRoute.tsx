import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { LoginPage } from "../pages/LoginPage";
import { Route } from "react-router";
import { memo } from "react";
import { LoginRegisterPage } from "../pages/LoginRegisterPage";

export let MemberOnlyRoute = memo(
  (props: { path: string; children: JSX.Element }) => {
    const { path } = props;
    const token = useSelector((state: RootState) => {
      return state.auth.token;
    });

    const Child = props.children;
    return <Route path={path}>{!token ? <LoginRegisterPage /> : Child}</Route>;
  }
);
