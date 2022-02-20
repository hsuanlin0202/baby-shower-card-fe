import Layout from "components/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthStore } from "store/auth";
import { VendorInformationTypes } from "types";

const CardInformation = (): JSX.Element => {
  const router = useRouter();

  const cardId = router.query.id;

  const { partners } = AuthStore((state) => ({
    partners: state.partners,
  }));

  const partner = partners[0];

  useEffect(() => {
    console.log(partner);
  }, []);

  return (
    <Layout.Base className="card-background-image h-screen flex flex-col">
      <nav className="p-4 bg-white bg-opacity-25">
        <div className="w-11 h-11 bg-gray-900"></div>
      </nav>
      <div className="flex flex-col mt-8 items-center px-4 justify-between flex-1">
        <form className="flex flex-col items-center text-brown-cis">
          <h2 className="text-2xl font-bold pb-5">{partner.name}</h2>
          <p>客服時段 {partner.openHour} </p>
          <p>客服專線 {partner.contactPhone} </p>
          <p>地址 {partner.contactAddress} </p>
          <p>Email {partner.contactEmail} </p>
        </form>

        <button
          className="px-16 bg-brown-cis rounded-lg py-3 text-white my-4"
          type="button"
          onClick={() => router.push("/family")}
        >
          返回
        </button>
      </div>
    </Layout.Base>
  );
};

export default CardInformation;
