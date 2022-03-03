import { ReactNode } from "react";
import Layout from ".";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  textColor?: string;
};
export const Baby = ({
  children,
  title = "",
  className,
  textColor,
}: Props): JSX.Element => {
  return (
    <Layout.Base title={title}>
      <style jsx>
        {`
          .text-color {
            color: ${textColor};
          }
        `}
      </style>
      <div className="card-background-image text-color w-full flex justify-center overflow-hidden">
        <div className="w-screen h-screen glass" />

        <div className="card-background-image shadow-lg fixed top-0 w-full md:w-phone h-screen m-0 pt-4 flex flex-col items-center justify-between space-y-4 overflow-y-scroll">
          {children}
        </div>
      </div>
    </Layout.Base>
  );
};
