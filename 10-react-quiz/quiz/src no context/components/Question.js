import Options from "./Options";

function Question({ question, dispatch, answer }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>

      <Options
        {...question}
        // options={question.options}
        // correctAnswer={question.correctAnswer}
        dispatch={dispatch}
        answer={answer}
        correctAnswer={question.correctOption}
      />
    </div>
  );
}

export default Question;
