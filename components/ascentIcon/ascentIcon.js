import { Flash, Resignation, Todo, Top } from "../icon/icon";

const icons = {
  top: Top,
  flash: Flash,
  resignation: Resignation,
  todo: Todo,
};

export function getIcon(type) {
  type = type.replace("-pending-doubt", "");

  return icons[type.toLowerCase()];
}

export default function AscentIcon({ type, fill }) {
  if (!type) {
    return null;
  }

  const doubted = type.includes("-pending-doubt");
  const Icon = getIcon(type.replace("-pending-doubt", "").toLowerCase());

  return <Icon fill={fill} style={{ opacity: doubted ? 0.5 : 1 }} />;
}
