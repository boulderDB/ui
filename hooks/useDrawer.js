import { useContext } from "react";
import { DrawerContext } from "../components/drawer/drawer";

export default function useDrawer() {
  return useContext(DrawerContext);
}
