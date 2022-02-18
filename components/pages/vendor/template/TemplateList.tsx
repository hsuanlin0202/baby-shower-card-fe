import { Button } from "components/elements";
import { NextRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { StickyHeadTable } from "./Table";
import { useState, useEffect } from "react";
import { TemplateTypes } from "types";
import { getTemplates } from "api";
import { AuthStore } from "store/auth";
import { useInitData } from "hooks";

type Props = {
  router: NextRouter;
};
export const TemplateList = ({ router }: Props): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const { partner } = AuthStore((state) => ({
    partner: state.partners,
  }));

  const [templates, setTemplates] = useState<TemplateTypes[]>([]);

  const pushPage = (path: string | number) => {
    router.push(`/vendor/template/${path}`);
  };

  useEffect(() => {
    if (partner.length === 0 || templates.length > 0) {
      showNotify("open", "Oops!", "暫時無法連線，請稍後再試一次。");
      return;
    }
    openLoader(true);
    getTemplates(partner[0]).then((result) => {
      openLoader(false);
      setTemplates(result);
    });
  }, [partner]);

  return (
    <div>
      <Button.Basic
        type="button"
        className="mx-4 mt-4 md:m-0 bg-red-cis text-white leading-4 pl-2"
        icon={<AddIcon fontSize="small" />}
        onClick={() => pushPage("new")}
      >
        <span>新增</span>
      </Button.Basic>

      <hr className="my-4 border-gray-300" />

      <div className="mt-4 w-full overflow-x-scroll rounded-t-md">
        <div className="w-full">
          <StickyHeadTable templates={templates} pushPage={pushPage} />
        </div>
      </div>
    </div>
  );
};
