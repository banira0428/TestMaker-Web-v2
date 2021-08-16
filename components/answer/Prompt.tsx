import { useEffect, useState } from "react";
import { Question } from "../../lib/resources/question";
import { getDownloadUrl } from "../../lib/services/storage";

type Props = {
  question: Question
  index: number
}

export default function Prompt(props: Props){
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if(props.question.imageRef != null && props.question.imageRef !== ""){
      getDownloadUrl(props.question.imageRef).then((url) => {
        setImageUrl(url)
      }).catch(() => {
        setImageUrl("")
      })
    }else{
      setImageUrl("")
    }
  },[props.question.imageRef])

  return (
    <div className="mt-5">
      <p className="font-semibold" >No.{props.index + 1}</p>
      { imageUrl !== "" &&
        <img src={imageUrl} className="mx-auto m-3 max-w-xs border" />
      }
      <p className="text-xl mt-3">{props.question.question}</p>
    </div>
  );
}