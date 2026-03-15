import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function useWordleGame({
  availableWords,
  wordLength,
  totalGuesses,
  wordLengthInput,
}) {
  const [guessedWords, setGuessedWords] = useState(() =>
    new Array(totalGuesses).fill(wordLengthInput),
  );
  const [correctWord, setCorrectWord] = useState("");
  const [correctLetterObject, setCorrectLetterObject] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [currentWord, setCurrentWord] = useState(() => wordLengthInput);
  const [gameOver, setGameOver] = useState(false);

  const getWord = useCallback(() => {
    if (!availableWords.length) {
      setCorrectWord("");
      setCorrectLetterObject({});
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const word = availableWords[randomIndex];
    const letterObject = {};

    for (const letter of word) {
      letterObject[letter] = (letterObject[letter] || 0) + 1;
    }

    setCorrectWord(word);
    setCorrectLetterObject(letterObject);
  }, [availableWords]);

  const resetGame = useCallback(() => {
    setGuessedWords(new Array(totalGuesses).fill(wordLengthInput));
    getWord();
    setWordCount(0);
    setLetterCount(0);
    setCurrentWord(wordLengthInput);
    setGameOver(false);
  }, [getWord, totalGuesses, wordLengthInput]);

  const handleEnter = useCallback(() => {
    if (gameOver) return;

    if (currentWord === correctWord) {
      if (availableWords.find((word) => word === currentWord)) {
        toast.success("Hai vinto!", { position: "top-left" });
        setGameOver(true);
        return;
      }
    }

    if (currentWord !== correctWord && wordCount === totalGuesses - 1) {
      setGameOver(true);
      toast.error("Hai perso!", { position: "top-left" });
      toast.message(`Soluzione: ${correctWord.toUpperCase()}`, {
        position: "bottom-left",
        duration: 7000,
      });
      return;
    }

    if (letterCount !== wordLength) {
      toast.error(`La parola deve contenere ${wordLength} lettere`, {
        position: "top-left",
      });
      return;
    }

    if (!availableWords.includes(currentWord)) {
      toast.error("Parola non valida", { position: "top-left" });
      return;
    }

    setGuessedWords((current) => {
      const updatedGuessedWords = [...current];
      updatedGuessedWords[wordCount] = currentWord;
      return updatedGuessedWords;
    });

    setWordCount((current) => current + 1);
    setLetterCount(0);
    setCurrentWord(wordLengthInput);
  }, [
    availableWords,
    correctWord,
    currentWord,
    gameOver,
    letterCount,
    totalGuesses,
    wordCount,
    wordLength,
    wordLengthInput,
  ]);

  const handleBackspace = useCallback(() => {
    if (gameOver || letterCount === 0) {
      return;
    }

    setCurrentWord((word) => {
      const currentWordArray = word.split("");
      currentWordArray[letterCount - 1] = " ";
      return currentWordArray.join("");
    });

    setLetterCount((currentCount) => currentCount - 1);
  }, [gameOver, letterCount]);

  const handleAlphabetical = useCallback(
    (key) => {
      if (gameOver || letterCount === wordLength) {
        return;
      }

      setCurrentWord((word) => {
        const currentWordArray = word.split("");
        currentWordArray[letterCount] = key.toLowerCase();
        return currentWordArray.join("");
      });

      setLetterCount((currentCount) => currentCount + 1);
    },
    [gameOver, letterCount, wordLength],
  );

  const handleVirtualKey = useCallback(
    (key) => {
      if (key === "enter") {
        handleEnter();
        return;
      }

      if (key === "del") {
        handleBackspace();
        return;
      }

      if (/^[a-zA-Z]$/.test(key)) {
        handleAlphabetical(key);
      }
    },
    [handleAlphabetical, handleBackspace, handleEnter],
  );

  useEffect(() => {
    resetGame();
  }, [wordLength, totalGuesses, resetGame]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (gameOver) {
        if (e.key === "Escape") {
          resetGame();
        }
        return;
      }

      if (e.key === "Enter") {
        handleEnter();
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleAlphabetical(e.key);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver, handleAlphabetical, handleBackspace, handleEnter, resetGame]);

  return {
    guessedWords,
    correctWord,
    correctLetterObject,
    wordCount,
    currentWord,
    gameOver,
    resetGame,
    handleVirtualKey,
  };
}
