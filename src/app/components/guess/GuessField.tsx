import "./GuessField.css";

export default function GuessField() {
  return (
    <>
      <input
        className="guess-field"
        name="Hi"
        type="text"
        maxLength={6}
      ></input>

      <SubmitGuessButton />
    </>
  );
}

function SubmitGuessButton() {
  return (
    <>
      <button className="submit">Submit</button>
    </>
  );
}
