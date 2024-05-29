import { actionTypes } from "./App";

function FinishScreen({ points, totalPoints, highscore, dispatch }) {
  const precentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} ({precentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: actionTypes.Restart })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
