import Layout from "../components/Layout";
import Head from "next/dist/next-server/lib/head";
import TestList from "../components/TestList";
import TestInformation from "../components/TestInformation";
import React, { useContext } from "react";
import { SelectedTestContext } from "../components/contexts/TestContext";
import { TestsProvider } from "../components/contexts/TestsContext";
import { AuthContext } from "../components/authContext";
import LoginForm from "../components/LoginForm";

export default function DashBoard() {
  const { selectedTest, _ } = useContext(SelectedTestContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Head>
        <title>暗記メーカー | ダッシュボード</title>
      </Head>
      <Layout>
        {/* <div className="text-center p-2 text-white bg-blue-300">
          <p>
            お知らせ：お知らせがあればここに載せる
          </p>
        </div> */}
        <div className="mx-auto max-w-7xl p-3">
          {currentUser ? (
            <div className="grid grid-cols-3 gap-6 mb-6">
              <TestsProvider>
                <div
                  className={`${selectedTest ? "col-span-3 sm:col-span-1" : "col-span-3"}`}
                >
                  <TestList />
                </div>
                <div
                  className={`${
                    selectedTest ? "col-span-3 sm:col-span-2" : "col-span-0"
                  }`}
                >
                  <TestInformation />
                </div>
              </TestsProvider>
            </div>
          ) : (
            <LoginForm />
          )}
        </div>
      </Layout>
    </div>
  );
}
