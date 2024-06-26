import { useQuiz, ACTION_TYPES } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, totalPoints, highscore, dispatch } = useQuiz();

  const precentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} ({precentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: ACTION_TYPES.Restart })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
