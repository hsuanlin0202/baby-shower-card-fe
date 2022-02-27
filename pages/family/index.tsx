import Layout from "components/layout";
import { useInitData } from "hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthStore } from "store/auth";

type InputTypes = { code: string };
export default function FamilyCardList() {
  const router = useRouter();

  const { showNotify, openLoader } = useInitData();

  const { token, userId, orders } = AuthStore((state) => ({
    token: state.token,
    userId: state.id,
    orders: state.orders,
  }));

  useEffect(() => {
    if (!userId || !orders || orders.length === 0) {
      showNotify("open", "目前沒有卡片", "請聯絡您的彌月禮廠商。", () => {
        router.push("/");
      });
      return;
    }

    if (orders.length === 1) {
      pushBabyCardPage(orders[0]);
      return;
    }

    // 要去get卡片資料
  }, [userId, orders]);

  const pushBabyCardPage = (orderId: string | number): void => {
    router.push(`/family/card/${orderId}/menu`);
  };

  if (!orders || orders.length <= 1) return <></>;

  return (
    <Layout.Base
      title="卡寶之心"
      className="w-screen h-screen flex justify-center items-center bg-gray-700"
    >
      這位客人有的卡片列表
      {orders.map((order, index) => (
        <button
          key={index}
          className="bg-red-400 text-white p-2"
          onClick={() => pushBabyCardPage(order)}
        >
          {order}
        </button>
      ))}
    </Layout.Base>
  );
}
