import styles from "./tooltip.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import { useEffect, useRef, useState } from "react";

export default function Tooltip({ title, children }) {
  const contentRef = useRef();
  const tooltipRef = useRef();

  const [position, setPosition] = useState({
    opacity: 0,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setPosition({
      top: contentRef.current.getBoundingClientRect().height * 1,
      left:
        (tooltipRef.current.clientWidth / 2) * -1 +
        contentRef.current.clientWidth / 2,
    });
  }, []);

  return (
    <div
      className={cn(styles.root, typography.epsilon)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        ref={tooltipRef}
        className={styles.title}
        style={{
          ...position,
          opacity: visible ? 1 : 0,
        }}
      >
        {title}
      </div>

      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  );
}
