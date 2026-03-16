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
    handleSettingsModal,
    showSettingsModal,
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

      {/* settings */}
      <button
        className="m-4 py-3 px-6  rounded-lg border-gray-700 hover:border-gray-500 text-sm select-none absolute top-5 right-5"
        onClick={(e) => {
          handleSettingsModal();
          e.target.blur();
        }}
      >
        Settings
      </button>
      {showSettingsModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50 duration-500"
          onClick={handleSettingsModal}
        >
          <div
            className="w-full max-w-md rounded-xl border border-neutral-700 bg-[#121213] p-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="flex flex-col gap-3">
              <input
                autoFocus
                className="w-full rounded-md px-3 py-2 bg-[#1e1f20] border border-gray-600"
                type="number"
                placeholder="Numero di sillabe"
                min={1}
                max={9}
                onChange={(e) => {
                  changeWordLength(e.target.value);
                }}
                value={wordLength}
              />
              <select
                onChange={(e) => changeTotalGuesses(e.target.value)}
                className="w-full rounded-md px-3 py-2 bg-[#1e1f20] border border-gray-600"
              >
                <option value="6">Difficoltá</option>
                <option value="7">Facile</option>
                <option value="6">Normale</option>
                <option value="5">Difficile</option>
              </select>
            </div>
            <button
              className="mt-5 py-2 px-6 border border-gray-500 rounded-full hover:border-gray-200"
              onClick={handleSettingsModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
