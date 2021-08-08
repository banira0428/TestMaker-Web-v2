import Layout from "../../components/Layout";
import Head from "next/dist/next-server/lib/head";
import Heading from "../../components/Heading";

export default function EditCSV() {
  return (
    <div>
      <Head>
        <title>暗記メーカー | 問題集をまとめて編集</title>
      </Head>
      <Layout>
        <div className="mx-auto max-w-5xl p-3">
          <Heading title="HowTo" subTitle="使い方 / 問題集をまとめて編集" />
          <p className="mt-6">このページでは、表計算ツールを用いて問題集をまとめて編集する方法について解説します。なお、このページの操作手順は、PCから行うことを想定しています。</p>

          <h3 className="text-3xl md:text-3xl font-bold mr-auto ml-0 mt-6">1. テンプレートへのアクセス</h3>
          <p className="mt-3"><a className="text-primary" href="https://docs.google.com/spreadsheets/d/1FjuuQKduDykY6S88NqJbAGJGjzLOF-jQlXlG_334_3k/edit?usp=sharing" download>こちら</a>のページにアクセスし、入力例となる表が閲覧できることを確認してください</p>
          <img src="/img/edit_csv1-1.jpg" />

          <h3 className="text-3xl md:text-3xl font-bold mr-auto ml-0 mt-6">2. スプレッドシートへのログイン</h3>
          <p className="mt-6">ログインしていない場合、右上の「ログイン」ボタンをクリックし、ログインしてください</p>
          {/* スプレッドシート右上の「ログイン」ボタンを示すスクショ */}
          
            <h3 className="text-3xl md:text-3xl font-bold mr-auto ml-0 mt-6">3. 入力例の複製</h3>
          <p className="mt-6">「ファイル」→「コピーを作成」をクリックし、入力例をコピーして編集できる様にしてください</p>
          <img src="/img/edit_csv3-1.jpg"/>
          <div className="mt-6"></div>
          <img src="/img/Inkededit_csv3-2-2_LI.jpg"/>

          <h3 className="text-3xl md:text-3xl font-bold mr-auto ml-0 mt-6">4. 問題情報の入力</h3>
          <p className="mt-6">入力例を参考にしつつ、各自で問題集の情報を編集してください</p>
          {/* スプレッドシートに色々入力している時のスクショ */}

          <h3 className="text-3xl md:text-3xl font-bold mr-auto ml-0 mt-6">5. エクスポート</h3>
          <p className="mt-6">「ファイル」→「ダウンロード」→「カンマ区切りの値」をクリックし、入力したデータをCSVファイルとして保存してください</p>
          <img src="/img/edit_csv5-1-2.jpg"/>
          <div className="mt-6"></div>
          <img src="/img/edit_csv5-2.jpg"/>

          <h3 className="text-3xl md:text-3xl font-bold mr-auto ml-0 mt-6">6. ファイルの移動</h3>
          <p className="mt-6">作成したCSVファイルを何かしらの手段でスマートフォンに移動させてください（推奨： Android → Google ドライブ、 iOS → iCloud Drive）</p>
          

          <h3 className="text-3xl md:text-3xl font-bold mr-auto ml-0 mt-6">7. 「暗記メーカー」へのインポート</h3>
          <p className="mt-6">暗記メーカーを起動し、サイドメニューの「ファイルのインポート」から、先ほど移動させたファイルを選択することで、問題集としてインポートすることができます</p>
          <div className="text-center">
          <img className="mt-6 w-2/3 max-w-md mx-auto" src="/img/Inkededit_csv7-1_LI.jpg"/></div>
        


        </div>
      </Layout>
    </div>
  );
}
