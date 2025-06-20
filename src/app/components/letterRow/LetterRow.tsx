import type { ReactNode } from "react";
import "./LetterRow.css";

export default function LetterRow({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="letter-row">{children}</div>
    </>
  );
}
