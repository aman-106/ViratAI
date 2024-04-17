"use client";

import React, { useState, useEffect } from "react";
import { ListSkeleton } from "./skeleton";
import { loadChatHistoryIDs } from "../services/load-chat-from-db";
import { IMsgInfo } from "../services/interface";
import Link from "next/link";

const ChatHistory = () => {
  const [messages, setMessages] = useState<Array<IMsgInfo>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function load() {
      try {
        const data = await loadChatHistoryIDs();
        console.log(data);
        setMessages(data);
      } catch (error) {
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="chat-history  bg-gray-900 flex-column justify-between pd-2">
      <h3 className="text-xl font-bold mb-4">Chat History</h3>
      {isLoading ? (
        <ListSkeleton />
      ) : messages.length ? (
        messages.map((message) => (
          <Link href={`/chat/${message.id}`}>
            <div
              key={message.id}
              className="interface-item my-1 p-4 rounded-lg shadow-sm bg-gray-700 cursor-pointer"
            >
              <div className="text-gray-200 font-bold">{message.title}</div>
              <div className="text-gray-500">{message.id}</div>
            </div>
          </Link>
        ))
      ) : (
        <div className="interface-item my-1 p-4 rounded-lg shadow-sm bg-gray-700 cursor-pointer">
          <div className="text-gray-200 font-bold">{"No History Found"}</div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
