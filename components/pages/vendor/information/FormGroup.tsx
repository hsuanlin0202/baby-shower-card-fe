import { ReactNode } from "react";
import clsx from "clsx";

type FormGroupProps = {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  titleSpace?: string;
  contentSpace?: string;
};
export const FormGroup = ({
  title,
  children,
  icon,
  titleSpace = "min-w-32 md:min-w-40",
  contentSpace = "w-full md:w-56",
}: FormGroupProps): JSX.Element => {
  return (
    <div className="flex items-center mx-8 my-4">
      {!!title && (
        <div className={clsx("flex items-center", titleSpace)}>
          {icon && icon}
          <span>{title}</span>
        </div>
      )}
      <div className={contentSpace}>{children}</div>
    </div>
  );
};
