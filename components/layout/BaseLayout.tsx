import Head from "next/head";
import { ReactNode } from "react";

type Props = { children: ReactNode; title: string };
export const BaseLayout = ({ children, title }: Props): JSX.Element => {
  return (
    <div>
      <Head>
        <title>{`彌月卡片 ${!!title && `| ${title}`}`}</title>
      </Head>

      {children}
    </div>
  );
};
