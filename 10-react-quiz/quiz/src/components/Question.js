import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index, dispatch, answer } = useQuiz();

  const question = questions[index];

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
