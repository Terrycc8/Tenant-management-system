import { Redirect, Route } from "react-router";
import { routes } from "../routes";
import { LoginPage } from "../pages/LoginPage";
import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { SignUpPage } from "../pages/SignUpPage";

export function RedirectUponLogin(props: { fromUrl: string; toUrl: string }) {
  const { fromUrl, toUrl } = props;
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <Route path={fromUrl}>
      {!token ? <LoginPage /> : <Redirect from={fromUrl} to={toUrl} />}
    </Route>
  );
}
export function RedirectUponSignUp(props: { fromUrl: string; toUrl: string }) {
  const { fromUrl, toUrl } = props;
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <Route path={fromUrl}>
      {!token ? <SignUpPage /> : <Redirect from={fromUrl} to={toUrl} />}
    </Route>
  );
}
