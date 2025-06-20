import { LetterState, type Letter } from "./Letter";
import { words as wordsEN } from "../../words/words-en.json";
import { words as wordsNL } from "../../words/words-nl.json";

export type Language = "nl" | "en";

export let language: Language = "nl";

export type Game = {
  language: Language;
  finalWord: string;
  lastGuess: Array<Letter>;
};

export function checkWord(game: Game, guessedWord: string): Game {
  if (!wordExists(game.language, guessedWord)) {
    throw new Error("The guessed word is not in the word list!");
  }

  const finalWordLetters = game.finalWord.split("");
  const letters = guessedWord.split("");

  const result = letters.map((letter, index) => ({
    letter: letter,
    letterState:
      finalWordLetters[index] == letter
        ? LetterState.CORRECT
        : LetterState.INCORRECT,
  }));

  return {
    ...game,
    lastGuess: result,
  };
}

export function isFinished(game: Game): boolean {
  return game.lastGuess.every(
    (letter: Letter) => letter.letterState == LetterState.CORRECT,
  );
}

export function initGame(): Game {
  const word = getRandomWord(language).toLowerCase();
  console.log(word);
  return {
    language: language,
    finalWord: word,
    lastGuess: Array.from({ length: 6 }, () => ({
      letter: "",
      letterState: LetterState.INCORRECT,
    })),
  };
}

function getRandomWord(language: Language): string {
  const wordList = language == "en" ? wordsEN : wordsNL;
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function wordExists(language: Language, word: string): boolean {
  return (language == "en" ? wordsEN : wordsNL).includes(word);
}
