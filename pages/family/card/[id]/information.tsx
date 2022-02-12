import Layout from "components/layout";
import { useRouter } from "next/router";

const CardInformation = (): JSX.Element => {
  const router = useRouter();

  const cardId = router.query.id;

  return <Layout.Base>聯絡廠商</Layout.Base>;
};

export default CardInformation;
