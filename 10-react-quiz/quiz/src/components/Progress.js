function Progress({ index, questionsNum, points, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress max={questionsNum} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{`${index + 1} / ${questionsNum}`}</strong>
      </p>
      <p>
        <strong>{`${points}/${totalPoints}`}</strong> Points
      </p>
    </header>
  );
}

export default Progress;
