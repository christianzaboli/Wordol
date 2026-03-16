export default function SettingsModal(
  handleSettingsModal,
  changeWordLength,
  wordLength,
  changeTotalGuesses,
) {
  return (
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
  );
}
