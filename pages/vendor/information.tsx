import Layout from "components/layout";
import { vendorPath } from "constant/router";
import { useRouter } from "next/router";
import Form from "components/elements/form";
import { useForm } from "react-hook-form";
import { ReactNode } from "react";
import { Button } from "components/elements"

type VendorTypes = {
  vendor: string,
  gender: string,
  contact: string,
  tel: string,
  email: string,
  country: string,
  district: string,
  address: string,
  time: string,
  description: string,
}

type InputLayoutProps = {
  label: string,
  children: ReactNode
}

const country = [
  {
    id: 'Taipei',
    label: '台北市',
    value: '台北市'
  }
]

const district = [
  {
    id: 'Taipei',
    label: '台北市',
    value: '台北市'
  }
]


const InputLayout = ({ label, children }: InputLayoutProps): JSX.Element => {
  return (

    <div className="flex space-x-4">
      <label htmlFor="address" className="bg-gray-400 p-3 h-1/2 w-1/6">{label}</label>
      <div className="flex-col space-y-4 flex-1">
        {children}
      </div>
    </div>
  )
}

const Information = (): JSX.Element => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<VendorTypes>();

  return (
    <Layout.CMS
      name="波特鬆餅"
      role="廠商"
      pathList={vendorPath}
      router={router}
    >
      廠商資料維護
      <form className="w-full my-6 flex flex-col space-y-4">

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

            <Form.Input
              type="select"
              name="district"
              options={district}
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
            className="border border-gray-800 text-gray-800 text-xl "
          >
            返回
          </Button.Basic>
          <Button.Basic
            type="submit"
            className="bg-gray-800 text-white text-xl "
          >
            變更資料
          </Button.Basic>
        </div>
      </form>
    </Layout.CMS>
  );
};

export default Information;
