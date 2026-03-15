import "./App.css";
import { Toaster } from "sonner";
import WordLine from "./components/WordLine";
import useSettings from "./hooks/useSettings";
import Keyboard from "./components/Keyboard";
import useWordleGame from "./hooks/useWordleGame";
console.log(`
██╗    ██╗ ██████╗ ██████╗ ██████╗  ██████╗ ██╗     
██║    ██║██╔═══██╗██╔══██╗██╔══██╗██╔═══██╗██║     
██║ █╗ ██║██║   ██║██████╔╝██║  ██║██║   ██║██║     
██║███╗██║██║   ██║██╔══██╗██║  ██║██║   ██║██║     
╚███╔███╔╝╚██████╔╝██║  ██║██████╔╝╚██████╔╝███████╗
 ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚══════╝`);

function App() {
  const {
    changeWordLength,
    wordLength,
    wordLengthInput,
    changeTotalGuesses,
    totalGuesses,
    availableWords,
  } = useSettings();

  const {
    guessedWords,
    correctWord,
    correctLetterObject,
    wordCount,
    currentWord,
    gameOver,
    resetGame,
    handleVirtualKey,
  } = useWordleGame({
    availableWords,
    wordLength,
    totalGuesses,
    wordLengthInput,
  });

  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            background: "#121213",
            color: "white",
          },
        }}
      />
      {/* <h1 className="text-6xl text-white font-extrabold select-none mb-2">
        WORDOL!
      </h1> */}
      <div>
        {guessedWords.map((word, index) => {
          if (index === wordCount) {
            return (
              <WordLine
                word={currentWord}
                correctWord={correctWord}
                correctLetterObject={correctLetterObject}
                revealed={gameOver}
                key={index}
              />
            );
          }
          return (
            <WordLine
              word={word}
              correctWord={correctWord}
              correctLetterObject={correctLetterObject}
              revealed={index < wordCount ? true : false}
              key={index}
            />
          );
        })}
      </div>
      <button
        className="m-4 py-4 px-14 border-gray-300 rounded-full hover:border-gray-100 text-lg select-none"
        onKeyDown={resetGame}
        onClick={(e) => {
          resetGame();
          e.target.blur();
        }}
      >
        Reset Game
      </button>
      <Keyboard
        revealed={gameOver}
        correctWord={correctWord}
        guessedWords={guessedWords}
        correctLetterObject={correctLetterObject}
        onKeyPress={handleVirtualKey}
      />
      {/* todo: modal for settings */}
      <div>
        <input
          className="max-w-40"
          type="number"
          placeholder="Numero di sillabe"
          min={1}
          onChange={(e) => {
            changeWordLength(e.target.value);
          }}
          value={wordLength}
        />
        <select
          onChange={(e) => changeTotalGuesses(e.target.value)}
          className="max-w-40"
        >
          <option value="">Difficoltá</option>
          <option value="7">Facile</option>
          <option value="6">Normale</option>
          <option value="5">Difficile</option>
        </select>
      </div>
    </div>
  );
}

export default App;
