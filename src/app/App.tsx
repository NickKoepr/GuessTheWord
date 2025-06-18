import "./App.css";
import GuessField from "./components/guess/GuessField";
import LetterRow from "./components/letterRow/LetterRow";
import LetterTile from "./components/letterTile/LetterTile";
import Title from "./components/title/Title";

function App() {
  return (
    <>
      <div className="game-container">
        <Title title="Guess the word"></Title>

        <LetterRow>
          <LetterTile letter="A"></LetterTile>
          <LetterTile letter="A"></LetterTile>
          <LetterTile letter="A"></LetterTile>
          <LetterTile letter="A"></LetterTile>
          <LetterTile letter="A"></LetterTile>
          <LetterTile letter="A"></LetterTile>
        </LetterRow>

        <GuessField />
      </div>
    </>
  );
}

export default App;
