import getConfig from "next/config";
import { InitDataProvider } from "hooks";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <InitDataProvider>
      <Component {...pageProps} />
    </InitDataProvider>
  );
}

MyApp.getInitialProps = async (context) => {
  const { publicRuntimeConfig } = getConfig();

  return {
    publicRuntimeConfig,
  };
};

export default MyApp;
