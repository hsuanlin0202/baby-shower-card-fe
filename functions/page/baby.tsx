export const shareLinkMobile = async (
  url: string,
  title: string,
  errorHandler: () => void
): Promise<void> => {
  const shareData = {
    title: "寶寶滿月了！",
    text: `${title}快來看看可愛的寶寶吧！`,
    url: url,
  };

  try {
    await navigator.share(shareData);
    // showNotify("open", "已分享", "");
  } catch (err) {
    console.log(err);
    // errorHandler();
  }
};
