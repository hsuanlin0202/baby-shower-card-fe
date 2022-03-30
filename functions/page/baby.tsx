export const shareLinkMobile = async (
  url: string,
  title: string,
  errorHandler: () => void
): Promise<void> => {
  const shareData = {
    title: "寶寶滿月了！",
    text: `${title}`,
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
