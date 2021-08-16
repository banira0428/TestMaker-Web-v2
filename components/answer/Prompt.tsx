import { Question } from "../../lib/resources/question";

type Props = {
  question: Question
  index: number
}

export default function Prompt(props: Props){

  return (
    <div className="mt-5">
      <p className="text-2xl" >No.{props.index + 1}</p>
      <p className="text-xl mt-3">{props.question.question}</p>
    </div>
  );
}