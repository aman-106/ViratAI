"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useChat } from "../../services/use-chat";
import { useIndexedDBWorker } from "../../services/save-chat";
import { v4 as uuidv4 } from "uuid";
import { ChatInput } from "../../components/ChatInput";
import { MessageLoader } from "../../components/MessageLoader";
import { MessageList } from "../../components/MessageList";

export default function Page({ params }: { params: { chatid?: string[] } }) {
  const { chatid } = params;
  console.log(chatid)
  const { sendMessage, isLoading, error, chatHistory,loadChatHistory } = useChat();
  const isFirstMsg = chatHistory.length === 0;

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatIdRef] = useState<string>(()=> {
    return chatid?.length ? chatid[0] : uuidv4()
  });

  useEffect(()=>{
    // load chat history
    loadChatHistory(chatid);
  },[chatid]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useIndexedDBWorker(chatIdRef,chatHistory);

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
}


