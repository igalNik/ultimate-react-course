import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;
const APP_STATUSES = {
  Loading: "loading",
  Error: "error",
  Ready: "ready",
  Active: "active",
  Finished: "finished",
};

const ACTION_TYPES = {
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
  status: APP_STATUSES.Loading,
  index: 14,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.DataReceived:
      return { ...state, questions: action.payload, status: APP_STATUSES.Ready };
    case ACTION_TYPES.DataFailed:
      return {
        ...state,
        status: APP_STATUSES.Error,
      };
    case ACTION_TYPES.Start:
      return {
        ...state,
        status: APP_STATUSES.Active,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case ACTION_TYPES.NewAnswer:
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case ACTION_TYPES.NextQuestion:
      return { ...state, index: state.index + 1, answer: null };
    case ACTION_TYPES.Finish:
      return {
        ...state,
        status: APP_STATUSES.Finished,
        answer: null,
        highscore: Math.max(state.highscore, state.points),
      };
    case ACTION_TYPES.Restart:
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: APP_STATUSES.Ready,
      };
    case ACTION_TYPES.Tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? APP_STATUSES.Finished : state.status,
      };

    default:
      throw new Error("Action Uknown");
  }
}
function QuizProvider({ children }) {
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
        dispatch({ type: ACTION_TYPES.DataReceived, payload: data });
      } catch (err) {
        dispatch({ type: ACTION_TYPES.DataFailed });
      }
    }
    getQuestion();
  }, []);

  return (
    <QuizContext.Provider
      value={{ dispatch, questions, status, index, answer, points, totalPoints, highscore, secondsRemaining }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined) throw new Error("Context use outside of QuizProvider");

  return context;
}

export { QuizProvider, useQuiz, APP_STATUSES, ACTION_TYPES };
