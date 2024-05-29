import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { QuizProvider, useQuiz, APP_STATUSES } from "../contexts/QuizContext";

const SECS_PER_QUESTION = 30;

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === APP_STATUSES.Loading && <Loader />}
        {status === APP_STATUSES.Error && <Error />}
        {status === APP_STATUSES.Ready && <StartScreen />}
        {status === APP_STATUSES.Active && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === APP_STATUSES.Finished && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
