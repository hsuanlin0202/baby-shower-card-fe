import { ReactNode } from "react";
import Head from "next/head";
import { PathTypes } from "types";
import { SideMenu } from "./SideMenu";
import { NextRouter } from "next/router";
type Props = {
  name: string;
  role: string;
  pathList: PathTypes[];
  router: NextRouter;
  children: ReactNode;
};
export const CMS = ({
  name,
  role,
  pathList,
  children,
  router,
}: Props): JSX.Element => {
  const title = `${name}彌月卡片 | ${role}管理介面`;

  const pagePush = (path: string): void => {
    router.push(path);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <header className="w-full px-6 text-lg font-medium h-16 leading-16 border-b border-gray-300 text-gray-600">
        <span>{title}</span>
      </header>
      <div className="flex h-screen -mt-10 pt-10">
        <SideMenu list={pathList} pushPage={(path: string) => pagePush(path)} />
        <main className="w-4/5 h-full p-6">{children}</main>
      </div>
    </div>
  );
};
