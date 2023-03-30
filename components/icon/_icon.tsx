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
  top: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M0 0h24v24H0V0z" />
      <path
        d="M9.235 17.463l-.242.241L4 12.711l.707-.707 4.29 4.289L19.288 6l.707.707L9.238 17.466l-.003-.003z"
        fill={"currentColor"}
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
        stroke="red"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.27 7h1.92l-.21 6.675h-1.515L11.27 7Zm.075 9.765c-.23-.22-.345-.5-.345-.84 0-.34.115-.625.345-.855.23-.23.525-.345.885-.345s.66.115.9.345c.24.23.36.515.36.855 0 .34-.12.62-.36.84-.24.22-.54.33-.9.33s-.655-.11-.885-.33Z"
        fill="red"
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
      <path fill="#fff" d="M0 0h24v24H0z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 5h-1v6.5H5v1h6.5V19h1v-6.5H19v-1h-6.5V5Z"
        fill="#333"
      />
    </svg>
  ),
};

export type IconName = keyof typeof Icons;

export type IconProps = {
  name: IconName;
} & React.SVGProps<SVGElement>;

export const Icon = ({ name, ...rest }: IconProps) => {
  return name ? Icons[name](rest) : null;
};
