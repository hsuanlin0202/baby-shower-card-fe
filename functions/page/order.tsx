import { OrderFormType } from "types";

export const organizeFormData = (data: OrderFormType, image: Blob) => {
  const organizedData = {
    ...data,
    "card-public": true,
    // "order-token": "porterma-2",
    "order-no": `${data["order-no"]}?${new Date().getTime()}`,
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

  formData.append(
    "card-photo",
    image,
    `${data["card-baby-name"] + new Date().getTime()}.png`
  );

  return formData;
};
