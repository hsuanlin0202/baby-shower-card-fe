import { ReactNode, useEffect } from "react";
import Head from "next/head";
import { PathTypes } from "types";
import { SideMenu } from "./SideMenu";
import { NextRouter } from "next/router";
import { AuthStore } from "store/auth";
import { getRoleString } from "functions/matcher";
type Props = {
  pathList: PathTypes[];
  router: NextRouter;
  children: ReactNode;
};

export const CMS = ({ pathList, children, router }: Props): JSX.Element => {
  const { username, role } = AuthStore((state) => ({
    username: state.username,
    role: state.role,
  }));

  useEffect(() => {
    if (!username && !username) {
      // router.push("/");
      return;
    }
  }, [username, role]);

  const title = `${username || ""}彌月卡片 | ${getRoleString(
    role || 0
  )}管理介面`;

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
