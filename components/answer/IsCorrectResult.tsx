import { Question } from "../../lib/resources/question";

type Props = {
  question: Question;
  yourAnswer: string;
  isCorrect: boolean;
  onClickNext: () => void;
};

export default function IsCorrectResult(props: Props) {
  return (
    <div className="mt-5">
      <p className="font-semibold">解答結果</p>
      <p className="text-xl mt-3">{props.isCorrect ? '正解！' : '不正解...'}</p>

      <p className="font-semibold mt-5">正答</p>
      <p className="text-xl mt-3">{props.question.answer}</p>
      {props.yourAnswer !== "" && (
        <>
          <p className="font-semibold mt-5">あなたの解答</p>
          <p className="text-xl mt-3">{props.yourAnswer}</p>
        </>
      )}
      {props.question.explanation !== "" && (
        <>
          <p className="font-semibold mt-5">解説</p>
          <p className="text-xl mt-3">{props.question.explanation}</p>
        </>
      )}
      <button
        className="block text-white bg-accent p-3 rounded-md w-full mt-5"
        onClick={() => props.onClickNext()}
      >
        次の問題へ進む
      </button>
    </div>
  );
}
