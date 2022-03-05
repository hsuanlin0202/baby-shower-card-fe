import { BabyCardTypes } from "types";

export const shareLinkMobile = async (
  card: BabyCardTypes,
  errorHandler: () => void
): Promise<void> => {
  const shareData = {
    title: `${card.babyName}滿月囉！`,
    text: `${card.fatherName}爸爸和${card.motherName}媽媽的寶貝滿月了，來幫寶寶按個讚表達祝福吧！`,
    url: window.location.href,
  };

  try {
    await navigator.share(shareData);
    // showNotify("open", "已分享", "");
  } catch (err) {
    console.log(err);
    errorHandler();
  }
};
