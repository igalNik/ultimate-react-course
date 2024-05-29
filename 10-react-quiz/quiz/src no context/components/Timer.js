import { useEffect } from "react";
import { actionTypes } from "./App";

function Timer({ secondsRemaining, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const intervalId = setInterval(function () {
        dispatch({ type: actionTypes.Tick });
      }, 1000);
      return () => clearInterval(intervalId);
    },
    [dispatch]
  );
  return <div className="timer">{`${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`}</div>;
}

export default Timer;
