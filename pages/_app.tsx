import "./styles.css";
import Head from "next/head";
import { AuthProvider } from "../components/authContext";
import { ToastProvider } from "../components/contexts/ToastContext";
import { SelectedTestProvider } from "../components/contexts/TestContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function _app({ Component, pageProps }) {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [asPath]);

  return (
    <>
      <Head>
        <title>暗記メーカー</title>
      </Head>
      <AuthProvider>
        <ToastProvider>
          <SelectedTestProvider>
            <Component {...pageProps} />
          </SelectedTestProvider>
        </ToastProvider>
      </AuthProvider>
    </>
  );
}
