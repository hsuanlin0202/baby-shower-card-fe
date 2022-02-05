import { ReactNode } from "react";
import clsx from "clsx";

type FormGroupProps = {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  titleSpace?: string;
  contentSpace?: string;
  note?: ReactNode;
  required?: boolean;
};
export const FormGroup = ({
  title,
  children,
  icon,
  titleSpace = "min-w-40",
  contentSpace = "w-56",
  note,
  required = false,
}: FormGroupProps): JSX.Element => {
  return (
    <div className="mx-8 my-4">
      <div className="flex items-center">
        {!!title && (
          <div className={clsx("flex items-center", titleSpace)}>
            {icon && icon}
            <span>{title}</span>
            {required && <span className="ml-1 text-red-500">*</span>}
          </div>
        )}
        <div className={contentSpace}>{children}</div>
      </div>
      {note}
    </div>
  );
};
