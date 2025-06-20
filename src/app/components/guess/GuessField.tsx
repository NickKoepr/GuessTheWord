import DefaultButton from "../common/button/DefaultButton";
import "./GuessField.css";

interface GuessFieldProps {
  isFinished: boolean;
  onGuessedWordSubmit: (guessedWord: string) => void;
  onInput: () => void;
}

export default function GuessField({
  isFinished,
  onGuessedWordSubmit,
  onInput,
}: GuessFieldProps) {
  function submitWord(formData: FormData) {
    const guessedWord = formData.get("guessedWord")?.toString();
    // The form input field has already a minimum and maximum length, but just in case.
    if (guessedWord != null && guessedWord.length == 6) {
      onGuessedWordSubmit(guessedWord.toLowerCase());
    }
  }

  return (
    <>
      <form className="guess-form" action={submitWord}>
        <input
          id="guessedWord"
          className="guess-field"
          name="guessedWord"
          aria-label="Guess the word"
          type="text"
          onInput={onInput}
          minLength={6}
          maxLength={6}
          autoComplete="off"
          autoFocus
          required
        ></input>

        {!isFinished && <DefaultButton label="Submit"></DefaultButton>}
      </form>
    </>
  );
}
