import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  className?: string;
  type: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
};
const Basic = ({
  className,
  type,
  children,
  onClick = () => {},
  icon,
  disabled,
}: Props): JSX.Element => {
  return (
    <button
      className={clsx(
        "flex justify-center items-center space-x-1 text-base font-bold rounded-lg py-2 px-4 min-w-20 tracking-wider hover:shadow-lg",
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {!!icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export const Button = { Basic };
