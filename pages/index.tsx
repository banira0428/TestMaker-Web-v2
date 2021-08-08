import Layout from "../components/Layout";
import Stripe from "../components/Stripe";
import Heading from "../components/Heading";
import Content from "../components/index/Content";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Layout>
        <main>
          <div className="bg-primary min-h-screen md:min-h-0">
            <div className="relative max-w-5xl mx-auto">
              <Stripe/>
              <div className="z-10 relative grid grid-cols-1 md:grid-cols-2 py-3">
                <div className="max-w-xs mx-auto px-5">
                  <img src="/img/sc1.webp" alt={'暗記メーカーのスクリーンショット'} width="640" height="1247"/>
                </div>
                <div className="">
                  <div className="mt-3 md:mt-64 w-7/12 mx-auto">
                    <p className="text-white text-2xl md:text-4xl font-bold">自分だけの</p>
                    <p className="text-white text-2xl md:text-4xl font-bold">問題集を作ろう！</p>
                  </div>
                  <h1 className="text-white text-center text-sm md:text-xl mt-4">テスト勉強用アプリ「暗記メーカー」</h1>
                  <div className="flex w-3/4 m-auto mt-6">
                    <a
                      href="https://play.google.com/store/apps/details?id=jp.gr.java_conf.foobar.testmaker.service&hl=ja&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                      <img
                        src="img/googleplay.png"
                        alt="Google Play で手に入れよう"/>
                    </a>
                    <a
                      href="https://apps.apple.com/jp/app/%E3%83%86%E3%82%B9%E3%83%88%E5%8B%89%E5%BC%B7%E7%94%A8%E3%82%A2%E3%83%97%E3%83%AA-%E6%9A%97%E8%A8%98%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC/id1201200202?mt=8"><img
                      src="img/appstore.png"
                      alt="App Store"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-gray-100">
            <div className="max-w-5xl mx-auto">
              <Heading title={'About'} subTitle={'このアプリについて'}/>

              <Content title={'アプリ × 自学自習'}
                       content={'暗記メーカーは「自学自習の効率化」を目的とした問題集作成アプリです。資格習得のための勉強や、複数人への問題集の配布のために利用することが可能です'}
                       img={'/img/undraw_modern_design_v3wv.svg'}/>

              <Heading title={'Features'} subTitle={'このアプリの特徴'}/>

              <div className="grid grid-cols-1 md:grid-cols-3">

                <Content title={'多彩な問題形式'}
                         content={'単純な一問一答問題だけでなく、選択問題や完答問題など、学習したい科目に最適な形式の問題を作成することができます。'}
                         img={'/img/undraw_quiz_nlyh.svg'}
                         link={'/howto/variable_questions'}
                         />

                <Content title={'問題集を手軽に共有'}
                         content={'問題集をアップロードすることで、リンク一つで問題集を手軽に共有することができます。'}
                         img={'/img/undraw_share_link_qtxe.svg'}
                         link={'/howto/share_tests'}
                         />

                <Content title={'PCからまとめて編集'}
                         content={'エクセルなどの表計算ソフトを用いることで、問題集をまとめて編集することができます。'}
                         img={'/img/undraw_Spreadsheet_re_cn18.svg'}
                         link={'/howto/edit_csv'} />
              </div>

            </div>
          </div>
        </main>
      </Layout>
    </div>
  )
}
