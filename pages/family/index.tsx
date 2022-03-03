import { getOrders } from "api/order";
import Layout from "components/layout";
import { useInitData } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthStore } from "store/auth";
import { OrderListTypes } from "types";

type InputTypes = { code: string };
export default function FamilyCardList() {
  const router = useRouter();

  const { showNotify, openLoader } = useInitData();

  const [cards, setCards] = useState<OrderListTypes[]>([]);

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

    if (cards.length > 0) return;

    // 要去get order取得資料
    openLoader(true);

    getOrders(token).then((result) => {
      openLoader(false);
      let cards = [];
      result.forEach((card) => {
        orders.forEach((orderId) => {
          if (card.id === orderId) cards.push(card);
        });
      });
      setCards(cards);
    });
  }, [userId, orders]);

  useEffect(() => {
    if (cards.length === 1) {
      pushBabyCardPage(cards[0].token);
      return;
    }
  }, [cards]);

  const pushBabyCardPage = (orderId: string | number): void => {
    router.push(`/family/card/${orderId}/menu`);
  };

  if (!orders || orders.length === 1) return <></>;

  return (
    <Layout.Base
      title="卡寶之心"
      className="w-screen h-screen flex flex-col justify-center items-center bg-gray-700"
    >
      這位客人有的卡片列表, 還沒切UI喔
      {cards.map((card, index) => (
        <button
          key={index}
          className="bg-red-400 text-white p-2"
          onClick={() => pushBabyCardPage(card.token)}
        >
          {card.title}
        </button>
      ))}
    </Layout.Base>
  );
}
