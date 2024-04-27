import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";

const appStatuses = {
  Loading: "loading",
  Error: "error",
  Ready: "ready",
  Active: "active",
  Finished: "finished",
};

export const actionTypes = {
  DataReceived: "dataReceived",
  DataFailed: "dataFailed",
  Start: "start",
  NewAnswer: "newAnswer",
  nextQuestion: "nextQuestion",
};
const initialState = { questions: [], status: appStatuses.Loading, index: 0, answer: null, points: 0 };

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.DataReceived:
      return { ...state, questions: action.payload, status: appStatuses.Ready };
    case actionTypes.DataFailed:
      return { ...state, status: appStatuses.Error };
    case actionTypes.Start:
      return { ...state, status: appStatuses.Active };
    case actionTypes.NewAnswer:
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case actionTypes.nextQuestion:
      return { ...state, index: state.index + 1, answer: null };

    default:
      throw new Error("Action Uknown");
  }
}
function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);

  useEffect(function () {
    async function getQuestion() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        dispatch({ type: actionTypes.DataReceived, payload: data });
      } catch (err) {
        dispatch({ type: actionTypes.DataFailed });
      }
    }
    getQuestion();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === appStatuses.Loading && <Loader />}
        {status === appStatuses.Error && <Error />}
        {status === appStatuses.Ready && (
          <StartScreen numQuestions={numQuestions} onStart={() => dispatch({ type: actionTypes.Start })} />
        )}
        {status === appStatuses.Active && (
          <>
            <Progress
              index={index}
              questionsNum={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question question={questions[index]} answer={answer} dispatch={dispatch} />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
