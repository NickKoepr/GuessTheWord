import "./LetterTile.css";

export default function LetterTile({ letter }: { letter: string }) {
  return (
    <>
      <div className="tile">
        <p>{letter}</p>
      </div>
    </>
  );
}
