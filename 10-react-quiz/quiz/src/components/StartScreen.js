import { useQuiz, ACTION_TYPES } from "../contexts/QuizContext";
import Question from "./Question";

function StartScreen() {
  const { questions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questions.length} question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: ACTION_TYPES.Start })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
