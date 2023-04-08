import { SelectProps } from "../components/select/select";
import { Grade, HoldType, Tag } from "./types";
import { HoldType as HoldTypeComponent } from "../components/holdType/holdType";

export const selectOptionLabels: {
  [key: string]: SelectProps<any>["getOptionLabel"];
} = {
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
