// @ts-nocheck
import { useForm } from "react-hook-form";
import Form from "components/elements/form";
import { Button } from "components/elements";
import { FormGroup } from "./FormGroup";
import { useEffect } from "react";
import { AuthStore } from "store/auth";
import { getPartner, putPartner } from "api";

type PartnerProps = {
  mode: string;
  updateMode: (mode: string) => void;
};

export const PartnerDetail = ({ updateMode }: PartnerProps): JSX.Element => {
  const { control, handleSubmit, setValue } = useForm<VendorInformationTypes>();
  const onSubmit = (data: VendorInformationTypes): void => {
    console.log(data);
    putPartner(data, partners[0], token).then((res) => {
      console.log(res);
      updateMode("view");
    });
  };
  const { token, partners } = AuthStore((state) => ({
    token: state.token,
    partners: state.partners,
  }));

  useEffect(() => {
    if (!partners) return;

    getPartner(token, partners[0], []).then((res) => {
      console.log(res);

      Object.keys(res).forEach((val, _) => setValue(val as any, res[val]));
    });
  }, [partners]);
  return (
    <form
      className="w-full mb-6 flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormGroup title="廠商名稱">
        <Form.Input
          type="text"
          name="name"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="聯絡人">
        <Form.Input
          type="text"
          name="contact"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="聯絡電話">
        <Form.Input
          type="text"
          name="contactPhone"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="電子信箱">
        <Form.Input
          type="text"
          name="contactEmail"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="聯絡地址">
        <Form.Input
          type="text"
          name="contactAddress"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="營業時間">
        <Form.Input
          type="text"
          name="openHour"
          control={control}
          required
          size="small"
        />
      </FormGroup>

      <FormGroup title="廠商說明">
        <Form.Input
          type="text"
          name="information"
          control={control}
          contentSpace="w-96"
          required
          rows={3}
          size="small"
        />
      </FormGroup>

      <div className="w-full h-1 bg-black"></div>

      <div className="flex space-x-4">
        <Button.Basic
          type="button"
          className="border border-gray-800 text-gray-800 text-xl hover:bg-gray-600 hover:text-white "
          onClick={() => updateMode("view")}
        >
          返回
        </Button.Basic>
        <Button.Basic
          type="submit"
          className="bg-gray-600 text-white text-xl transition-all duration-500 hover:bg-gray-800"
        >
          確認
        </Button.Basic>
      </div>
    </form>
  );
};
