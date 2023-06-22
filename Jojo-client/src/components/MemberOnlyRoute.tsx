import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { LoginPage } from "../pages/LoginPage";
import { Route } from "react-router";
import { memo } from "react";
import { LoginRegisterPage } from "../pages/LoginRegisterPage";
import { setCredentials } from "../slices/authSlice";

export let MemberOnlyRoute = memo(
  (props: { path: string; children: JSX.Element }) => {
    const tokenFromActivation = new URLSearchParams(window.location.search).get(
      "token"
    );
    const roleFromActivation = new URLSearchParams(window.location.search).get(
      "role"
    );
    const dispatch = useDispatch();

    const { path } = props;
    let token = useSelector((state: RootState) => {
      return state.auth.token;
    });
    if (!token && tokenFromActivation !== null) {
      dispatch(
        setCredentials({
          token: tokenFromActivation,
          role: roleFromActivation,
          avatar: null,
        })
      );
    }

    const Child = props.children;
    return <Route path={path}>{!token ? <LoginRegisterPage /> : Child}</Route>;
  }
);
