import { actionTypes } from "./App";

function NextButton({ dispatch, answer, index, questionsNum }) {
  if (answer === null) return null;
  if (index < questionsNum - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: actionTypes.NextQuestion })}>
        Next
      </button>
    );
  if (index === questionsNum - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: actionTypes.Finish })}>
        Finish
      </button>
    );
}

export default NextButton;
