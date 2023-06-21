export const prefix = "/tab";

export const routes = {
  // login: "/login",
  // signup: "/signup",
  tenants: prefix + "/tenants",
  home: prefix + "/home",
  chatlist: prefix + "/chat",
  chatroom: (id: string | number) => "/chat/" + id,
  events: prefix + "/events",
  payments: prefix + "/payments",
  property: prefix + "/property",
  propertyDetail: prefix + "/property/:id",
  chatDetail: prefix + "/chat/:id",
};

export const apiRoutes = {
  loginFB: "/user/login/facebook",
  login: "/user/login",
  signup: "/user/signup",
  property: "/property",
  event: "/event",
  user: "/user",
  chatroom: "/chat",
  index: "/",
  profile: "/user/profile",
  tenants: "/user/tenants",
  payment: "/payment",
  message: "/messages",
  allTenants: "/user/allTenants",
};
