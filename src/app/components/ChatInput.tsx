"use client";
import React, { useState } from "react";
import { useLocalStorageFavorites } from "../services/ProivderLocalStorageFavorites";

export const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const { saveFavorite } = useLocalStorageFavorites();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage(""); // Clear input field after sending
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleMarkAsFav = () => {
    if (message.trim()) {
      saveFavorite(message.trim());
    }
  };

  return (
    <div className="chat-input flex items-center p-4 bg-gray-800 dark:bg-gray-800">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-grow rounded-lg p-2 text-gray-700 dark:text-black" />
      <button
        onClick={handleSubmit}
        className="disabled:opacity-50 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
        disabled={isLoading}
      >
        Send
      </button>
      <button
        onClick={handleMarkAsFav}
        className="disabled:opacity-50 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
      >
        Mark as Favorite
      </button>
    </div>
  );
};
