import { useEffect, useState } from "react";
import { Question } from "../../lib/resources/question";
import { getDownloadUrl } from "../../lib/services/storage";
import PromptImage from "./PromptImage";

type Props = {
  question: Question;
  index: number;
};

export default function Prompt(props: Props) {

  return (
    <div className="mt-5">
      <p className="font-semibold">No.{props.index + 1}</p>
      {props.question.imageRef !== "" && (
        <PromptImage imageRef={props.question.imageRef} />
      )}
      <p className="text-xl mt-3">{props.question.question}</p>
    </div>
  );
}
