import { AppStrings } from "../constants/AppStrings";

export const navigtaionConfig = [
  {
    title: AppStrings.navigationTabs.home,
    link: "/dashboard",
    activeIconName: "iconamoon:home-fill",
    inactiveIconName: "iconamoon:home-light",
  },
  {
    title: AppStrings.navigationTabs.chat,
    link: "/chat",
    activeIconName: "heroicons-solid:chat",
    inactiveIconName: "heroicons-outline:chat",
  },
  {
    title: AppStrings.navigationTabs.growths,
    link: "/growth",
    activeIconName: "fluent:arrow-growth-24-filled",
    inactiveIconName: "fluent:arrow-growth-24-filled",
  },
  {
    title: AppStrings.navigationTabs.profile,
    link: "/user-profile",
    activeIconName: "fa-solid:user",
    inactiveIconName: "fa-regular:user",
  },
];
