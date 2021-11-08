export function Burger(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 17" fill="none" {...props}>
      <path
        d="M1 8.714h24M1 1h24M1 16h24"
        stroke="#000"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Close({ ...rest }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M11.295 12.002L6 17.297l.707.707 5.295-5.295 5.295 5.295.707-.707-5.295-5.295 5.295-5.295L17.297 6l-5.295 5.295L6.707 6 6 6.707l5.295 5.295z"
        fill="#333"
      />
    </svg>
  );
}
