import { useState } from "react";
import { Question } from "../../lib/resources/question";

type Props = {
  question: Question;
  onAnswered: (yourAnswer: string, isCorrect: boolean) => void;
};

export default function FormAnswerMultiple(props: Props) {
  const [inputs, setInputs] = useState<string[]>(
    Array(props.question.answers.length).fill("")
  );

  return (
    <div>
      {props.question.answers.map((_, index) => (
        <div key={index}>
          <input
            type="text"
            className="w-full mt-5 p-3 border block"
            placeholder="解答欄"
            value={inputs[index]}
            onChange={(e) =>
              setInputs(
                [...inputs].map((it, i) => (index === i ? e.target.value : it))
              )
            }
          />
        </div>
      ))}
      <button
        className="block text-white bg-accent p-3 rounded-md w-full mt-5"
        onClick={() => {
          const answers = props.question.answers.sort();
          props.onAnswered(inputs.join(", "), inputs.sort().every((value, index) => answers[index] === value));
        }}
      >
        OK
      </button>
    </div>
  );
}
