export type Boulder = {
  group: any;
  id: number;
  name: string;
  holdType: HoldType;
  grade: Grade;
  internalGrade: Grade;
  startWall: Wall;
  endWall: Wall;
  status: string;
  points: number;
  ascents: Ascent[];
  comments: any[];
  tags: HoldType[];
  setters: Setter[];
  readableIdentifier: null;
  userAscent: Ascent | null;
  currentPoints: number;
  createdAt: Date;
  areas: HoldType[];
};

export type HoldType = {
  id: number;
  name: string;
  walls?: Wall[];
  active: boolean;
  image: string;
  emoji?: string;
};

export type Wall = {
  id: number;
  name: string;
  description: string;
  media: string;
  active: boolean;
};

export type Ascent = {
  id: number;
  user: User;
  type: "top" | "flash" | "resignation" | "todo";
  score: number;
  createdAt: Date;
};

export type AscentType = {
  id: Ascent["type"];
  name: string;
  color: string;
};

export type Grade = {
  id: number;
  name: string;
  position: number;
  color: string;
  active: boolean;
};

export type Setter = {
  id: number;
  username: string;
  user: User;
  active: boolean;
  createdAt: Date;
};

export type Location = {
  id: number;
  name: string;
  url: string;
};

export type Notification = {
  id: number;
  type: "doubt";
  location: Location;
};

export type User = {
  id: number;
  username: string;
  gender: string;
  roles: string[];
  visible: boolean;
  image: null | string;
  lastActivity: Date | string;
  email?: string;
  firstName?: string;
  lastName?: string;
  notifications?: Notification[];
};

export type TokenPayload = {
  iat: number;
  exp: number;
  roles: string[];
  user: User;
  username: string;
  lastVisitedLocation: Location;
};

export type LoginResponse = {
  expiration: number;
  lastVisitedLocation: Location;
  target: string | null;
  user: User;
};

export type AccountResponse = {};

export type Gender = {
  id: string;
  name: string;
};

export type UploadResponse = {
  file: string;
};

export type FormErrorResponse = {
  code: 400;
  errors: {
    [key: string]: string[];
  };
  message: string;
  type: "formError";
};

export type ServerErrorResponse = {
  code: 400 | 401 | 500;
  message: string;
};

export type ErrorReponse = FormErrorResponse | ServerErrorResponse;
