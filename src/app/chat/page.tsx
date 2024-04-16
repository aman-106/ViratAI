"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { SkeletonMessage } from "../components/skeleton";
import { useChat } from "../services/use-chat";
import { IMsg, ROLE } from "../services/interface";

const Page = () => {
  const { sendMessage, isLoading, error, chatHistory } = useChat();
  const isFirstMsg = chatHistory.length === 0;


  const chatContainerRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };


  useLayoutEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="chat flex flex-col h-full bg-gray-900 dark:bg-gray-900">
      {/* Chat history container */}
      <div
        ref={chatContainerRef}
        className="message-container flex-grow overflow-y-auto p-4"
      >
        <MessageList messages={chatHistory} />
        <MessageLoader isLoading={isLoading} multi={isFirstMsg} />
      </div>
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

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

  return (
    <div className="chat-input flex items-center p-4 bg-gray-800 dark:bg-gray-800">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-grow rounded-lg p-2 text-gray-700 dark:text-black"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="disabled:opacity-50 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
        disabled={isLoading}
      >
        Send
      </button>
    </div>
  );
};

const MessageLoader = ({ isLoading, multi = false }) => {
  return (
    isLoading && (
      <div className="flex space-y-4">
        {[...Array(multi ? 3 : 1)].map((_, index) => (
          <SkeletonMessage key={index} />
        ))}
      </div>
    )
  );
};

const MessageList = ({ messages }) => {
  return messages.length ? (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message flex items-start gap-2 p-4 rounded-lg shadow-sm ${
            message.role === ROLE.USER ? "bg-gray-700 text-white" : "bg-gray-800 text-white"
          }`}
        >
          {message.role === ROLE.USER ? (
            <div className="w-8 h-8 rounded-full bg-gray-600" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {message.role === ROLE.USER ? "You" : "AI"}
            </span>
            <div className="text-base" dangerouslySetInnerHTML={{ __html: message.message }}></div>
          </div>
        </div>
      ))}
    </>
  ) : null;
};

export default Page;
