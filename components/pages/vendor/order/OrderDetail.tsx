// @ts-nocheck
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import twLocale from "date-fns/locale/zh-TW";
import Form from "components/elements/form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import clsx from "clsx";
import { Button } from "components/elements";

type Props = {
  orderNo: string;
};

type FormGroupProps = {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  titleSpace?: string;
};
const FormGroup = ({
  title,
  children,
  icon,
  titleSpace = "min-w-40",
}: FormGroupProps): JSX.Element => {
  return (
    <div className="flex items-center mx-8 my-4">
      <div className={clsx("flex items-center", titleSpace)}>
        {icon && icon}
        <span>{title}</span>
      </div>
      <div className="w-56">{children}</div>
    </div>
  );
};
export const OrderDetail = ({ orderNo }: Props): JSX.Element => {
  const { control, handleSubmit } = useForm<any>();

  const onSubmit = (data: any) => {};

  const today = new Date();

  const toLocalDateTimeString = (date: Date): string => {
    return `${date.toLocaleDateString()} ${
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold">
        {orderNo ? `訂單編號： ${orderNo}` : "建立訂單"}
      </h2>
      <div className="flex items-center my-4">
        <span className=" text-gray-500">訂單建立日期</span>

        <span className="mx-2">{toLocalDateTimeString(today)}</span>
      </div>
      <div className="border rounded-lg shadow-lg py-4">
        <FormGroup title="開放寶寶卡片">
          <Switch defaultChecked={true} />
        </FormGroup>
        <FormGroup title="到期時間">
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={twLocale}>
            <DatePicker
              value={null}
              onChange={(newValue) => {}}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </LocalizationProvider>
        </FormGroup>

        {orderNo && (
          <div className="flex space-x-4 mt-8 px-8 pt-8 border-t">
            <Button.Basic
              type="button"
              className="bg-blue-500 text-white active:bg-blue-600"
            >
              <span>複製卡片連結</span>
            </Button.Basic>

            <Button.Basic
              type="button"
              className="bg-blue-500 text-white active:bg-blue-600"
            >
              <span>下載完整卡片</span>
            </Button.Basic>
          </div>
        )}

        <hr className="my-8" />

        <FormGroup title="訂單編號">
          <Form.Input
            type="text"
            name="orderNo"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="填單人">
          <Form.Input
            type="text"
            name="editor"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <div className="flex -my-4">
          <FormGroup title="聯絡人">
            <Form.Input
              type="text"
              name="contact"
              control={control}
              size="small"
              required
            />
          </FormGroup>
          <FormGroup title="性別" titleSpace="min-w-20">
            <RadioGroup
              aria-labelledby="contact-gender"
              defaultValue="female"
              name="contact-gender-group"
            >
              <div className="w-full flex ">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="女"
                />
                <FormControlLabel value="male" control={<Radio />} label="男" />
              </div>
            </RadioGroup>
          </FormGroup>
        </div>
        <FormGroup title="爸爸名">
          <Form.Input
            type="text"
            name="fatherName"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="媽媽名">
          <Form.Input
            type="text"
            name="motherName"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="寶寶名">
          <Form.Input
            type="text"
            name="babyName"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="寶寶出生日">
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={twLocale}>
            <DatePicker
              value={null}
              onChange={(newValue) => {}}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </LocalizationProvider>
        </FormGroup>
        <FormGroup title="寶寶照片上傳">
          <input
            type="file"
            className="my-2"
            id="babyImg"
            name="babyImg"
            accept="image/png, image/jpeg"
          />
        </FormGroup>
        <FormGroup title="選擇模板">
          <Form.Input
            className="w-1/2"
            type="select"
            name="sort"
            options={[]}
            onChange={(e) => console.log(e)}
          />
        </FormGroup>

        <FormGroup title="家長帳號">
          <Form.Input
            type="text"
            name="parentEmail1"
            control={control}
            size="small"
            required
          />
        </FormGroup>
        <FormGroup title="">
          <Form.Input
            type="text"
            name="parentEmail2"
            control={control}
            size="small"
            required
          />
        </FormGroup>

        <FormGroup title="開放前台留言">
          <Switch defaultChecked={true} />
        </FormGroup>

        <hr className="my-8" />

        <div className="px-8 pb-4 flex justify-end space-x-4">
          <Button.Basic
            type="submit"
            className="bg-blue-500 text-white active:bg-blue-600"
          >
            <span>儲存</span>
          </Button.Basic>

          <Button.Basic type="submit" className="text-blue-500  bg-white">
            <span>清空</span>
          </Button.Basic>
        </div>
      </div>
    </form>
  );
};
