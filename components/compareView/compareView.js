import useDrawer from "../../hooks/useDrawer";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../pages/_app";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import Drawer from "../drawer/drawer";
import BoulderDetail from "../boulderDetail/boulderDetail";
import WallDetail from "../wallDetail/wallDetail";
import usePersistentState from "../../hooks/usePersistentState";

export default function CompareView({
  comparisons = [],
  initialFilters = [],
}) {}
