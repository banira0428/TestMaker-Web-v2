import { useState } from "react";
import { Question } from "../../lib/resources/question";

type Props = {
  question: Question;
  onAnswered: (yourAnswer: string, isCorrect: boolean) => void;
};

export default function FormAnswerWrite(props: Props) {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        type="text"
        className="w-full mt-5 p-3 border block"
        placeholder="解答欄"
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button
        className="block text-white bg-accent p-3 rounded-md w-full mt-5"
        onClick={() => props.onAnswered(input, input === props.question.answer)}
      >
        OK
      </button>
    </div>
  );
}
