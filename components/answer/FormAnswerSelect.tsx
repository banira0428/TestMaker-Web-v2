import { shuffle } from "../../lib/array_util";
import { Question } from "../../lib/resources/question";

type Props = {
  question: Question;
  onAnswered: (yourAnswer: string, isCorrect: boolean) => void;
};

export default function FormAnswerSelect(props: Props) {
  const selections = shuffle([...props.question.others, props.question.answer]);

  return (
    <div>
      {selections.map((selection, index) => {
        return (
          <div key={index} className="answer-select">
            <button
              className="block text-white bg-primary p-3 rounded-md w-full mt-5"
              onClick={() =>
                props.onAnswered(selection, selection === props.question.answer)
              }
            >
              {selection}
            </button>
          </div>
        );
      })}
    </div>
  );
}