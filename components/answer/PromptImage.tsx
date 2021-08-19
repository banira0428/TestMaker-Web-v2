import { useEffect, useState } from "react";
import { getDownloadUrl } from "../../lib/services/storage";
import Loading from "../Loading";

type Props = {
  imageRef: string;
};

export default function PromptImage(props: Props) {
  const [imageUrl, setImageUrl] = useState<string>(null);

  useEffect(() => {
    getDownloadUrl(props.imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch(() => {
        setImageUrl("");
      });
  }, [props.imageRef]);

  return (
    <div>
      {imageUrl && (
        <img src={imageUrl} className="mx-auto m-3 max-w-xs border" />
      )}
      {imageUrl === null && <Loading isLoading={true} />}
    </div>
  );
}
