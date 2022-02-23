import Layout from "components/layout";
import { CardEditDetail } from "components/pages/family";
import { familyPath } from "constant/router";
import { useInitData } from "hooks";
import { useRouter } from "next/router";

const CardEdit = (): JSX.Element => {
  const { showNotify, openLoader } = useInitData();

  const router = useRouter();

  const cardId = router.query.id;

  const backAction = (): void => {
    showNotify("open", "尚未儲存訂單", "確定要返回列表頁？", () => {
      showNotify("close", "", "");
      router.back();
    });
  };

  const pagePush = (path: string): void => {
    router.push(path.replaceAll("[id]", cardId as string));
  };

  return (
    <Layout.Family
      title="編輯卡片"
      pathList={familyPath}
      router={router}
      backAction={backAction}
      pagePush={pagePush}
    >
      <CardEditDetail id={cardId as string} router={router} />
    </Layout.Family>
  );
};

export default CardEdit;
