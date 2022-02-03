import { getPartner } from "api";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "components/elements";
import { AuthStore } from "store/auth";
import { VendorInformationTypes } from "types";

type PartnerProps = {
  mode: string;
  updateMode: (mode: string) => void;
};

export const PartnerView = ({ updateMode }: PartnerProps): JSX.Element => {
  const { token, partners } = AuthStore((state) => ({
    token: state.token,
    partners: state.partners,
  }));

  const [info, setInfo] = useState<VendorInformationTypes>();

  useEffect(() => {
    if (!partners) return;

    getPartner(token, partners[0], []).then((res) => {
      console.log(res);
      setInfo(res);
    });
  }, [partners]);
  return (
    <>
      {info ? (
        <section className="flex flex-col space-y-4">
          <h3 className="text-3xl">{info.name}</h3>
          <p className="text-xl">客服時段 {info.openHour}</p>
          <p className="text-xl">客服專線 {info.contactPhone}</p>
          <p className="text-xl">地址 {info.contactAddress}</p>
          <p className="text-xl">信箱 {info.contactEmail}</p>
          <div className="w-full h-1 bg-black"></div>
          <div className="flex pt-4">
            <Button.Basic
              type="button"
              className="bg-gray-600 text-white text-xl transition-all duration-500 hover:bg-gray-800"
              onClick={() => updateMode("editor")}
            >
              編輯
            </Button.Basic>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};
