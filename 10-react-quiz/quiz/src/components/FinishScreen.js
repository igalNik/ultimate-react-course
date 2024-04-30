import { actionTypes } from "./App";

function FinishScreen({ points, totalPoints, dispatch }) {
  const precentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} ({precentage}%)
      </p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: actionTypes.Restart })}>
        Reset
      </button>
    </>
  );
}

export default FinishScreen;
