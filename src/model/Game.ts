import { LetterState, type Letter } from "./Letter";
import { words as wordsEN } from "../../words/words-en.json";
import { words as wordsNL } from "../../words/words-debug.json";
import { words as wordsNAL } from "../../words/words-nl.json";

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
      // If not, get all positions of the same, remaning letters.
      // This is needed to determine if the letter is in the word or not.
      const lettersIndexes = finalWordLetters.flatMap((fletter, index) =>
        fletter == letter ? [index] : [],
      );

      for (const letterIndex in lettersIndexes) {
        if (finalWordLetters[letterIndex] == letters[letterIndex]) {
          continue;
        }

        // Get the count of other letters that are placed incorrectly in the word.
        const letterCount = finalWordLetters.filter(
          (l, index) =>
            l == letter && finalWordLetters[index] != letters[index],
        ).length;
        const hintedLetterCount = hintedLetters.get(letter);

        // When the hitedLetterCount is higher or equal then the letterCount, all in word
        // positions have been marked (or are correct).
        if (
          hintedLetterCount != undefined &&
          hintedLetterCount >= letterCount
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
