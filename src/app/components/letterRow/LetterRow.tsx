import type { ReactNode } from "react";
import "./LetterRow.css";

export default function LetterRow({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-live="polite">
        <ul className="letter-row" aria-live="polite">
          {children}
        </ul>
      </div>
    </>
  );
}
