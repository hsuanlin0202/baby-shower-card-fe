import clsx from "clsx";
import { NextRouter } from "next/router";
import { mockData } from "api";
import Form from "components/elements/form";
import { TableItem } from "./TableItem";
import { TopSection } from "./TopSection";

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

  const TableHead = [
    { width: "w-1/12", title: "序號" },
    { width: "w-3/12", title: "訂單編號" },
    { width: "w-2/12", title: "聯絡人" },
    { width: "w-3/12", title: "聯絡人手機" },
    { width: "w-3/12", title: "創建日期" },
    { width: "w-1/12", title: "啟用狀態" },
    { width: "w-1/12", title: "編輯" },
  ];

  const getStatusString = (status: number): string => {
    switch (status) {
      case 0:
        return "已停用";
      case 1:
        return "啟用中";
      default:
        return "";
    }
  };

  return (
    <div>
      <TopSection onSubmit={postSearch} />

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
          <div className="flex w-full bg-gray-300 text-center">
            {TableHead.map((item, index) => (
              <TableItem
                key={`table-head-${index}`}
                className={clsx(
                  item.width,
                  index === TableHead.length - 1 && "border-none"
                )}
                noWrap
              >
                {item.title}
              </TableItem>
            ))}
          </div>

          <div>
            {mockData.map((item, index) => (
              <div
                key={`order-${index}`}
                className={clsx(
                  "w-full flex text-center hover:bg-gray-50 border-b-2 border-white",
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                )}
              >
                <TableItem className="w-1/12">{index + 1}</TableItem>
                <TableItem className="w-3/12">{item.orderNo}</TableItem>
                <TableItem className="w-2/12">{item.customerName}</TableItem>
                <TableItem className="w-3/12">{item.customerPhone}</TableItem>
                <TableItem className="w-3/12">{item.creatDate}</TableItem>
                <TableItem
                  className={clsx(
                    "w-1/12",
                    item.status === 0 ? "text-gray-400" : "text-black"
                  )}
                >
                  {getStatusString(item.status)}
                </TableItem>
                <TableItem className="w-1/12">編輯</TableItem>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOrderPage;
