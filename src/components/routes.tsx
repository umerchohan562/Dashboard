import { JSX } from "react";
import Home from "../pages/home";
import Users from "@/pages/users";
import Tool1 from "@/pages/Settings/tool1";
import Tool2 from "@/pages/Settings/tool2";
import Tool3 from "@/pages/Settings/tool3";
import { Home as HomeIcon, Users as UsersIcon, Settings as SettingsIcon, PillBottle, Plane, Crown } from "lucide-react";

export interface RouteType {
  path: string;
  label: string;
  element?: JSX.Element; // optional for parent dropdown
  icon: JSX.Element;
  children?: RouteType[]; // for dropdown
}

export const routes: RouteType[] = [
  {
    path: "/",
    label: "Home",
    element: <Home />,
    icon: <HomeIcon size={20} />,
  },
  {
    path: "/users",
    label: "Users",
    element: <Users />,
    icon: <UsersIcon size={20} />,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: <SettingsIcon size={20} />,
    children: [  // dropdown
      {
        path: "/settings/tool1",
        label: "Tool 1",
        element: <Tool1 />,
        icon: <PillBottle size={16} />,
      },
      {
        path: "/settings/tool2",
        label: "Tool 2",
        element: <Tool2 />,
        icon: <Plane size={16} />,
      },
      {
        path: "/settings/tool3",
        label: "Tool 3",
        element: <Tool3 />,
        icon: <Crown size={16} />,
      },
    ],
  },
];
