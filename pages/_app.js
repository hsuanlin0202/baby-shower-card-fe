import "../styles/globals.css";
import getConfig from "next/config";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (context) => {
  const { publicRuntimeConfig } = getConfig();

  return {
    publicRuntimeConfig,
  };
};

export default MyApp;
