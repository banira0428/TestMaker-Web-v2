import Layout from "../../../components/Layout";
import Head from "next/dist/next-server/lib/head";
import { GetServerSideProps } from "next";
import { getTest, fetchQuestions } from "../../../lib/services/firestore";
import { Test } from "../../../lib/resources/test";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import { Question } from "../../../lib/resources/question";
import Prompt from "../../../components/answer/Prompt";
import FormAnswerWrite from "../../../components/answer/FormAnswerWrite";
import IsCorrectResult from "../../../components/answer/IsCorrectResult";
import AllResult from "../../../components/answer/AllResult";
import { QuestionType, QUESTION_TYPES } from "../../../lib/question_type";
import FormAnswerSelect from "../../../components/answer/FormAnswerSelect";
import FormAnswerMultiple from "../../../components/answer/FormAnswerMultiple";
import FormAnswerMultipleSelect from '../../../components/answer/FormAnswerMultipleSelect';
import { shuffle } from "../../../lib/array_util";

type PathParams = {
  id: string;
};

type Props = {
  id: string;
};

type State = "answer" | "result" | "all_result";

export default function AnswerTest(props) {
  const [test, setTest] = useState<Test>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(true);
  const [yourAnswer, setYourAnswer] = useState<string>("");
  const [state, setState] = useState<State>("answer");
  const [correctNum, setCorrectNum] = useState<number>(0);

  useEffect(() => {
    getTest(props.id)
      .then((test) => {
        setTest(test);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchQuestions(props.id, 100)
      .then((questions) => {
        setQuestions(shuffle(questions.questions));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>暗記メーカー | 問題集の解答</title>
      </Head>
      <Layout>
        {test && questions[index] && (
          <div className="mx-auto max-w-5xl p-3">
            <Heading
              title={"Answer"}
              subTitle={"問題集の解答 / " + test.name}
            />
            {
              (state === "answer" || state === "result")&& (
                <Prompt question={questions[index]} index={index} />
              )
            }
            {state === "answer" && (
              <div>
                {questions[index].type ===
                  Object.values<QuestionType>(QUESTION_TYPES).indexOf(
                    QUESTION_TYPES.WRITE
                  ) && (
                  <FormAnswerWrite
                    question={questions[index]}
                    onAnswered={(input: string, isCorrect: boolean) => {
                      setYourAnswer(input);
                      setState("result");
                      setIsCorrect(isCorrect);
                      if (isCorrect) {
                        setCorrectNum(correctNum + 1);
                      }
                    }}
                  />
                )}
                {questions[index].type ===
                  Object.values<QuestionType>(QUESTION_TYPES).indexOf(
                    QUESTION_TYPES.SELECT
                  ) && (
                  <FormAnswerSelect
                    answer={questions[index].answer}
                    selections={questions[index].getSelections(questions.map((it) => it.answer).filter((it) => it !== "" && it !== questions[index].answer))}
                    onAnswered={(input: string, isCorrect: boolean) => {
                      setYourAnswer(input);
                      setState("result");
                      setIsCorrect(isCorrect);
                      if (isCorrect) {
                        setCorrectNum(correctNum + 1);
                      }
                    }}
                  />
                )}
                {questions[index].type ===
                  Object.values<QuestionType>(QUESTION_TYPES).indexOf(
                    QUESTION_TYPES.MULTIPLE
                  ) && (
                  <FormAnswerMultiple
                    question={questions[index]}
                    onAnswered={(input: string, isCorrect: boolean) => {
                      setYourAnswer(input);
                      setState("result");
                      setIsCorrect(isCorrect);
                      if (isCorrect) {
                        setCorrectNum(correctNum + 1);
                      }
                    }}
                  />
                )}
                {questions[index].type ===
                  Object.values<QuestionType>(QUESTION_TYPES).indexOf(
                    QUESTION_TYPES.MULTIPLE_SELECT
                  ) && (
                  <FormAnswerMultipleSelect
                    question={questions[index]}
                    selections={questions[index].getSelections(questions.map((it) => it.answer).filter((it) => it !== "" && it !== questions[index].answer))}
                    onAnswered={(input: string, isCorrect: boolean) => {
                      setYourAnswer(input);
                      setState("result");
                      setIsCorrect(isCorrect);
                      if (isCorrect) {
                        setCorrectNum(correctNum + 1);
                      }
                    }}
                  />
                )}
              </div>
            )}
            {state === "result" && (
              <div>
                <IsCorrectResult
                  question={questions[index]}
                  yourAnswer={yourAnswer}
                  isCorrect={isCorrect}
                  onClickNext={() => {
                    if (index + 1 < questions.length) {
                      setState("answer");
                      setIndex(index + 1);
                    } else {
                      setState("all_result");
                    }
                  }}
                />
              </div>
            )}
            {state === "all_result" && (
              <AllResult
                correctNum={correctNum}
                size={questions.length}
                onClickRetry={() => {
                  setIndex(0);
                  setCorrectNum(0);
                  setState("answer");
                }}
              />
            )}
          </div>
        )}
      </Layout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.params as PathParams;

  const props: Props = {
    id: id,
  };

  return { props };
};
