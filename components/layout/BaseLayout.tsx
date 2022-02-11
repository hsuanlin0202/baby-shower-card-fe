import Head from "next/head";
import { ReactNode } from "react";

type Props = { children: ReactNode; title?: string; className?: string };
export const Base = ({
  children,
  title = "",
  className,
}: Props): JSX.Element => {
  return (
    <div className={className}>
      <Head>
        <title>{`彌月卡 ${title && `| ${title}`}`}</title>
      </Head>

      {children}
    </div>
  );
};
