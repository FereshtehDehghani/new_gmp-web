
export interface IAuthOption {
  tag: "CPHO" | "CEMA" | "CEMAPHO" | "PSS" | "TSVPSS";
  title: string;
}

export interface IAuthSettingsPayload {
  username: string;
  tag: string;
}

export interface IAuthInputField {
  type: string;
  name: string;
  required: boolean;
  label: string;
  description?: string;
  codeLength?: number;
}

interface TimeLimit {
  time: number;
  unit: string; // "min"
}

export interface IAuthSettingsResult {
  tag: string;
  inputs: IAuthInputField[];
  timeLimit: TimeLimit;
  confirmTitle: string;
}

export interface IUser {
  avatar: { lastSeen: string; text: string };
  lastName: string;
  name: string;
  phone: string;
  fullName?: string;
}

export interface ILoginHistory {
  __v: number;
  _id: string;
  createDate: string;
  expireIn: string;
  id: string;
  identifier: string;
  ip: string;
  isBlock: boolean;
}

export interface IDecodedToken {
  exp: number;
  iat: number;
  id: string;
  identifier: string;
  lastName: string;
  name: string;
  phone: string;
  type: string;
  username: string;
}

export interface IClientProfileInfo {
  name: string;
  lastName: string;
  nationalCode: string;
}

export interface TabConfig {
  name: string;
  label: string;
  icon: string;
  activeIcon: string;
}

export interface NavButtonProps {
  route: any;
  options: any;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  isDesktop: boolean;
  navTabs: TabConfig[];
}

export interface BottomTabBarProps {
  descriptors: any;
  navigation: any;
  insets: any;
  navTabs: TabConfig[];
}
