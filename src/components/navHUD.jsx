export default function NavHUD(handleSettingsModal, resetGame) {
  return (
    <div className="absolute top-20 right-5 grid">
      <button
        className="mb-4 py-3 px-6 rounded-lg border-gray-700 hover:border-gray-500 text-sm select-none"
        onClick={(e) => {
          handleSettingsModal();
          e.target.blur();
        }}
      >
        Settings
      </button>
      <button
        className="m py-3 px-6 rounded-lg border-gray-700 hover:border-gray-500 text-sm select-none"
        onKeyDown={resetGame}
        onClick={(e) => {
          resetGame();
          e.target.blur();
        }}
      >
        Reset Game
      </button>
    </div>
  );
}
