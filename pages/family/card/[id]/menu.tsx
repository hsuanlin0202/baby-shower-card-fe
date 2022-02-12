import Layout from "components/layout";
import { familyPath } from "constant/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
type Props = {};

const CardMenu = ({}: Props): JSX.Element => {
  const router = useRouter();

  const cardId = router.query.id;

  const pushPage = (page: string) => {
    if (page === "logout") {
      router.push("/logout");
      return;
    }

    router.push(`/family/card/${cardId}/${page}`);
  };

  useEffect(() => {
    if (window.innerWidth > 640) pushPage("edit");
  }, []);

  return (
    <Layout.Base>
      <div className="grid grid-cols-1">
        {familyPath.map((path, index) => (
          <button
            key={`path-button-${index}`}
            type="button"
            onClick={() => pushPage(path.path)}
          >
            {path.title}
          </button>
        ))}
      </div>
    </Layout.Base>
  );
};

export default CardMenu;
