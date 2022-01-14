import { BABY_API } from "api";
import Layout from "components/layout";
import { LoginForm } from "components/pages/login";
import { useForm } from "react-hook-form";
import { LoginTypes } from "types";

const Login = () => {
  const { control, handleSubmit } = useForm<LoginTypes>();

  const onSubmit = (data: LoginTypes): void => {
    console.log(data);
  };

  return (
    <Layout.Base title="登入">
      <div className="w-screen h-screen p-4 md:p-0 flex flex-col justify-center items-center">
        <div className="flex-1 flex flex-col justify-center items-center space-y-8">
          <h1 className="text-5xl font-bold">Baby Shower</h1>
          <p>這裡可能有一句話？</p>
        </div>

        <LoginForm
          canLogin={true}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />

        <div className="flex-1 w-full md:w-2/5 md:max-w-lg pt-10 flex justify-around">
          <a>忘記密碼</a>
          <a>問題回報</a>
        </div>
      </div>
    </Layout.Base>
  );
};

export default Login;
