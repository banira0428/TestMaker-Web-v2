import { useState } from "react";
import { Question } from "../../lib/resources/question";
import SelectCheckbox from "../SelectCheckbox";

type Props = {
  question: Question;
  selections: string[];
  onAnswered: (yourAnswer: string, isCorrect: boolean) => void;
};

export default function FormAnswerMultipleSelect(props: Props) {
  const [inputs, setInputs] = useState<string[]>([]);

  return (
    <div>
      {props.selections.map((selection, index) => (
        <div key={index}>
          <SelectCheckbox
            text={selection}
            onChecked={(isChecked: boolean) => {
              if(isChecked){
                setInputs([...inputs, selection])
              }else{
                setInputs(inputs.filter((it) => it !== selection))
              }
              ;
            }}
          />
        </div>
      ))}
      <button
        className="block text-white bg-accent p-3 rounded-md w-full mt-5"
        onClick={() => {
          const answers = props.question.answers.sort();
          props.onAnswered(
            inputs.join(", "),
            inputs.sort().every((value, index) => answers[index] === value)
          );
        }}
      >
        OK
      </button>
    </div>
  );
}
