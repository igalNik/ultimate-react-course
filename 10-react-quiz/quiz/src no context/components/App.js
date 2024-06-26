import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;
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
  NextQuestion: "nextQuestion",
  Finish: "finish",
  Restart: "restart",
  Tick: "tick",
};

const initialState = {
  questions: [],
  status: appStatuses.Loading,
  index: 14,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.DataReceived:
      return { ...state, questions: action.payload, status: appStatuses.Ready };
    case actionTypes.DataFailed:
      return {
        ...state,
        status: appStatuses.Error,
      };
    case actionTypes.Start:
      return {
        ...state,
        status: appStatuses.Active,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case actionTypes.NewAnswer:
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case actionTypes.NextQuestion:
      return { ...state, index: state.index + 1, answer: null };
    case actionTypes.Finish:
      return {
        ...state,
        status: appStatuses.Finished,
        answer: null,
        highscore: Math.max(state.highscore, state.points),
      };
    case actionTypes.Restart:
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: appStatuses.Ready,
      };
    case actionTypes.Tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? appStatuses.Finished : state.status,
      };

    default:
      throw new Error("Action Uknown");
  }
}
function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} questionsNum={numQuestions} />
            </Footer>
          </>
        )}
        {status === appStatuses.Finished && (
          <FinishScreen points={points} totalPoints={totalPoints} dispatch={dispatch} highscore={highscore} />
        )}
      </Main>
    </div>
  );
}

export default App;
