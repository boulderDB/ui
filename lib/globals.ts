import { AscentType } from "./types";

export const genders = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "neutral", label: "Neutral" },
];

export const status = [
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
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
