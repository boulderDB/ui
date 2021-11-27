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

export function Close(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M11.295 12.002L6 17.297l.707.707 5.295-5.295 5.295 5.295.707-.707-5.295-5.295 5.295-5.295L17.297 6l-5.295 5.295L6.707 6 6 6.707l5.295 5.295z"
        fill="#333"
      />
    </svg>
  );
}

export function Avatar(props) {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
      <path
        clipRule="evenodd"
        d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10z"
        stroke="#9CA7E7"
      />
      <path
        d="M5 8c0 1 1 1.5 2 1.5S9 9 9 8l-.5 5H11M17 8c0 1-1 1.5-2 1.5S13 9 13 8M17 12c0 1.997-1.499 6-6.014 6-1.64 0-2.878-.53-3.79-1.3"
        stroke="#9CA7E7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Downward(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="#fff" fillOpacity={0.01} d="M0 0h24v24H0z" />
      <path
        d="M7 9l5.102 6L17 9"
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Upward(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="#fff" fillOpacity={0.01} d="M0 0h24v24H0z" />
      <path
        d="M7 15l5.102-6L17 15"
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Male(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M10.5 9.002a4.48 4.48 0 012.809.984L16.295 7H14V6h4v.705l.002.002L18 6.71V10h-1V7.71l-2.984 2.983A4.5 4.5 0 1110.5 9.002zm3.5 4.5a3.5 3.5 0 10-7 0 3.5 3.5 0 007 0z"
        fill="#333"
      />
    </svg>
  );
}

export function Female(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15.183 13.06a4.481 4.481 0 01-2.682 1.29V16H15v1h-2.499v2.5h-1V17H9v-1h2.501v-1.65a4.5 4.5 0 113.682-1.29zm-5.657-.707a3.5 3.5 0 104.95-4.95 3.5 3.5 0 00-4.95 4.95z"
        fill="#333"
      />
    </svg>
  );
}

export function Top({ fill = true, ...rest }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
      <path d="M0 0h24v24H0V0z" />
      <path
        d="M9.235 17.463l-.242.241L4 12.711l.707-.707 4.29 4.289L19.288 6l.707.707L9.238 17.466l-.003-.003z"
        fill={fill ? "#02DEAF" : "#000000"}
      />
    </svg>
  );
}

export function Flash({ fill = true, ...rest }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
      <path d="M0 0h24v24H0V0z" />
      <path
        d="M12 5.293L7.646 9.646l.708.708L11.5 7.207V18h1V7.207l3.146 3.147.708-.708L12 5.293z"
        fill={fill ? "#1687FF" : "#000000"}
      />
    </svg>
  );
}

export function Resignation({ fill = true, ...rest }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
      <path d="M0 0h24v24H0V0z" />
      <path
        d="M11.295 12.002L6 17.297l.707.707 5.295-5.295 5.295 5.295.707-.707-5.295-5.295 5.295-5.295L17.297 6l-5.295 5.295L6.707 6 6 6.707l5.295 5.295z"
        fill={fill ? "#FF5D5F" : "#000000"}
      />
    </svg>
  );
}

export function Todo({ fill, ...rest }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
      <path d="M0 0h24v24H0V0z" />
      <circle cx={12} cy={12} r={5.5} stroke={fill ? "#FFCB41" : "#000000"} />
    </svg>
  );
}

export function Backward(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="#fff" fillOpacity={0.01} d="M0 0h24v24H0z" />
      <path
        d="M15 7l-6 5.102L15 17"
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Forward(props) {
  return (
    <svg width={24} height={24} viewBox="0 -1 24 24" fill="none" {...props}>
      <path fill="#fff" fillOpacity={0.01} d="M0 0h24v24H0z" />
      <path
        d="M9 7l6 5.102L9 17"
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
