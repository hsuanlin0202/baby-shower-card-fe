import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReactNode } from "react";
import Head from "next/head";
import { PathTypes } from "types";
import { SideMenu } from "./SideMenu";
import { NextRouter } from "next/router";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  backAction?: () => void;
  pathList: PathTypes[];
  router: NextRouter;
  pagePush: (path: string) => void;
};
export const Family = ({
  children,
  title = "",
  className,
  backAction = null,
  pathList,
  router,
  pagePush,
}: Props): JSX.Element => {
  return (
    <div className={clsx("card-background-image", className)}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="block md:hidden text-brown-cis">
        <div className="w-full p-4 pb-8">
          <div className="w-10 h-10">
            {!!backAction && (
              <button
                type="button"
                className="p-3"
                onClick={() => backAction()}
              >
                <span>
                  <ArrowBackIosIcon />
                </span>
              </button>
            )}
          </div>
        </div>

        <main className="rounded-t-3xl bg-white p-8">
          {title && <h1 className="text-2xl mb-6">{title}</h1>}
          {children}
        </main>
      </div>

      <div className="hidden md:flex h-screen">
        <SideMenu
          title="卡寶之心"
          list={pathList}
          pushPage={(path: string) => pagePush(path)}
          currentPage={router.pathname}
        />

        <div className="w-full h-screen md:w-4/5 overflow-y-scroll">
          <div className="w-full px-6 flex items-center h-16 text-brown-cis bg-white shadow">
            {pathList.find((path) => path.path === router.pathname).title}
          </div>
          <div className="p-0 md:p-6 md:pb-10">{children}</div>
        </div>
      </div>
    </div>
  );
};
