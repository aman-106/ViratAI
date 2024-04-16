'use client';

import React, { useState, useEffect } from 'react';
import { ListSkeleton } from './skeleton';


const ChatHistory = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching initial chat history
    setIsLoading(true);
    setTimeout(() => {
      setMessages([
        { user: true, message: 'Hello!' },
        { user: false, message: 'Hi there! How can I help you today?' },
      ]);
      setIsLoading(false);
    }, 1000); // Simulate loading time
  }, []);

  return (
    <div className="chat-history">
      {isLoading ? (
        <ListSkeleton />
      ) : (
        messages.map((message, index) => (
          <div key={index} className={`message ${message.user ? 'user' : ''}`}>
            {message.message}
          </div>
        ))
      )}
    </div>
  );
};

export default ChatHistory;
