import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthStore } from "store/auth";

const Logout = (): JSX.Element => {
  const router = useRouter();

  const { logout } = AuthStore((state) => ({
    logout: state.logout,
  }));

  useEffect(() => {
    logout();
    router.push("/");
  }, []);
  return <>logout</>;
};

export default Logout;
