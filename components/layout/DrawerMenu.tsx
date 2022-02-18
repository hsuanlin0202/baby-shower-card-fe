import clsx from "clsx";
import { PathTypes } from "types";

type Props = {
  list: PathTypes[];
  pushPage: (path: string) => void;
  isOpen: boolean;
  onClick: (e: boolean) => void;
};
export const DrawerMenu = ({
  list,
  pushPage,
  isOpen,
  onClick,
}: Props): JSX.Element => {
  const pushPageHandler = (path: string): void => {
    onClick(false);
    pushPage(path);
  };
  return (
    <div
      className={clsx(
        "w-screen h-screen md:hidden top-0 left-0 z-100",
        isOpen ? "fixed" : "hidden"
      )}
    >
      <div
        className="w-screen h-screen bg-black opacity-50"
        onClick={() => onClick(false)}
      ></div>
      <div className="absolute top-0 w-4/5 h-screen p-6 flex flex-col items-start space-y-4 bg-white z-10">
        {list.map((item, index) => (
          <button
            key={`menu-button-${index}`}
            type="button"
            onClick={() => pushPageHandler(item.path)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};
