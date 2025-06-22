import { LetterState } from "../../../model/Letter";
import "./LetterTile.css";

interface LetterProps {
  letter: string;
  letterState: LetterState;
}

export default function LetterTile({ letter, letterState }: LetterProps) {
  let classNames = "tile";
  let ariaLabel = `Letter ${letter}`;

  // Add CSS classes based on the state of the letter.
  switch (letterState) {
    case LetterState.CORRECT: {
      classNames += " correct";
      ariaLabel += " correct";
      break;
    }
    case LetterState.IN_WORD: {
      classNames += " in-word";
      ariaLabel += " in word";
      break;
    }
    case LetterState.INCORRECT: {
      ariaLabel += " incorrect";
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
      <li className={classNames}>
        <p aria-label={letter != "" ? ariaLabel : ""}>{letter}</p>
      </li>
    </>
  );
}
