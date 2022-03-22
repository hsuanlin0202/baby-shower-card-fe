import Layout from "components/layout";
import Form from "components/elements/form";
import { Control, useForm, UseFormHandleSubmit } from "react-hook-form";
import { Button } from "components/elements";
import { useRouter } from "next/router";
import { postEmail } from "api/postEmail";
import { useState } from "react";
import SuccessIcon from "../assets/svg/success-filled.svg";

type Props = {
  control: Control<EmailTypes, object>;
  handleSubmit: UseFormHandleSubmit<EmailTypes>;
  onSubmit: (data: EmailTypes) => void;
};

interface EmailTypes {
  email: string;
}

const ForgetForm = ({
  control,
  onSubmit,
  handleSubmit,
}: Props): JSX.Element => {
  const router = useRouter();
  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        type="text"
        name="email"
        label="電子信箱"
        control={control}
        required
      />
      <div className="flex space-x-6">
        <Button.Basic
          type="submit"
          className="w-full p-4 bg-brown-cis text-white text-lg rounded"
        >
          重設密碼
        </Button.Basic>
        <Button.Basic
          type="button"
          className="w-full p-4 border border-brown-cis text-brown-cis text-lg rounded hover:bg-brown-cis hover:text-white"
          onClick={() => router.push("/")}
        >
          取消
        </Button.Basic>
      </div>
    </form>
  );
};

const ConfirmForm = ({ email }): JSX.Element => {
  const router = useRouter();

  function back(e) {
    e.preventDefault();
    router.push("/");
  }
  return (
    <form className="space-y-8" onSubmit={back}>
      <span className="flex mx-auto w-20">
        <SuccessIcon />
      </span>
      <div className="text-center">
        <p>忘記密碼郵件通知信已寄出！</p>
        <p>系統已發送新密碼到您指定的信箱</p>
        <p>{email}</p>
        <p>請使用新密碼登入並修改密碼！</p>
      </div>

      <Button.Basic
        type="submit"
        className="w-full p-4 bg-brown-cis text-white text-lg rounded"
      >
        確認
      </Button.Basic>
    </form>
  );
};

const Forget = (): JSX.Element => {
  const { control, handleSubmit } = useForm<EmailTypes>();

  const [email, setEmail] = useState("");

  const [state, setState] = useState("null");

  const onSubmit = (data: EmailTypes): void => {
    setEmail(data.email);
    postEmail(data, 10000).then((result) => {
      if (!result) {
        setState("error");
        return;
      }
      setState("send");
    });
  };

  return (
    <Layout.Base title="忘記密碼">
      <div className="card-background-image bg-contain text-brown-cis w-screen h-screen p-4 md:p-0 flex flex-col justify-center items-center">
        <div className=" flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold">卡寶之心</h1>
          <p className="text-2xl">Joy Baby Card</p>
        </div>

        <p className="text-base mb-6">忘記密碼</p>
        <div className="w-full md:w-2/5 md:max-w-lg p-8 bg-white border rounded-md shadow-lg ">
          {state === "null" && (
            <ForgetForm
              control={control}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
            />
          )}
          {state === "send" && <ConfirmForm email={email} />}
        </div>
      </div>
    </Layout.Base>
  );
};

export default Forget;
