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
            background-color: #000;
          }
          .flex1 {
            flex: 1;
          }
        `}
      </style>
      <div className="card-background-image-dynamic text-color w-full min-h-screen md:h-phone flex flex-col  items-center">
        <div className="w-screen h-full glass hidden md:block" />
        <div className="flex-1 flex flex-col justify-between card-background-image-dynamic shadow-lg static md:fixed w-full md:w-phone h-full">
          {children}
        </div>
      </div>
    </Layout.Base>
  );
};
