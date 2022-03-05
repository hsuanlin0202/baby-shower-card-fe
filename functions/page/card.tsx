import { CardFormType } from "types";

export const organizeCardFormData = (
  data: CardFormType,
  image: Blob | null
) => {
  const organizedData = {
    ...data,
    "card-baby-birthday": new Date(data["card-baby-birthday"]).toJSON(),
  };

  const formData = new FormData();

  for (const name in organizedData) {
    formData.append(name, organizedData[name]);
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
