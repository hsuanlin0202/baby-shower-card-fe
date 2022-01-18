import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";
import Form from "components/elements/form";
import { useForm } from "react-hook-form";

type VendorTypes = {
  vendor: string,
  gender: string,
  contact: string,
}

const Information = (): JSX.Element => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<VendorTypes>();

  const gender = [{
    id: "man",
    label: "男",
    value: "man"
  },
  {
    id: "woman",
    label: "女",
    value: "woman"
  }
  ]
  return (
    <Layout.CMS
      name="波特鬆餅"
      role="廠商"
      pathList={vendorPath}
      router={router}
    >
      廠商資料維護
      <form className="w-full my-6 flex flex-col space-y-4">
        <div className="flex flex-row space-x-8">
          <Form.Input
            type="text"
            name="vendor"
            label="廠商名稱"
            control={control}
            required
            className="w-44"
          />
          <Form.Input
            type="radio"
            name="gender"
            label="性別"
            control={control}
            required
            options={gender}
          />
        </div>
        <Form.Input
          type="text"
          name="contact"
          label="廠商聯絡人"
          control={control}
          required
          className="w-52"
        />

      </form>
    </Layout.CMS>
  );
};

export default Information;
