import { ROUTE } from "@/config/route.config";

export interface SidebarLink {
  text: string;
  path: ROUTE;
  auth: string;
  action?: string;
}

export const sidebarLinks: SidebarLink[] = [
  { text: "navigation.dashboard", path: ROUTE.DASHBOARD, auth: "auth" },
  { text: "navigation.settings", path: ROUTE.USER_SETTINGS, auth: "auth" },
  { text: "actions.logIn", path: ROUTE.LOGIN, auth: "public" },
  { text: "actions.register", path: ROUTE.REGISTER, auth: "public" },
  {
    text: "actions.logOut",
    path: ROUTE.LANDING_PAGE,
    auth: "auth",
    action: "logout",
  },
];
