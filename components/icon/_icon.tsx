/* Adding icons:
 *
 * Copy paste as SVG or export from Figma
 * Paste SVG to https://react-svgr.com/playground/?replaceAttrValues=%23212121%3DcurrentColor&svgoConfig=%7B%0A%20%20%22plugins%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22name%22%3A%20%22preset-default%22%2C%0A%20%20%20%20%20%20%22params%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22overrides%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22removeTitle%22%3A%20false%2C%0A%22removeViewBox%22%3A%20false%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%5D%0A%7D
 * Copy the JSX output and render it by a dedicated component
 * Register the component with a name in the map object
 */
export const Icons = {
  burger: (props) => (
    <svg
      width={26}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 8.714h24M1 1h24M1 16h24"
        stroke="#000"
        strokeLinecap="round"
      />
    </svg>
  ),
  close: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M11.295 12.002L6 17.297l.707.707 5.295-5.295 5.295 5.295.707-.707-5.295-5.295 5.295-5.295L17.297 6l-5.295 5.295L6.707 6 6 6.707l5.295 5.295z"
        fill="#333"
      />
    </svg>
  ),
  down: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="#fff" fillOpacity={0.01} d="M0 0h24v24H0z" />
      <path
        d="M7 9l5.102 6L17 9"
        stroke="#333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (props) => (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#fff" fillOpacity={0.01} d="M0 0h24v24H0z" />
      <path
        clipRule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        stroke="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.27 7h1.92l-.21 6.675h-1.515L11.27 7Zm.075 9.765c-.23-.22-.345-.5-.345-.84 0-.34.115-.625.345-.855.23-.23.525-.345.885-.345s.66.115.9.345c.24.23.36.515.36.855 0 .34-.12.62-.36.84-.24.22-.54.33-.9.33s-.655-.11-.885-.33Z"
        fill="currentColor"
      />
    </svg>
  ),
  plus: (props) => (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 5h-1v6.5H5v1h6.5V19h1v-6.5H19v-1h-6.5V5Z"
        fill="currentColor"
      />
    </svg>
  ),
  right: (props) => (
    <svg
      width={50}
      height={50}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0h50v50H0V0Z"
        fill="#fff"
        fillOpacity={0.01}
      />
      <path d="M29.34 17 37 24.5m0 0L29.34 32M37 24.5H13" stroke="#000" />
    </svg>
  ),
  chevronDown: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="currentColor" fillOpacity={0.01} d="M0 0h24v24H0z" />
      <path
        d="M7 9l5.102 6L17 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chevronUp: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="currentColor" fillOpacity={0.01} d="M0 0h24v24H0z" />
      <path
        d="M7 15l5.102-6L17 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  top: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M0 0h24v24H0V0z" />
      <path
        d="M9.235 17.463l-.242.241L4 12.711l.707-.707 4.29 4.289L19.288 6l.707.707L9.238 17.466l-.003-.003z"
        fill={"currentColor"}
      />
    </svg>
  ),
  flash: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M0 0h24v24H0V0z" />
      <path
        d="M12 5.293L7.646 9.646l.708.708L11.5 7.207V18h1V7.207l3.146 3.147.708-.708L12 5.293z"
        fill={"currentColor"}
      />
    </svg>
  ),
  resignation: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M0 0h24v24H0V0z" />
      <path
        d="M11.295 12.002L6 17.297l.707.707 5.295-5.295 5.295 5.295.707-.707-5.295-5.295 5.295-5.295L17.297 6l-5.295 5.295L6.707 6 6 6.707l5.295 5.295z"
        fill={"currentColor"}
      />
    </svg>
  ),
  todo: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M0 0h24v24H0V0z" />
      <circle cx={12} cy={12} r={5.5} stroke={"currentColor"} />
    </svg>
  ),

  male: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M10.5 9.002a4.48 4.48 0 012.809.984L16.295 7H14V6h4v.705l.002.002L18 6.71V10h-1V7.71l-2.984 2.983A4.5 4.5 0 1110.5 9.002zm3.5 4.5a3.5 3.5 0 10-7 0 3.5 3.5 0 007 0z"
        fill="#333"
      />
    </svg>
  ),
  female: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15.183 13.06a4.481 4.481 0 01-2.682 1.29V16H15v1h-2.499v2.5h-1V17H9v-1h2.501v-1.65a4.5 4.5 0 113.682-1.29zm-5.657-.707a3.5 3.5 0 104.95-4.95 3.5 3.5 0 00-4.95 4.95z"
        fill="#333"
      />
    </svg>
  ),
  neutral: (props) => <span>—</span>
};

export type IconName = keyof typeof Icons;

export type IconProps = {
  name: IconName;
} & React.SVGProps<SVGElement>;

export const Icon = ({ name, ...rest }: IconProps) => {
  return typeof Icons[name] === "function" ? Icons[name](rest) : null;
};
