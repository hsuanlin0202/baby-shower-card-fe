import clsx from "clsx";

type Props = {
  className?: string;
  children: string | number;
  noWrap?: boolean;
};
export const TableItem = ({
  className,
  children,
  noWrap,
}: Props): JSX.Element => {
  return (
    <div
      className={clsx(
        "py-4 border-r-2 border-white",
        noWrap && "whitespace-nowrap",
        className
      )}
    >
      {children}
    </div>
  );
};
