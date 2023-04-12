import { Option } from "../components/select/select";

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type Role = "ROLE_ADMIN" | "ROLE_SETTER" | "ROLE_SUPER_ADMIN";

export type Event = {
  id: number;
  name: string;
  visible: boolean;
  boulders: Boulder[];
  participants?: Participant[];
  public: boolean;
  startDate: string;
  endDate: string;
  ranking?: "defaultPoints" | "ascent";
  isParticipant: boolean;
  state: "ended" | "active" | "upcoming";
};

export type Participant = {
  id: number;
  username: string;
  gender: Gender;
  roles: Role[];
  visible: boolean;
  image: null | string;
  lastActivity: string;
};

export type Boulder = {
  id: number;
  name: string;
  holdType: HoldType;
  grade: Grade;
  internalGrade?: Grade;
  startWall: Wall;
  endWall: Wall;
  status: string;
  points: number;
  ascents: Ascent[];
  comments: Comment[];
  tags: Tag[];
  setters: Setter[];
  readableIdentifier: null;
  userAscent: Ascent | null;
  currentPoints: number;
  createdAt: string;
  areas: Area[];
};

export type Comment = {
  id: number;
  message: string;
  author: User;
};

export type Rank = {
  user: User;
  top: {
    count: number;
    rate: number;
  };
  flash: {
    count: number;
    rate: number;
  };
  total: {
    count: number;
    rate: number;
  };
  points: number;
};

export type Area = {
  id: number;
  name: string;
  active: boolean;
};

export type Tag = {
  id: number;
  emoji: string;
  name: string;
  active: boolean;
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

export type InvalidAscentType = "resignation";
export type ValidAscentType = "todo" | "top" | "flash";
export type DoubtedAscentTyp = "top-pending-doubt" | "flash-pending-doubt";

export type Ascent = {
  id: number;
  user: User;
  type: InvalidAscentType | InvalidAscentType | DoubtedAscentType;
  score: number;
  createdAt: string;
};

export type AscentType = {
  id: Ascent["type"];
  name: string;
  color: string;
};

export type GenericOption = {
  name: string;
} & Option;

export type Status = {
  id: "active" | "inactive";
  name: "Active" | "Inactive";
};

export type Grade = {
  id: number;
  name: string;

  ition: number;
  color: string;
  active: boolean;
};

export type Setter = {
  id: number;
  username: string;
  user: User;
  active: boolean;
  createdAt: string;
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
  gender: "male" | "female" | "neutral";
  visible: boolean;
  image: null | string;
  lastActivity: string;
  roles?: string[];
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

export type PostLoginData = {
  username: string;
  password: string;
};

export type PostLoginResponse = {
  expiration: number;
  lastVisitedLocation: Location;
  target: string | null;
  user: User;
};
