// @ts-nocheck
import { NextRouter } from "next/router";
import Form from "components/elements/form";
import { TopSection } from "./TopSection";
import { StickyHeadTable } from "./table";
import { AuthStore } from "store/auth";
import { useEffect, useState } from "react";
import { OrderListTypes } from "types";
import { getOrders, putOrder } from "api/order";
import { useInitData } from "hooks";

const SortOptions = [
  { id: "0", label: "訂單編號(由新到舊)", value: "orderNo-asc" },
  { id: "1", label: "訂單編號(由舊到新)", value: "orderNo-desc" },
  { id: "2", label: "日期時間(由新到舊)", value: "createdAt-asc" },
  { id: "3", label: "日期時間(由舊到新)", value: "createdAt-desc" },
  { id: "4", label: "手機號碼(由新到舊)", value: "phone-asc" },
  { id: "5", label: "手機號碼(由舊到新)", value: "phone-desc" },
];

type Props = {
  router: NextRouter;
};

const initPutData = {
  "order-no": "",
  "order-mobile": "",
  "order-contact": "",
  "card-close-at": "",
  "order-active": "",
  "card-baby-name": "",
  "card-public": "",
  "order-author": "",
  "order-contact-gender": "",
  "card-comment-active": "",
  "card-photo": "",
  "card-baby-birthday": "",
  "card-template": "",
  "card-mother-name": "",
  "order-users-email": "",
  "card-public-at": "",
  "order-expired-at": "",
  "card-title": "",
  "card-description": "",
  "card-father-name": "",
};

export const VendorOrderPage = ({ router }: Props): JSX.Element => {
  const [orders, setOrders] = useState<OrderListTypes[]>();

  const { showNotify, openLoader } = useInitData();

  const { token, setOrderUsedTokens } = AuthStore((state) => ({
    token: state.token,
    setOrderUsedTokens: state.setOrderUsedTokens,
  }));

  const postSearch = (data: { keyword: string }) => {
    console.log(data);
  };

  const pushPage = (id: string | number) => {
    router.push(`/vendor/order/${id}`);
  };

  useEffect(() => {
    getOrder(token);
  }, []);

  const getOrder = (token: string) => {
    openLoader(true);
    getOrders(token).then((result) => {
      console.log(result);
      openLoader(false);
      if (!result) {
        showNotify(
          "open",
          "Oops!",
          "無法連線，請再試一次",
          () => {
            router.back();
          },
          true
        );
        return;
      }

      setOrders(result);

      // set used token
      setOrderUsedTokens(result.map((order) => order.token));
    });
  };

  const changeStatus = (id: number, isOpen: boolean, orderNo: string): void => {
    const action = isOpen ? `啟用` : `關閉`;
    showNotify("open", `是否要${action}訂單？`, `訂單編號：${orderNo}`, () =>
      editOrder(id, isOpen)
    );
  };

  const editOrder = (id: number, isOpen: boolean): void => {
    const formData = new FormData();
    const data = { ...initPutData, "order-active": isOpen };
    for (const name in data) {
      formData.append(name, data[name].toString());
    }
    showNotify("close", "", "");
    openLoader(true);
    putOrder(token, id, formData).then((res) => {
      openLoader(false);
      if (!res.id) {
        showNotify("open", "修改失敗", "請稍後再試一次。");
        return;
      }
      getOrder(token);
    });
  };

  return (
    <div>
      <TopSection onSubmit={postSearch} pushPage={pushPage} />

      {/* <div className="px-4 md:p-0 mt-4 flex flex-col items-end">
        <div className="w-2/3 md:w-1/3">
          <Form.Input
            type="select"
            name="sort"
            options={SortOptions}
            onChange={(e) => console.log(e)}
          />
        </div>
      </div> */}

      <div className="mt-4 w-full overflow-x-scroll rounded-t-md">
        <div className="w-full min-w-228">
          <StickyHeadTable
            orders={orders}
            pushPage={pushPage}
            changeStatus={(id, isOpen, orderNo) =>
              changeStatus(id, isOpen, orderNo)
            }
          />
        </div>
      </div>
    </div>
  );
};
