import { useEffect, useState } from "react";
import { isSmartPhone } from "../../lib/agent_util";
import { createDynamicLinks } from "../../lib/services/dynamicLinks";

type Props = {
  documentId: string;
};

export default function NavigateAppBanner(props: Props) {
  const [link, setLink] = useState("");

  useEffect(() => {
    createDynamicLinks(props.documentId).then((link) => {
      setLink(link);
    });
  }, [props.documentId]);

  return (
    <div>
      {isSmartPhone(navigator.userAgent) && link !== "" && (
        <a href={link}>
          <div className="fixed bottom-3 left-0 right-0 text-center opacity-90">
            <p className="inline-block p-3 bg-white border rounded-md text-primary text-center text-sm">
              アプリで解答する &gt;
            </p>
          </div>
        </a>
      )}
    </div>
  );
}
