import { ReactNode } from "react";
import { Button } from "components/elements";
import { VendorInformationTypes } from "types";

type InfoSetProps = {
  title: string;
  children: ReactNode;
};
const InfoSet = ({ title, children }: InfoSetProps): JSX.Element => {
  return (
    <div className="flex text-lg">
      <h4 className="min-w-24">{title}</h4>
      {children}
    </div>
  );
};

type PartnerProps = {
  information: VendorInformationTypes;
  updateMode: (mode: "view" | "edit") => void;
};

export const PartnerView = ({
  updateMode,
  information,
}: PartnerProps): JSX.Element => {
  if (!information) return <></>;

  return (
    <section className="p-4 md:p-0 flex flex-col space-y-4">
      <h3 className="text-3xl">{information.name}</h3>

      <InfoSet title="聯絡電話">
        <p>{information.contactPhone}</p>
      </InfoSet>

      <InfoSet title="聯絡地址">
        <p>{information.contactAddress}</p>
      </InfoSet>

      <InfoSet title="聯絡信箱">
        <p>{information.contactEmail}</p>
      </InfoSet>

      <InfoSet title="營業時間">
        <p>{information.openHour}</p>
      </InfoSet>

      <hr />

      <p
        className="text-base"
        dangerouslySetInnerHTML={{
          __html: information.information.replaceAll("\n", "<br/>"),
        }}
      />

      <div className="mt-6">
        <Button.Basic
          type="submit"
          className="bg-blue-500 text-white active:bg-blue-600"
          onClick={() => updateMode("edit")}
        >
          <span>編輯</span>
        </Button.Basic>
      </div>
    </section>
  );
};
