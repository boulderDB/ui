import { AscentType, GenericOption } from "./types";

export const genders: GenericOption[] = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
  { id: "neutral", name: "Neutral" },
];

export const status: GenericOption[] = [
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" },
];

export const ascents: AscentType[] = [
  {
    id: "todo",
    name: "Todo",
    color: "#f2f2f2",
  },
  {
    id: "flash",
    name: "Flash",
    color: "#1687ff",
  },
  {
    id: "top",
    name: "Top",
    color: "#02deaf",
  },
  {
    id: "resignation",
    name: "Resignation",
    color: "#ff5d5f",
  },
];
