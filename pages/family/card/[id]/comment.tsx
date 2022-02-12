import Layout from "components/layout";
import { useRouter } from "next/router";

const CardComment = (): JSX.Element => {
  const router = useRouter();

  const cardId = router.query.id;

  return <Layout.Base>管理留言{cardId}</Layout.Base>;
};

export default CardComment;
