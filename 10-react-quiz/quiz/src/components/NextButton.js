import { useQuiz, ACTION_TYPES } from "../contexts/QuizContext";

function NextButton() {
  const { dispatch, questions, answer, index } = useQuiz();

  const questionsNum = questions.length;
  if (answer === null) return null;
  if (index < questionsNum - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: ACTION_TYPES.NextQuestion })}>
        Next
      </button>
    );
  if (index === questionsNum - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: ACTION_TYPES.Finish })}>
        Finish
      </button>
    );
}

export default NextButton;
