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
        worker.terminate(); // Terminate the worker when unmounting the component
      };
    }
  }, [chatId, chatHistory]);
};

export { useIndexedDBWorker };

// const saveChatHistoryToDB = async (chatId, history) => {
//     const uuid = chatId ? chatId : uuidv4(); // Generate a unique UUID if chatId is not provided

//     try {
//       // Check if service workers are supported by the browser
//       if ("serviceWorker" in navigator) {
//         // Register a service worker for background processing
//         const registration = await navigator.serviceWorker.register("/service-worker.js");

//         // Send a message to the service worker to perform the IndexedDB saving task
//         await registration.active.postMessage({ type: "saveChatHistory", uuid, history });
//       } else {
//         // Fallback to synchronous IndexedDB saving if service workers are not supported
//         await saveChatHistoryToDBSync(uuid, history);
//       }

//       console.log("Chat history saved to IndexedDB with UUID:", uuid);
//     } catch (error) {
//       console.error("Error saving chat history:", error);
//       throw error; // Rethrow the error for handling in the calling context
//     }
//   };

// const saveChatHistoryToDBSync = async (uuid, history) => {
//     const request = window.indexedDB.open("ChatHistoryDB", 1);

//     request.onerror = (event) => {
//       console.error("Failed to open IndexedDB:", event.target.error);
//     };

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;

//       if (!db.objectStoreNames.contains("chatHistory")) {
//         const store = db.createObjectStore("chatHistory", { keyPath: "uuid" });
//       }
//     };

//     const db = request.result;
//     const transaction = db.transaction("chatHistory", "readwrite");
//     const store = transaction.objectStore("chatHistory");

//     await store.delete(uuid);
//     await store.add({ uuid, history });
//   };

// const useChatHistoryPersistence = (
//   chatId: string | null,
//   chatHistory: IMsg[]
// ) => {
//     useEffect(() => {
//         const handleUnload = async () => {
//           try {

//             const clonedHistory = chatHistory.slice();

//             await saveChatHistoryToDB(chatId, clonedHistory);
//           } catch (error) {
//             console.error("Error saving chat history:", error);
//           }
//         };

//         window.addEventListener("beforeunload", handleUnload);

//         return () => {
//           window.removeEventListener("beforeunload", handleUnload);
//         };
//       }, [chatId, chatHistory]);
// };

// export { useChatHistoryPersistence };
