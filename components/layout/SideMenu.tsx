import { PathTypes } from "types";

type Props = {
  list: PathTypes[];
  pushPage: (path: string) => void;
};
export const SideMenu = ({ list, pushPage }: Props): JSX.Element => {
  return (
    <div className="w-1/5 border-r border-gray-300 p-6 flex flex-col items-start space-y-4">
      {list.map((item, index) => (
        <button
          key={`menu-button-${index}`}
          type="button"
          onClick={() => pushPage(item.path)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};
