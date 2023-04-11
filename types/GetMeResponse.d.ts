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

// REST API TYPES
export interface PutBoulder {
  id: number;
  name: string;
  status: "active" | "inactive";
  points: number;
  startWall: number;
  endWall: number;
  grade: number;
  internalGrade: number;
  holdType: number;
  tags: number[];
  setters: number[];
}
