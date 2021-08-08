import Layout from "../components/Layout";
import Heading from "../components/Heading";
import Head from "next/head";
import Accordion from "../components/Accordion";
import Link from "next/link";

export default function Guide() {
  return (
    <div>
      <Head>
        <title>暗記メーカー | よくある質問</title>
      </Head>
      <Layout>
        <div className="max-w-5xl mx-auto">
          <div className="mt-3 p-3">
            <Heading title={"FAQ"} subTitle={"よくある質問"} />
          </div>
          <div className="m-1">
            <Accordion title={"問題集を他の端末で利用することは可能ですか?"}>
              <p>
                はい、可能です。問題集を他の端末で使用したい場合は、トップページで該当の問題集をタップした後に、「共有する」を選択してください。
              </p>
            </Accordion>

            <Accordion
              title={
                "誤って「みんなの問題集」に問題集をアップロードしてしまいました。サーバ上から削除することは可能ですか？"
              }
            >
              <p>
                はい、可能です。アプリトップページの「問題集（共有）」タブ内で該当の問題集を削除していただくことで、問題集をサーバ上から削除できます。
              </p>
            </Accordion>

            <Accordion
              title={
                "「アップロードしてリンクを共有」とは、どのような機能ですか?"
              }
            >
              <p>
                この機能は、アプリ内で作成した問題集の「コピー」をインターネット上にアップロードし、その問題集をダウンロードするためのリンクを発行する機能です。このリンクを他の端末から押下することで、問題集をダウンロードして使用することができます。
              </p>
            </Accordion>

            <Accordion
              title={
                "「テキスト形式に変換して共有」とは、どのような機能ですか?"
              }
            >
              <p>
                この機能は、アプリ内で作成した問題集を、コンマ区切りのCSVテキストに変換する機能です。問題集の画像情報が失われてしまう、という欠点はありますが、エクセルやスプレッドシートを用いて効率的に問題集を編集することが可能になります。詳しい編集方法に関しては、
                  <Link href="/howto/edit_csv">
                    <a className="text-primary">
                      こちら
                    </a>
                  </Link>
                  のページをご確認ください。
              </p>
            </Accordion>

            <Accordion
              title={"問題集のタイトルを後から編集することは可能ですか？"}
            >
              <p>
                はい、可能です。該当の問題集の編集画面に移動していただき、画面右上のメニューから問題集情報の編集画面に移動することができます。
              </p>
            </Accordion>

            <Accordion title={"CSVファイルのインポートは可能ですか?"}>
              <div>
                <p>
                  はい、可能です。詳しい編集方法に関しては、
                  <Link href="/howto/edit_csv">
                    <a className="text-primary">
                      こちら
                    </a>
                  </Link>
                  のページをご確認ください。
                </p>
              </div>
            </Accordion>

            <Accordion
              title={
                "CSVファイルをインポートした際に問題集が読み込まれません。何が原因ですか？"
              }
            >
              <div>
                <p>
                  まず初めに、お手持ちの端末にファイルが正しく転送されているか（他のアプリで該当のファイルが問題なく開けるかどうか）を確認してください。ファイルが正しく転送されているにも関わらず問題集が読み込めていない場合は、<Link href="/howto/edit_csv">
                    <a className="text-primary">
                      こちら
                    </a>
                  </Link>
                  のページを確認し、書式に間違いがないかをご確認ください。
                </p>
              </div>
            </Accordion>
          </div>
          <p className="mt-5 p-5">
            このページの内容を見ても疑問点が解決しない場合は、
            <a
              href="https://forms.gle/MW6JMFmKRUop2enx8"
              className="text-primary"
            >
              お問い合わせフォーム
            </a>
            をご利用ください
          </p>
        </div>
      </Layout>
    </div>
  );
}
