import { useState, useEffect, useContext } from "react";
import Transition from "react-transition-group/cjs/Transition";
import { Question } from "../lib/resources/question";
import { ToastContext } from "./contexts/ToastContext";
import { QuestionType, QUESTION_TYPES } from '../lib/question_type';
import { AuthContext } from "./authContext";
import Plus from "./question/Plus";
import Minus from "./question/Minus";
import ImageEditor from "./question/ImageEditor";
import ValidatableButton from "./question/ValidatableButton";
import CheckBox from "./question/CheckBox";
import QuestionTypeSelector from "./question/QuestionTypeSelector";
import TextArea from "./question/TextArea";
import Button from "./Button";
import { deleteQuestion } from "../lib/services/firestore";

type Props = {
  isShow: boolean;
  setIsShow(isShow: boolean): void;
  documentId: string;
  onEditQuestion(question: Question): void;
  onDeleteQuestion(documentId: string): void;
  question: Question;
};

export default function EditQuestionDialog(props: Props) {
  const ANSWERS_MAX = 6;
  const OTHERS_MAX = 6;

  const { currentUser } = useContext(AuthContext);
  const { _, setMessage } = useContext(ToastContext);
  const [isAuto, setIsAuto] = useState<boolean>(false);
  const [isCheckOrder, setIsCheckOrder] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>(Array(ANSWERS_MAX).fill(""));
  const [sizeOfAnswers, setSizeOfAnswers] = useState<number>(2);
  const [others, setOthers] = useState<string[]>(Array(OTHERS_MAX).fill(""));
  const [sizeOfOthers, setSizeOfOthers] = useState<number>(2);
  const [explanation, setExplanation] = useState<string>("");
  const [image, setImage] = useState<File>(null);
  const [imageRef, setImageRef] = useState<string>("");
  const [validate, setValidate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [editType, setEditType] = useState<QuestionType>(QUESTION_TYPES.WRITE);

  useEffect(() => {
    setValidate(
      editType.validate({
        question: question,
        answer: answer,
        answers: answers,
        sizeOfAnswers: sizeOfAnswers,
        others: others,
        sizeOfOthers: sizeOfOthers,
        auto: isAuto,
      })
    );
  }, [
    question,
    answer,
    answers,
    sizeOfAnswers,
    others,
    sizeOfOthers,
    editType,
    isAuto,
  ]);

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setAnswers(Array(ANSWERS_MAX).fill(""));
    setOthers(Array(OTHERS_MAX).fill(""));
    setExplanation("");
    setImage(null);
    setImageRef("");
  };

  useEffect(() => {
    setOthers(Array(OTHERS_MAX).fill(isAuto ? "自動生成" : ""));
  }, [isAuto]);

  useEffect(() => {
    if (props.question === null) return;

    setQuestion(props.question.question);
    setAnswer(props.question.answer);
    setExplanation(props.question.explanation);
    setSizeOfAnswers(props.question.answers.length);
    setAnswers(
      props.question.answers.concat(
        Array(ANSWERS_MAX - props.question.answers.length).fill("")
      )
    );
    setSizeOfOthers(props.question.others.length);
    setOthers(
      props.question.others.concat(
        Array(OTHERS_MAX - props.question.others.length).fill("")
      )
    );
    setIsAuto(props.question.auto);
    setIsCheckOrder(props.question.checkOrder);
    setImageRef(props.question.imageRef);
    setEditType(
      Object.values<QuestionType>(QUESTION_TYPES)[props.question.type]
    );
  }, [props.question,props.isShow]);

  return (
    <Transition in={props.isShow} timeout={300}>
      {(status) => {
        return (
          <div
            className={`z-20 w-full h-full fixed bg-gray-700 p-3 top-0 left-0 fade-${status}`}
            onPointerDown={() => props.setIsShow(false)}
          >
            <div
              className="bg-white w-3/6 h-5/6 mx-auto mt-12 mb-12 p-3 rounded-md overflow-y-scroll"
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex">
                <h3 className="text-xl md:text-2xl font-bold mr-auto ml-0 sticky">
                  問題の編集
                </h3>
                <div className="flex-grow" />
                <Button
                  title="削除"
                  theme="danger"
                  onClick={() => {
                    if (confirm("この問題を削除しますか？")) {
                      deleteQuestion(props.documentId, props.question.id).then(
                        (documentId) => {
                          props.setIsShow(false);
                          setMessage("問題を削除しました");
                          props.onDeleteQuestion(documentId);
                        }
                      );
                    }
                  }}
                />
              </div>
              <QuestionTypeSelector
                type={editType}
                onChange={(it) => setEditType(it)}
              />
              <div className="mt-3">
                <label htmlFor="question" className="font-semibold ">
                  問題文
                </label>
                <TextArea
                  placeholder="問題文（必須）"
                  onChange={(text) => setQuestion(text)}
                  value={question}
                  id="question"
                />
              </div>
              {editType.isShowSingleAnswer() && (
                <div className="mt-3">
                  <label htmlFor="answer" className="font-semibold">
                    解答
                  </label>
                  <TextArea
                    placeholder="解答（必須）"
                    onChange={(text) => setAnswer(text)}
                    value={answer}
                    id="answer"
                  />
                </div>
              )}
              {editType.isShowAnswers() && (
                <div className="mt-3">
                  <div className="flex flex-row items-center gap-2">
                    <label className="font-semibold">解答</label>
                    <div className="flex-grow" />
                    <Minus
                      onClick={() => {
                        setSizeOfAnswers(
                          Math.max(
                            sizeOfAnswers - 1,
                            editType.minSizeOfAnswers(
                              sizeOfAnswers,
                              sizeOfOthers
                            )
                          )
                        );
                      }}
                    />
                    <Plus
                      onClick={() => {
                        setSizeOfAnswers(
                          Math.min(
                            sizeOfAnswers + 1,
                            editType.maxSizeOfAnswers(
                              sizeOfAnswers,
                              sizeOfOthers
                            )
                          )
                        );
                      }}
                    />
                  </div>
                  {answers.slice(0, sizeOfAnswers).map((it, i) => (
                    <TextArea
                      placeholder="解答（必須）"
                      onChange={(text) => {
                        setAnswers(
                          [...answers].map((it, index) =>
                            index === i ? text : it
                          )
                        );
                      }}
                      key={i}
                      value={it}
                    />
                  ))}
                </div>
              )}
              {editType.isShowOthers() && (
                <div className="mt-3">
                  <div className="flex flex-row items-center gap-2">
                    <label className="font-semibold">他の選択肢</label>
                    <div className="flex-grow" />
                    <Minus
                      onClick={() => {
                        setSizeOfOthers(
                          Math.max(
                            sizeOfOthers - 1,
                            editType.minSizeOfOthers(
                              sizeOfAnswers,
                              sizeOfOthers
                            )
                          )
                        );
                      }}
                    />
                    <Plus
                      onClick={() =>
                        setSizeOfOthers(
                          Math.min(
                            sizeOfOthers + 1,
                            editType.maxSizeOfOthers(
                              sizeOfAnswers,
                              sizeOfOthers
                            )
                          )
                        )
                      }
                    />
                  </div>
                  {others.slice(0, sizeOfOthers).map((it, i) => (
                    <TextArea
                      placeholder="他の選択肢（必須）"
                      onChange={(text) => {
                        setOthers(
                          [...others].map((it, index) =>
                            index === i ? text : it
                          )
                        );
                      }}
                      key={i}
                      value={it}
                      disabled={isAuto}
                    />
                  ))}
                </div>
              )}
              <div className="mt-3">
                <label htmlFor="explanation" className="font-semibold">
                  解説
                </label>
                <TextArea
                  placeholder="解説（任意）"
                  onChange={(text) => setExplanation(text)}
                  value={explanation}
                  id="explanation"
                />
              </div>
              <ImageEditor
                setImage={setImage}
                image={image}
                imageRef={imageRef}
              />
              <div className="mt-5">
                {editType.isShowAuto() && (
                  <CheckBox
                    id="isAuto"
                    label="他の選択肢の自動生成"
                    isChecked={isAuto}
                    onChange={(checked) => setIsAuto(checked)}
                  />
                )}
                {editType.isShowCheckOrder() && (
                  <CheckBox
                    id="isCheckOrder"
                    label="選択順序も正誤判定に含める"
                    isChecked={isCheckOrder}
                    onChange={(checked) => setIsCheckOrder(checked)}
                  />
                )}
              </div>
              <div className="text-center mt-5">
                <ValidatableButton
                  title="変更を保存"
                  isLoading={isLoading}
                  isValid={validate}
                  onClick={() => {
                    setIsLoading(true);
                    editType
                      .updateQuestion({
                        testDocumentId: props.documentId,
                        questionDocumentId: props.question.id,
                        userId: currentUser.uid,
                        question: question,
                        answer: answer,
                        answers: answers.slice(0, sizeOfAnswers),
                        others: others.slice(0, sizeOfOthers),
                        auto: isAuto,
                        checkOrder: isCheckOrder,
                        explanation: explanation,
                        order: props.question.order,
                        image: image,
                        imageRef: props.question.imageRef,
                      })
                      .then((question) => {
                        setIsLoading(false);
                        resetForm();
                        setMessage("問題を保存しました");
                        props.onEditQuestion(question);
                        props.setIsShow(false);
                      });
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    </Transition>
  );
}
