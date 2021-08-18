import React, { useContext, useState } from "react";
import { createDynamicLinks } from "../lib/services/dynamicLinks";
import Button from "./Button";
import { SelectedTestContext } from "./contexts/TestContext";
import Questions from "./Questions";
import QrCodeDialog from "../components/QrCodeDialog";
import { deleteTest } from "../lib/services/firestore";
import { ToastContext } from "./contexts/ToastContext";
import { TestsContext } from "./contexts/TestsContext";
import Link from "next/link";

export default function TestInformation() {
  const { selectedTest, setSelectedTest } = useContext(SelectedTestContext);
  const { tests, setTests } = useContext(TestsContext);
  const { _, setMessage } = useContext(ToastContext);

  const [isShowQrCodeDialog, setIsShowQrCodeDialog] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [isLoadingCreateLink, setIsLoadingCreateLink] =
    useState<boolean>(false);

  return (
    <div>
      {selectedTest && (
        <div>
          <div className="pb-5 border-b">
            <h4 className="text-2xl md:text-3xl font-bold  mr-auto ml-0 mt-5 mb-3">
              {selectedTest.name}
            </h4>
            <p>{`作成日：　　${selectedTest.created_at.toLocaleDateString()}`}</p>
            <p>{`公開設定：　${
              selectedTest.public ? "全体公開" : "限定公開"
            }`}</p>
            <div className="flex gap-4">
              <Link href={`/tests/${selectedTest.documentId}/answer`}>
                <a>
                  <Button
                    title={"ブラウザで解答する（β版）"}
                    onClick={() => {}}
                    className="mt-5"
                    theme={"primary"}
                    isLoading={isLoadingCreateLink}
                  />
                </a>
              </Link>
              <Button
                title={"アプリで解答する"}
                onClick={() => {
                  setIsLoadingCreateLink(true);
                  createDynamicLinks(selectedTest.documentId).then((link) => {
                    setIsLoadingCreateLink(false);
                    setUrl(link);
                    setIsShowQrCodeDialog(true);
                  });
                }}
                className="mt-5"
                theme={"primary"}
                isLoading={isLoadingCreateLink}
              />
              <Button
                title={"削除"}
                onClick={() => {
                  if (!confirm(`「${selectedTest.name}」を削除しますか？`))
                    return;

                  deleteTest(selectedTest.documentId).then((documentId) => {
                    setSelectedTest(null);
                    setTests(tests.filter((it) => it.documentId != documentId));
                    setMessage("問題集を削除しました");
                  });
                }}
                className="mt-5"
                theme={"danger"}
              />
            </div>

            <QrCodeDialog
              isShow={isShowQrCodeDialog}
              setIsShow={setIsShowQrCodeDialog}
              url={url}
            />
          </div>
          <div className="mt-5">
            <Questions documentId={selectedTest.documentId} />
          </div>
        </div>
      )}
    </div>
  );
}
