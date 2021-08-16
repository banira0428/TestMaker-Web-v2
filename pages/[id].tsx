import Layout from "../components/Layout";
import Head from "next/dist/next-server/lib/head";
import QrCodeDialog from "../components/QrCodeDialog";
import { createDynamicLinks } from "../lib/services/dynamicLinks";
import { GetServerSideProps } from "next";
import { getTest } from "../lib/services/firestore";
import { useEffect, useState } from "react";

type PathParams = {
  id: string;
};

type Props = {
  id: string;
};

export default function DynamicLinks<Props>(props) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    getLink(props.id).then((url) => {
      if (url) {
        setUrl(url);
      }
    });
  }, []);

  const getLink = async (id) => {
    const test = await getTest(props.id);
    if (!test) {
      window.location.href = "/";
    }

    const url = await createDynamicLinks(id);
    return url;
  };

  return (
    <div>
      <Head>
        <title>暗記メーカー | 問題集の受け取り</title>
      </Head>
      <Layout>
        <div className="mx-auto max-w-5xl p-3">
          {url && <QrCodeDialog isShow={true} setIsShow={() => {}} url={url} />}
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.params as PathParams;

  const props: Props = {
    id: id,
  };

  return { props };
};
