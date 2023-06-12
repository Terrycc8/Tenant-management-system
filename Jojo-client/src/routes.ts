import { Route } from "react-router";
import { MemberOnlyRoute } from "./components/MemberOnlyRoute";
import { RedirectForMember } from "./components/RedirectForMember";
import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { Tab } from "./pages/Tab";

export const prefix = "/tab";
export const routes = {
  login: "/login",
  signup: "/signup",
  home: prefix + "/home",
  chat: prefix + "/chat",
  events: prefix + "/events",
  payments: prefix + "/payments",
  property: prefix + "/property",
  propertyDetail: prefix + "/property/:id",
};
export const apiUserPrefix = "/user";
export const apiRoutes = {
  login: apiUserPrefix + "login",
  signup: apiUserPrefix + "signup",
  property: "/property",
  event: "/event",
  user: "/",
  chatroom: "/chatroom",
};
