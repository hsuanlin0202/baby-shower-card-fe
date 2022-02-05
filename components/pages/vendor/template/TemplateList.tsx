import { Button } from "components/elements";
import { NextRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { StickyHeadTable } from "./Table";

const mock = [
  {
    id: 1,
    name: "藍色東京",
    partnerName: "蜜絲阿法",
    logoImage: "",
    backgroundImage: "",
    color: "",
    active: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 2,
    name: "粉色巴黎",
    partnerName: "蜜絲阿法",
    logoImage: "",
    backgroundImage: "",
    color: "",
    active: true,
    createdAt: "",
    updatedAt: "",
  },
];

type Props = {
  router: NextRouter;
};
export const TemplateList = ({ router }: Props): JSX.Element => {
  const pushPage = (path: string | number) => {
    router.push(`/vendor/template/${path}`);
  };
  return (
    <div>
      <Button.Basic
        type="button"
        className="bg-red-500 text-white active:bg-red-600 leading-4 pl-2"
        icon={<AddIcon fontSize="small" />}
        onClick={() => pushPage("new")}
      >
        <span>新增</span>
      </Button.Basic>

      <hr className="my-4 border-gray-300" />

      <div className="mt-4 w-full overflow-x-scroll rounded-t-md">
        <div className="w-full min-w-228">
          <StickyHeadTable templates={mock} pushPage={pushPage} />
        </div>
      </div>
    </div>
  );
};
