import Layout from "../../../components/Layout";
import Head from "next/dist/next-server/lib/head";
import { GetServerSideProps } from "next";
import { getTest, fetchQuestions } from "../../../lib/services/firestore";
import { Test } from "../../../lib/resources/test";
import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import { Question } from "../../../lib/resources/question";

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
        setQuestions(questions.questions);
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
        {test && (
          <div className="mx-auto max-w-5xl p-3">
            <Heading
              title={"Answer"}
              subTitle={"問題集の解答 / " + test.name}
            />
            {questions[index] && <p>{questions[index].question}</p>}
            {state === "answer" && (
              <div>
                <div>
                  <input
                    onChange={(e) => setYourAnswer(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setState("result");
                      const isCorrect = yourAnswer === questions[index].answer
                      setIsCorrect(isCorrect);
                      if(isCorrect){
                        setCorrectNum(correctNum + 1);
                      }

                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
            {state === "result" && (
              <div>
                <div>
                  <p>{isCorrect ? "正解" : "不正解"}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      if(index + 1 < questions.length ){
                        setState("answer");
                        setIndex(index + 1);
                      }else{
                        setState("all_result")
                      }
                    }}
                  >
                    次の問題へ進む
                  </button>
                </div>
              </div>
            )}
            {state === "all_result" && (
              <div>
                <p>正解率 {correctNum}/{questions.length}</p>
                <button
                    onClick={() => {
                      setIndex(0);
                      setCorrectNum(0)
                      setState("answer");
                    }}
                  >
                    もう一度解く
                  </button>

              </div>
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
