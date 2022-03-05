import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { PathTypes } from "types";
import { SideMenu } from "./SideMenu";
import { NextRouter } from "next/router";
import { AuthStore } from "store/auth";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { DrawerMenu } from "./DrawerMenu";

type Props = {
  pathList: PathTypes[];
  router: NextRouter;
  children: ReactNode;
  breadcrumbs: { link: string; title: string }[];
};

export const CMS = ({
  pathList,
  children,
  router,
  breadcrumbs,
}: Props): JSX.Element => {
  const { username, role } = AuthStore((state) => ({
    username: state.username,
    role: state.role,
  }));

  const [isOpenDrawer, setOpenDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (!username && !username) {
      router.push("/");
      return;
    }
  }, [username, role]);

  const pagePush = (path: string): void => {
    router.push(path);
  };

  const title = "卡寶之心";

  return (
    <div className="">
      <Head>
        <title>卡寶之心</title>
      </Head>

      <div className="flex md:hidden w-full p-4 bg-white justify-between items-center border-b border-gray-300">
        <button type="button" className="" onClick={() => setOpenDrawer(true)}>
          <span>
            <DehazeIcon />
          </span>
        </button>
        <h1 className=" text-2xl font-bold">{title}</h1>
        <div></div>
      </div>

      <div className="flex min-h-screen -mt-10 pt-10">
        <SideMenu
          title={title}
          list={pathList}
          pushPage={(path: string) => pagePush(path)}
          currentPage={router.pathname}
        />

        <DrawerMenu
          list={pathList}
          pushPage={(path: string) => pagePush(path)}
          isOpen={isOpenDrawer}
          onClick={(e) => setOpenDrawer(e)}
        />

        <main className="w-full md:w-4/5 h-screen overflow-y-scroll">
          <div className="w-full px-6 flex items-center h-16 bg-white shadow-md">
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs.map((breadcrumb, index) => {
                if (!breadcrumb.link)
                  return (
                    <Typography
                      key={`breadcrumb=${index}`}
                      color="text.primary"
                    >
                      <span className="text-brown-cis">{breadcrumb.title}</span>
                    </Typography>
                  );
                return (
                  <Link
                    key={`breadcrumb-${index}`}
                    underline="hover"
                    color="inherit"
                    href={breadcrumb.link}
                  >
                    <span className="text-brown-cis">{breadcrumb.title}</span>
                  </Link>
                );
              })}
            </Breadcrumbs>
          </div>
          <div className="p-0 md:p-6 md:pb-10">{children}</div>
        </main>
      </div>
    </div>
  );
};
