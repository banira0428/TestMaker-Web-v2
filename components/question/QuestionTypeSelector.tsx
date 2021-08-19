import { QuestionType, QUESTION_TYPES } from "../../lib/question_type";

type Props = {
  type: QuestionType;
  onChange(type: QuestionType): void;
};

export default function QuestionTypeSelector(props: Props) {
  return (
    <div className="flex gap-2">
      {Object.values<QuestionType>(QUESTION_TYPES).map((it, i) => (
        <div
          key={i}
          className={`flex-1 mt-3 text-center border-2 ${
            props.type.name === it.name && "border-primary"
          } rounded`}
        >
          <input
            type="radio"
            id={`type-${i}`}
            name="type"
            className="hidden"
            onChange={() => {
              props.onChange(it)
            }}
            checked={props.type.name === it.name}
          />
          <label
            htmlFor={`type-${i}`}
            className="cursor-pointer block p-1 md:p-2 font-semibold text-sm"
          >
            {it.name}
          </label>
        </div>
      ))}
    </div>
  );
}
