import { ReactNode, useEffect } from "react";
import Head from "next/head";
import { PathTypes } from "types";
import { SideMenu } from "./SideMenu";
import { NextRouter } from "next/router";
import { AuthStore } from "store/auth";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

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

  useEffect(() => {
    if (!username && !username) {
      router.push("/");
      return;
    }
  }, [username, role]);

  const title = `${username || ""}`;

  const pagePush = (path: string): void => {
    router.push(path);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="flex min-h-screen -mt-10 pt-10">
        <SideMenu
          title={title}
          list={pathList}
          pushPage={(path: string) => pagePush(path)}
        />
        <main className="w-4/5 h-full">
          <div className="w-full px-6 flex items-center h-16  border-b border-gray-300 text-gray-600">
            <Breadcrumbs aria-label="breadcrumb">
              {breadcrumbs.map((breadcrumb, index) => {
                if (!breadcrumb.link)
                  return (
                    <Typography color="text.primary">
                      {breadcrumb.title}
                    </Typography>
                  );
                return (
                  <Link
                    key={`breadcrumb-${index}`}
                    underline="hover"
                    color="inherit"
                    href={breadcrumb.link}
                  >
                    {breadcrumb.title}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </div>
          <div className="p-6 pb-10">{children}</div>
        </main>
      </div>
    </div>
  );
};
