import { getUser, postLogin } from "api";
import { Loader } from "components/elements";
import Layout from "components/layout";
import { LoginForm } from "components/pages/login";
import { AuthReducer } from "functions/auth";
import { useInitData } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { AuthStore } from "store/auth";
import { LoginTypes } from "types";
import jwt_decode from "jwt-decode";

const Login = () => {
  const router = useRouter();

  const { showNotify, openLoader } = useInitData();

  const { token, setToken, setUser } = AuthStore((state) => ({
    token: state.token,
    setToken: state.setToken,
    setUser: state.setUser,
  }));

  const { control, handleSubmit } = useForm<LoginTypes>();

  const [state, dispatch] = useReducer(AuthReducer, { type: "loading" });

  const stateAction = (
    action: "auth-pass" | "auth-fail" | "auth-null"
  ): void => {
    dispatch({ type: action });
  };

  useEffect(() => {
    if (!token && token !== "") return;

    if (token === "") {
      stateAction("auth-null");
      return;
    }

    userHandler(token);
  }, [token]);

  const userHandler = (token: string): void => {
    openLoader(true);
    getUser(token, "role").then((result) => {
      openLoader(false);
      if (!result) {
        stateAction("auth-null");
        return;
      }

      setUser(result);

      if (result.role === 3) router.push("/vendor/order");

      if (result.role === 4) console.log("家長後台");
    });
  };

  const onSubmit = (data: LoginTypes): void => {
    openLoader(true);
    postLogin(data).then((result) => {
      if (!result) {
        openLoader(false);
        showNotify("open", "帳號密碼錯誤", "請再次確認您的資料。");
        return;
      }

      const decoded: { id: number; exp: number } = jwt_decode(result);

      setToken(result, decoded.exp * 1000);

      userHandler(result);
    });
  };

  return (
    <Layout.Base title="登入">
      <div className="w-screen h-screen p-4 md:p-0 flex flex-col justify-center items-center">
        <div className="flex-1 flex flex-col justify-center items-center space-y-8">
          <h1 className="text-5xl font-bold">Baby Shower</h1>
          <p>這裡可能有一句話？</p>
        </div>

        {/* {state.type === "loading" && <></>} */}

        {state.type === "no-logged" && (
          <LoginForm
            canLogin={true}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        )}

        {state.type === "logged" && <>後台尚未開放</>}

        <div className="flex-1 w-full md:w-2/5 md:max-w-lg pt-10 flex justify-around">
          <a>忘記密碼</a>
          <a>問題回報</a>
        </div>
      </div>
    </Layout.Base>
  );
};

export default Login;
