import { ReactNode } from "react";
import Layout from ".";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  textColor?: string;
  background: string;
};
export const Baby = ({
  children,
  title = "",
  className,

  textColor,
  background,
}: Props): JSX.Element => {
  return (
    <Layout.Base title={title}>
      <style jsx>
        {`
          .text-color {
            color: ${textColor};
          }
          .card-background-image-dynamic {
            background-image: url("${background}");
            background-position: center;
            background-size: contain;
          }
        `}
      </style>
      <div className="card-background-image-dynamic text-color w-full flex justify-center">
        <div className="w-screen h-screen glass hidden md:block" />

        <div className="card-background-image-dynamic shadow-lg static md:fixed top-0 w-full md:w-phone h-screen m-0 pt-4 overflow-auto md:overflow-y-scroll">
          {children}
        </div>
      </div>
    </Layout.Base>
  );
};
