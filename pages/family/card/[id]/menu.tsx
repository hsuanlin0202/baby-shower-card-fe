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
    <Layout.Base className="card-background-image h-screen">
      <nav className="p-4 bg-white bg-opacity-25">
        <div className="w-11 h-11 bg-gray-900"></div>
      </nav>
      <div className="grid grid-cols-1 px-24 space-y-8 pt-10">
        {familyPath.map((path, index) => (
          <button
            key={`path-button-${index}`}
            type="button"
            className="bg-brown-cis rounded-lg py-3 text-white"
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
