import { Question } from "../../lib/resources/question";

type Props = {
  question: Question
  index: number
}

export default function Prompt(props: Props){

  return (
    <div className="py-6">
      <p>No.{props.index + 1}</p>
      <p>{props.question.question}</p>
    </div>
  );
}