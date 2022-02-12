import Layout from "components/layout";
import { useRouter } from "next/router";

const CardEdit = (): JSX.Element => {
  const router = useRouter();

  const cardId = router.query.id;

  return <Layout.Base>編輯卡片{cardId}</Layout.Base>;
};

export default CardEdit;
