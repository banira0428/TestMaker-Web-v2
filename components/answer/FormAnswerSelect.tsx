type Props = {
  selections: string[]
  answer: string
  onAnswered: (yourAnswer: string, isCorrect: boolean) => void;
};

export default function FormAnswerSelect(props: Props) {

  return (
    <div>
      {props.selections.map((selection, index) => {
        return (
          <div key={index} className="answer-select">
            <button
              className="block text-white bg-primary p-3 rounded-md w-full mt-5"
              onClick={() =>
                props.onAnswered(selection, selection === props.answer)
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