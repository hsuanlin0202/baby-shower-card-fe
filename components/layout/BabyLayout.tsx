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
      <div className="card-background-image text-color w-full flex justify-center">
        <div className="w-screen h-screen glass hidden md:block" />

        <div className="card-background-image shadow-lg static md:fixed top-0 w-full md:w-phone h-auto md:h-screen m-0 pt-4 flex flex-col items-center justify-between space-y-4 overflow-auto md:overflow-y-scroll">
          {children}
        </div>
      </div>
    </Layout.Base>
  );
};
