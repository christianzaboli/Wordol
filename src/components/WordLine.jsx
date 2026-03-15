import LetterBox from "./LetterBox";

export default function WordLine({
  word,
  correctWord,
  correctLetterObject,
  guessedWords,
  revealed,
  keyboard = false,
  onKeyPress,
}) {
  if (keyboard) {
    return (
      <div className="flex flex-row space-x-2 m-2 justify-center">
        {word.map((letter, index) => {
          const isInSolution = correctWord.split("").includes(letter);
          const isInGuesses = guessedWords
            .flatMap((word) => word.split(""))
            .includes(letter);

          const hasCorrectLetterInSolution =
            isInSolution && isInGuesses && revealed;

          const hasTypedCorrectLetter = isInGuesses && isInSolution;

          const hasMissedLetter = isInGuesses && !isInSolution;

          return (
            <LetterBox
              letter={letter}
              green={hasCorrectLetterInSolution}
              yellow={hasTypedCorrectLetter}
              missed={hasMissedLetter}
              revealed={revealed}
              key={index}
              keyboard={keyboard}
              onClick={onKeyPress}
            />
          );
        })}
      </div>
    );
  }
  return (
    <div className="flex flex-row space-x-2 m-2 justify-center">
      {word.split("").map((letter, index) => {
        const hasCorrectLocation = letter === correctWord[index];
        const hasCorrectLetter = letter in correctLetterObject;
        return (
          <LetterBox
            letter={letter}
            green={hasCorrectLocation && hasCorrectLetter && revealed}
            yellow={!hasCorrectLocation && hasCorrectLetter && revealed}
            revealed={revealed}
            key={index}
            keyboard={keyboard}
          />
        );
      })}
    </div>
  );
}
