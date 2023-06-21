export const prefix = "/tab";

export const routes = {
  // login: "/login",
  // signup: "/signup",
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
  login: "/user/login",
  signup: "/user/signup",
  property: "/property",
  event: "/event",
  user: "/user",
  chatroom: "/chat",
  index: "/",
  profile: "/user/profile",
  tenant: "/user/tenant",
  payment: "/payment",
  message: "/messages",
};
