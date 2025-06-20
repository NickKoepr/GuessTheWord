/**
 * State that can be used to display if the letter is correct, is in the word or is incorrect.
 */
export enum LetterState {
  CORRECT,
  IN_WORD,
  // Incorrect is just a normal rendered tile.
  INCORRECT,
}

export type Letter = {
  letter: string;
  letterState: LetterState;
};
