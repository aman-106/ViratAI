"use client";

import axios from "axios";
import { marked } from "marked";
import { useState, useEffect } from "react";
import { IMsg, ROLE } from "./interface";
import { convertMessages } from "./convert-messages";
import { loadChatHistoryByID } from "./load-chat-from-db";

export const useChat = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<IMsg>>([]);

  const sendMessage = async (message: string) => {
    if (!message) {
      return; // Handle empty message here (optional)
    }
    setChatHistory((chatHistory) => [
      ...chatHistory,
      { id: Date().toString(), role: ROLE.USER, message: message },
    ]);

    setIsLoading(true);
    setError(null);

    try {
      const apiChatHistory = convertMessages(chatHistory);
      const response = await axios.post(
        "/api/chat",
        { message, chatHistory: apiChatHistory },
        { responseType: "stream" }
      );

      let responseText = "";

      // setAiResponse(response.choices[0]);
      for await (const chunk of response.data) {
        // Accumulate the processed HTML content
        responseText += chunk;
        // setAiResponse(() => {
        //   // const res
        //   const
        //   data += chunk.choices[0]?.delta?.content || "";
        //   return data;
        // });
        // setAiResponse(processedHtml);
      }
      const rawMsg = responseText.toString();
      const processedHtml = await marked.parse(rawMsg);

      setChatHistory((chatHistory) => [
        ...chatHistory,
        {
          id: Date().toString(),
          role: ROLE.BOT,
          message: processedHtml,
          rawMsg,
        },
      ]);
    } catch (error) {
      console.error(error);
      setError(error as Error);
      setChatHistory((chatHistory) => [
        ...chatHistory,
        {
          id: Date().toString(),
          role: ROLE.BOT,
          message: error?.message || "something went wrong",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatHistory = async (chatid:Array<string> | undefined)=>{
    try {
        if(chatid?.length && chatid[0] ){
          setIsLoading(true);
          const data = await loadChatHistoryByID(chatid[0]);
          setChatHistory(data);
        }else{
          console.error(`unable load for specfic chatid ${chatid}`)
        }
    } catch (error) {
      console.error('unable to load')
    }finally{
      setIsLoading(false);
    }
  }

  return { chatHistory, isLoading, error, sendMessage,loadChatHistory };
};
