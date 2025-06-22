import { LetterState, type Letter } from "./Letter";
import { words as wordsEN } from "../../words/words-en.json";
import { words as wordsNLA } from "../../words/words-nl.json";
import { words as wordsNL } from "../../words/words-debug.json";

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
  const hintedLetters: Map<string, number> = new Map();

  const lastGuess = letters.map((letter, index) => {
    let letterState = LetterState.INCORRECT;

    // First, check if the letter is on the right position.
    if (finalWordLetters[index] == letter) {
      letterState = LetterState.CORRECT;
    } else {
      // If not, get all positions of the same, misplaced letters.
      const lettersIndexes = finalWordLetters.flatMap((fletter, findex) =>
        fletter == letter && finalWordLetters[findex] != letters[findex]
          ? [findex]
          : [],
      );

      console.log(lettersIndexes.length);

      for (let i = 0; i < lettersIndexes.length; i++) {
        // Get how many IN_WORD marks already have been made for this letter.
        // When all misplaced letters have already been marked, this letter is not
        // marked as IN_WORD anymore.
        const hintedLetterCount = hintedLetters.get(letter);

        // When the hitedLetterCount is higher or equal then the letterCount, all IN_WORD
        // positions for this have been marked (or are correctly placed).
        if (
          hintedLetterCount != undefined &&
          hintedLetterCount >= lettersIndexes.length
        ) {
          continue;
        }

        // Add one to the total hinted letter count.
        hintedLetters.set(letter, hintedLetters.get(letter) ?? 1);
        letterState = LetterState.IN_WORD;
        break;
      }
    }

    return {
      letter: letter,
      letterState: letterState,
    };
  });

  return {
    ...game,
    lastGuess: lastGuess,
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

function wordExists(language: Language, word: string): boolean {
  return (language == "en" ? wordsEN : wordsNL).includes(word);
}

function getRandomWord(language: Language): string {
  const wordList = language == "en" ? wordsEN : wordsNL;
  return wordList[Math.floor(Math.random() * wordList.length)];
}
