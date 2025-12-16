import { ROUTE } from "@/config/route.config";

export interface SidebarLink {
  text: string;
  path: ROUTE;
  auth: string;
  action?: string;
}

export const sidebarLinks: SidebarLink[] = [
  { text: "Dashboard", path: ROUTE.DASHBOARD, auth: "auth" },
  { text: "Settings", path: ROUTE.USER_SETTINGS, auth: "auth" },
  { text: "Log in", path: ROUTE.LOGIN, auth: "public" },
  { text: "Register", path: ROUTE.REGISTER, auth: "public" },
  { text: "Logout", path: ROUTE.LANDING_PAGE, auth: "auth", action: "logout" },
];
