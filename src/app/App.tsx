import { useState } from "react";
import "./App.css";
import GuessField from "./components/guess/GuessField";
import LetterRow from "./components/letterRow/LetterRow";
import LetterTile from "./components/letterTile/LetterTile";
import Title from "./components/title/Title";
import { checkWord, initGame } from "../model/Game";
import ErrorMessage from "./components/error/ErrorMessage";

function App() {
  const [gameState, setGameState] = useState(() => initGame());
  const [errorState, setErrorState] = useState<string | null>(null);

  const makeGuess = (guessedWord: string) => {
    try {
      setGameState(checkWord(gameState, guessedWord));
    } catch (exception: unknown) {
      if (exception instanceof Error) {
        setErrorState(exception.message);
      }
    }
  };

  return (
    <>
      <div className="game-container">
        <Title title="Guess the word"></Title>

        {errorState != null && <ErrorMessage message={errorState} />}

        <LetterRow>
          {gameState.lastGuess.map((guess, index) => (
            <LetterTile
              key={index}
              letter={guess.letter}
              letterState={guess.letterState}
            />
          ))}
        </LetterRow>

        <GuessField onGuessedWordSubmit={makeGuess} />
      </div>
    </>
  );
}

export default App;
