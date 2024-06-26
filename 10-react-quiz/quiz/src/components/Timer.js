import { useEffect } from "react";
import { useQuiz, ACTION_TYPES } from "../contexts/QuizContext";

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const intervalId = setInterval(function () {
        dispatch({ type: ACTION_TYPES.Tick });
      }, 1000);
      return () => clearInterval(intervalId);
    },
    [dispatch]
  );
  return <div className="timer">{`${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`}</div>;
}

export default Timer;
