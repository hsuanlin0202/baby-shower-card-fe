import Layout from "components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type InputTypes = { code: string };
export default function BabyCardLogin() {
  const router = useRouter();

  const { handleSubmit, register } = useForm<InputTypes>();

  useEffect(() => {}, []);

  const pushBabyPage = (data: InputTypes): void => {
    router.push(`/baby/${data.code}`);
  };
  return (
    <Layout.Base
      title="卡寶之心"
      className="w-screen h-screen flex justify-center items-center bg-gray-700"
    >
      <form
        className="p-8 rounded-md bg-white flex flex-col items-center space-y-4"
        onSubmit={handleSubmit(pushBabyPage)}
      >
        <p>請填入幸福密碼</p>
        <input
          name="code"
          className="border p-2"
          type="text"
          {...register("code", { required: true })}
        />
        <button type="submit">前往寶寶彌月卡</button>
      </form>
    </Layout.Base>
  );
}
