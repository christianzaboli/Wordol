import { useMemo, useState } from "react";
import PAROLE_ITALIANE from "../assets/PAROLE_ITALIANE";

export default function useSettings() {
  const [wordLength, setWordLength] = useState(5);
  const wordLengthInput = " ".repeat(wordLength);

  function changeWordLength(value) {
    const parsedValue = Number(value);
    if (!Number.isFinite(parsedValue) || parsedValue < 1) return;
    setWordLength(Math.floor(parsedValue));
  }

  const [totalGuesses, setTotalGuesses] = useState(6);
  function changeTotalGuesses(value) {
    const parsedValue = Number(value);
    if (!Number.isFinite(parsedValue) || parsedValue < 1) return;
    setTotalGuesses(Math.floor(parsedValue));
  }

  const availableWords = useMemo(
    () => PAROLE_ITALIANE.filter((parola) => parola.length === wordLength),
    [wordLength],
  );

  return {
    changeWordLength,
    wordLength,
    wordLengthInput,
    //
    changeTotalGuesses,
    totalGuesses,
    //
    availableWords,
  };
}
