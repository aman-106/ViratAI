"use client";

import { useState, useEffect } from "react";
import { IMsg } from "./interface";
import { v4 as uuidv4 } from "uuid";

const useIndexedDBWorker = (chatId: string | null, chatHistory: any[]) => {
  useEffect(() => {
    if (chatId && chatHistory.length) {
      let worker: Worker;
      try {
        worker = new Worker(
          new URL("./saveToIndexedDBWorker.ts", import.meta.url)
        );

        // Define a function to send data to the web worker
        const saveToIndexedDB = (chatId: string | null, history: any[]) => {
          worker.postMessage({ type: "saveToIndexedDB", chatId, history });
        };

        // Send data to the web worker whenever chatId or chatHistory changes
        saveToIndexedDB(chatId, chatHistory);
      } catch (error) {
        console.error(error);
      }

      // Cleanup function
      return () => {
        worker.terminate();
      };
    }
  }, [chatId, chatHistory]);
};

export { useIndexedDBWorker };
