export const prefix = "/tab";
export const routes = {
  // login: "/login",
  // signup: "/signup",
  home: prefix + "/home",
  chat: prefix + "/chat",
  chatDetail: prefix + "/chat/:id",
  events: prefix + "/events",
  payments: prefix + "/payments",
  property: prefix + "/property",
  propertyDetail: prefix + "/property/:id",
};

export const apiRoutes = {
  login: "/user/login",
  signup: "/user/signup",
  property: "/property",
  event: "/event",
  user: "/user",
  chatroom: "/chatroom",
};
