import clsx from "clsx";
import React, { ReactNode } from "react";

export type AlertProps = {
  id: string;
  show?: boolean;
  children?: ReactNode;
};
export const Alert = ({ id, show, children }: AlertProps) => {
  return (
    <p
      role="alert"
      aria-atomic
      id={id}
      className={clsx("text-red-500", show ? "block" : "hidden")}
    >
      {children}
    </p>
  );
};
