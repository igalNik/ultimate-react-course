import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, questions, points, totalPoints, answer } = useQuiz();

  return (
    <header className="progress">
      <progress max={questions.length} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{`${index + 1} / ${questions.length}`}</strong>
      </p>
      <p>
        <strong>{`${points}/${totalPoints}`}</strong> Points
      </p>
    </header>
  );
}

export default Progress;
