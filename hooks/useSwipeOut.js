aimport { useContext } from "react";
import { SwipeOutContext } from "../components/swipeOut/swipeOut";

export default function useSwipeOut() {
  return useContext(SwipeOutContext);
}
