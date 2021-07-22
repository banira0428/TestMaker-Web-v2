import Layout from "../components/Layout";
import Head from "next/dist/next-server/lib/head";
import QrCodeDialog from "../components/QrCodeDialog";
import { createDynamicLinks } from "../lib/services/dynamicLinks";
import { GetServerSideProps } from "next";
import { getTest } from '../lib/services/firestore';

type PathParams = {
  id: string;
}

type Props = {
  url: string;
}

export default function DynamicLinks<Props>(props) {

  return (
    <div>
      <Head>
        <title>暗記メーカー | 問題集の受け取り</title>
      </Head>
      <Layout>
        <div className="mx-auto max-w-5xl p-3">
          <QrCodeDialog
            isShow={true}
            setIsShow={() => {}}
            url={props.url}
          />
        </div>
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { id } = context.params as PathParams

  const test = await getTest(id);
  if(!test){
    return {
      notFound: true
    };
  }

  const url = await createDynamicLinks(id)

  const props: Props = {
    url: url,
  }

  return { props }
}