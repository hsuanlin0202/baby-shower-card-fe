import { PathTypes } from "types";

type Props = {
  title: string;
  list: PathTypes[];
  pushPage: (path: string) => void;
};
export const SideMenu = ({ title, list, pushPage }: Props): JSX.Element => {
  return (
    <div className="w-1/5 border-r border-gray-300">
      <header className="w-full px-6 text-lg font-medium h-16 leading-16 border-b border-gray-300 text-gray-600">
        <span>{title}</span>
      </header>

      <div className="p-6 flex flex-col items-start space-y-4">
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
    </div>
  );
};
