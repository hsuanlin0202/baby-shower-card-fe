import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    console.log("清空local登入資料");
    router.push("/");
  }, []);
  return <>logout</>;
};

export default Logout;
