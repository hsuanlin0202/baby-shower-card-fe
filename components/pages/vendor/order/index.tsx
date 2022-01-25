// @ts-nocheck
import { NextRouter } from "next/router";
import { mockData } from "api";
import Form from "components/elements/form";
import { TopSection } from "./TopSection";
import { StickyHeadTable } from "./table";

const SortOptions = [
  { id: "3", label: "訂單編號", value: "orderNo" },
  { id: "1", label: "日期時間", value: "createDate" },
  { id: "2", label: "手機號碼", value: "phone" },
];

type Props = {
  router: NextRouter;
};

const VendorOrderPage = ({ router }: Props): JSX.Element => {
  const postSearch = (data: { keyword: string }) => {
    console.log(data);
  };

  const pushPage = (id: string) => {
    router.push(`/vendor/order/${id}`);
  };

  return (
    <div>
      <TopSection onSubmit={postSearch} pushPage={pushPage} />

      <div className="mt-4 flex flex-col items-end">
        <Form.Input
          className="w-1/2"
          type="select"
          name="sort"
          options={SortOptions}
          onChange={(e) => console.log(e)}
        />
      </div>

      <div className="mt-4 w-full overflow-x-scroll rounded-t-md">
        <div className="w-full min-w-228">
          <StickyHeadTable data={mockData} pushPage={pushPage} />
        </div>
      </div>
    </div>
  );
};

export default VendorOrderPage;
