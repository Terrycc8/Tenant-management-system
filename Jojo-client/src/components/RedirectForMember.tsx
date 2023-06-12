import { useSelector } from "react-redux";
import { RootState } from "../RTKstore";
import { Redirect, Route } from "react-router";

export function RedirectForMember(props: {
  path: string;
  component: JSX.Element;
}) {
  const { path, component } = props;
  console.log("render RedirectForMember");
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Route path={path}>
      {!token ? component : <Redirect from={path} to={location} />}
    </Route>
  );
}
