import clsx from "clsx";
import { useState } from "react";
import { PathTypes } from "types";

type Props = {
  title: string;
  list: PathTypes[];
  pushPage: (path: string) => void;
  currentPage: string;
};
export const SideMenu = ({
  title,
  list,
  pushPage,
  currentPage,
}: Props): JSX.Element => {
  return (
    <div className="hidden md:block w-full h-screen overflow-hidden md:w-1/5 border-r border-gray-300">
      <div className="w-full px-6 text-lg font-medium h-16 leading-16 text-white bg-brown-cis">
        <span>{title}</span>
      </div>

      <div className="py-6 h-full flex flex-col items-start bg-brown-cis">
        {list.map((item, index) => (
          <button
            key={`menu-button-${index}`}
            type="button"
            className={clsx(
              "w-full px-6 py-3 text-left",
              currentPage === item.path
                ? "text-brown-200 bg-brown-400 border-r-4 border-brown-200"
                : "text-white bg-brown-cis"
            )}
            onClick={() => pushPage(item.path)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};
