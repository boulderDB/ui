import { forwardRef, useEffect, useRef } from "react";

export default function IndeterminateCheckbox() {
  return forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  });
}
