import { useState } from "react";
import "./App.css";
import GuessField from "./components/guess/GuessField";
import LetterRow from "./components/letterRow/LetterRow";
import LetterTile from "./components/letterTile/LetterTile";
import Title from "./components/title/Title";
import {
  checkWord,
  initGame,
  isFinished,
  setLanguage,
  type Language,
} from "../model/Game";
import StatusMessage from "./components/message/StatusMessage";
import DefaultButton from "./components/common/button/DefaultButton";
import DefaultSelector from "./components/common/selector/DefaultSelector";

function App() {
  const [gameState, setGameState] = useState(() => initGame());
  const [isGameFinished, setGameFinished] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");

  // Function checks the current word and checks if the game is finished.
  // When the word is not found inside the pre-defined word list, an error is
  // thrown, which is catched here.
  const makeGuess = (guessedWord: string) => {
    try {
      const gs = checkWord(gameState, guessedWord);
      setGameState(gs);
      if (isFinished(gs)) {
        setGameFinished(true);
      }
    } catch (exception: unknown) {
      if (exception instanceof Error) {
        setErrorState(exception.message);
      }
    }
  };

  const startNewgame = () => {
    setGameFinished(false);
    setGameState(initGame());
  };

  const onInput = () => {
    setErrorState(null);
    if (isGameFinished) {
      startNewgame();
    }
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setSelectedLanguage(lang);
    setGameState(initGame());
  };

  return (
    <>
      <DefaultSelector
        items={["en", "nl"]}
        selected={selectedLanguage}
        onSelectChange={(lang) => changeLanguage(lang as Language)}
      />
      <div className="game-container">
        <Title title="Guess the word"></Title>

        <div className="status-message">
          {errorState != null && <StatusMessage message={errorState} />}
          {isGameFinished && (
            <StatusMessage message="You have guessed the word! Start a new game by typing or with the 'New game' button!" />
          )}
        </div>

        <LetterRow>
          {gameState.lastGuess.map((guess, index) => (
            <LetterTile
              key={index}
              letter={guess.letter}
              letterState={guess.letterState}
            />
          ))}
        </LetterRow>

        <GuessField
          isFinished={isGameFinished}
          onGuessedWordSubmit={makeGuess}
          onInput={onInput}
        />

        <div className="new-word-button">
          {isGameFinished && (
            <DefaultButton onClick={startNewgame} label="New word" />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
