import React from "react";
import { useLocalStorageFavorites } from "../services/ProivderLocalStorageFavorites";
import { ClipboardIcon } from "@heroicons/react/24/solid";

const SavedInputsList = () => {
  const { favorites } = useLocalStorageFavorites();

  const handleCopyToClipboard = (input) => {
    navigator.clipboard.writeText(input);
  };

  return (
    <div className="saved-inputs-container h-1/5 overflow-y-auto bg-gray-900 text-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Saved Favorite Inputs</h3>
      {favorites.length === 0 ? (
        <p className="text-gray-400">No saved inputs found.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((input, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
            >
              <span className="text-gray-200">{input}</span>
              <button
                onClick={() => handleCopyToClipboard(input)}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 focus:outline-none"
              >
                <ClipboardIcon className="h-6 w-6 text-gray-300" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export  {SavedInputsList};
