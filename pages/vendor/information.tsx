import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";
import Form from "components/elements/form";
import { useForm } from "react-hook-form";
import { Button } from "components/elements";
import { VendorTypes } from "types";
import { InputLayout } from "components/pages/vendor/information";
import { locations } from "constant/locations";

const Information = (): JSX.Element => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<VendorTypes>();

  const country = locations.map((location) => location.country);

  const onSubmit = (data: VendorTypes): void => {
    console.log(data);
  };

  return (
    <Layout.CMS
      pathList={vendorPath}
      router={router}
      breadcrumbs={[{ title: "廠商資料維護", link: "" }]}
    >
      廠商資料維護
      <form
        className="w-full my-6 flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputLayout label="廠商名稱">
          <Form.Input
            type="text"
            name="vendor"
            label="廠商名稱"
            control={control}
            required
            className="w-1/4"
          />
        </InputLayout>

        <InputLayout label="聯絡人">
          <Form.Input
            type="text"
            name="contact"
            label="聯絡人"
            control={control}
            required
            className="w-1/4"
          />
        </InputLayout>

        <InputLayout label="聯絡電話">
          <Form.Input
            type="text"
            name="tel"
            label="聯絡電話"
            control={control}
            required
            className="w-1/4"
          />
        </InputLayout>

        <InputLayout label="電子信箱">
          <Form.Input
            type="text"
            name="email"
            label="電子信箱"
            control={control}
            required
            className="w-full"
          />
        </InputLayout>

        <InputLayout label="聯絡地址">
          <div className="flex space-x-4">
            <Form.Input
              type="select"
              name="country"
              options={country}
              control={control}
              required
              className="w-1/6"
            />
          </div>
          <Form.Input
            type="text"
            name="address"
            label="詳細地址"
            control={control}
            required
            className="w-full"
          />
        </InputLayout>

        <InputLayout label="營業時間">
          <Form.Input
            type="text"
            name="time"
            label="營業時間"
            control={control}
            required
            className="w-full"
          />
        </InputLayout>

        <InputLayout label="廠商說明">
          <Form.Input
            type="text"
            name="description"
            label="廠商說明"
            control={control}
            required
            className="w-full"
          />
        </InputLayout>

        <div className="w-full h-1 bg-black"></div>

        <div className="flex space-x-4">
          <Button.Basic
            type="button"
            className="border border-gray-800 text-gray-800 text-xl hover:bg-gray-600 hover:text-white "
          >
            返回
          </Button.Basic>
          <Button.Basic
            type="submit"
            className="bg-gray-600 text-white text-xl transition-all duration-500 hover:bg-gray-800"
          >
            變更資料
          </Button.Basic>
        </div>
      </form>
    </Layout.CMS>
  );
};

export default Information;
