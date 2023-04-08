import cx from "classix";
import { PropsWithChildren, useState } from "react";
import utilities from "../../styles/utilities/utilities";

type LabelProps = PropsWithChildren<{}> &
  React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ children, className, ...rest }: LabelProps) {
  
  return (
    <label {...rest} className={cx(utilities.typograpy.epsilon, className)}>
      {children}
    </label>
  );
}
