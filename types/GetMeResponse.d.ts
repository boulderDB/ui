export type ShowMeResponse = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  roles: string[];
  visible: boolean;
  image: string;
  lastActivity: Date;
  notifications: Notification[];
};

export type UpdateMeRequest = {
  image?: string;
  email?: string;
  visible?: boolean;
  firstName?: string;
  lastName?: string;
  notifications?: Notification[];
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type Notification = {
  id: number;
  type: string;
  location: Location;
};

export type Location = {
  id: number;
  name: string;
  url: string;
};
