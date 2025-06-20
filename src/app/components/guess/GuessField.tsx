import "./GuessField.css";

interface GuessFieldProps {
  onGuessedWordSubmit: (guessedWord: string) => void;
}

export default function GuessField({ onGuessedWordSubmit }: GuessFieldProps) {
  function submitWord(formData: FormData) {
    const guessedWord = formData.get("guessedWord")?.toString();
    // The form input field has already a minimum and maximum length, but just in case.
    if (guessedWord != null && guessedWord.length == 6) {
      onGuessedWordSubmit(guessedWord);
    }
  }

  return (
    <>
      <form className="guess-form" action={submitWord}>
        <label className="hidden">Guess the word: </label>
        <input
          className="guess-field"
          name="guessedWord"
          type="text"
          minLength={6}
          maxLength={6}
          autoComplete="off"
          autoFocus
          required
        ></input>

        <button className="submit">Submit</button>
      </form>
    </>
  );
}
