import { LetterState } from "../../../model/Letter";
import "./LetterTile.css";

interface LetterProps {
  letter: string;
  letterState: LetterState;
}

export default function LetterTile({ letter, letterState }: LetterProps) {
  let classNames = "tile";

  // Add CSS classes based on the state of the letter.
  switch (letterState) {
    case LetterState.CORRECT: {
      classNames += " correct";
      break;
    }
    case LetterState.IN_WORD: {
      classNames += " correct";
      break;
    }
  }

  if (letterState == LetterState.CORRECT) {
    classNames += " correct";
  } else if (letterState == LetterState.IN_WORD) {
    classNames += " in-word";
  }

  return (
    <>
      <div className={classNames}>
        <p>{letter}</p>
      </div>
    </>
  );
}
