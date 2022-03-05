import { NextRouter } from "next/router";
import { OrderFormType } from "types";

export const organizeFormData = (
  type: "add" | "edit",
  data: OrderFormType,
  image: Blob | null
) => {
  const organizedData = {
    ...data,
    "card-public": true,
    "order-no":
      type === "add"
        ? `${data["order-no"]}?${new Date().getTime()}`
        : data["order-no"],
    "card-title": `${data["card-baby-name"]}-彌月卡`,
    "order-expired-at": new Date(data["order-expired-at"]).toJSON(),
    "card-baby-birthday": new Date(data["card-baby-birthday"]).toJSON(),
    "order-users-email": [data["email-1"] || "", data["email-2"] || ""],
  };
  delete organizedData["email-1"];
  delete organizedData["email-2"];

  const formData = new FormData();

  for (const name in organizedData) {
    if (name !== "card-photo") formData.append(name, organizedData[name]);
  }
  if (!!image)
    formData.append(
      "card-photo",
      image,
      `${data["card-baby-name"] + new Date().getTime()}.png`
    );

  if (!image) formData.append("card-photo", "");

  return formData;
};

export const postErrorCode = (message: string): string => {
  if (message.includes("token")) return "Token不存在。";

  return "未知錯誤，請稍後再試。";
};

export const forceBackToOrderNotify = (
  showNotify: (
    type: "open" | "close",
    title?: string,
    message?: string,
    action?: () => void,
    force?: boolean
  ) => void,
  title: string,
  content: string,
  router: NextRouter
) =>
  showNotify(
    "open",
    title,
    content,
    () => {
      showNotify("close");
      router.replace("/vendor/order");
    },
    true
  );

export const getUsableTokens = (orderTokenList: {
  all: string[];
  used: string[];
}) => {
  const usableTokenList = [];
  orderTokenList.all.forEach((token) => {
    if (!orderTokenList.used.includes(token)) usableTokenList.push(token);
  });
  return usableTokenList;
};
