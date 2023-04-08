import { Grade, HoldType, Tag } from "./types";
import { HoldType as HoldTypeComponent } from "../components/holdType/holdType";

export const selectOptionLabels = {
  holdType: (option: HoldType) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <HoldTypeComponent image={option.image} />
      <span
        style={{
          marginLeft: 8,
        }}
      >
        {option.name}
      </span>
    </div>
  ),
  tag: (option: Tag) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>{option.emoji}</span>

      <span
        style={{
          marginLeft: 8,
        }}
      >
        {option.name}
      </span>
    </div>
  ),
  grade: (option: Grade) => (
    <span style={{ color: option.color }}>Grade {option.name}</span>
  ),
};
