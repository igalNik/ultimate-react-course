import { actionTypes } from "./App";

function Options({ options, dispatch, answer, correctAnswer }) {
  const hasAnsered = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnsered ? (index === correctAnswer ? "correct" : "wrong") : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: actionTypes.NewAnswer, payload: index })}
          disabled={hasAnsered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
