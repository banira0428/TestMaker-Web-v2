import { exception } from "console";
import { shuffle } from "../array_util";
import { QuestionType, QUESTION_TYPES } from "../question_type";

export class Question {
  id: string;
  question: string;
  answer: string;
  answers: string[];
  others: string[];
  auto: boolean;
  checkOrder: boolean;
  explanation: string;
  order: number;
  type: number;
  imageRef: string;

  constructor(
    id: string,
    question: string,
    answer: string,
    answers: string[],
    others: string[],
    auto: boolean,
    checkOrder: boolean,
    explanation: string,
    order: number,
    type: number,
    imageRef: string
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.answers = answers;
    this.others = others;
    this.auto = auto;
    this.checkOrder = checkOrder;
    this.explanation = explanation;
    this.order = order;
    this.type = type;
    this.imageRef = imageRef;
  }

  getData(): object {
    const result = {};
    Object.keys(this).map((key) => (result[key] = this[key]));
    return result;
  }

  getSelections(candidates: string[]): string[] {

    if(this.type === Object.values<QuestionType>(QUESTION_TYPES).indexOf(
      QUESTION_TYPES.SELECT
    )){
      if(this.auto){
        const generatedOthers = shuffle(candidates).slice(0, this.others.length)
        return shuffle([this.answer, ...generatedOthers])
      }else{
        return shuffle([this.answer, ...this.others])
      }

    }else if(this.type === Object.values<QuestionType>(QUESTION_TYPES).indexOf(
      QUESTION_TYPES.MULTIPLE_SELECT
    )){
      if(this.auto){
        const generatedOthers = shuffle(candidates).slice(0, this.others.length)
        return shuffle([...this.answers, ...generatedOthers])
      }else{
        return shuffle([...this.answers, ...this.others])
      }
    }
  }
}
