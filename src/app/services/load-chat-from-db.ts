"use client";

import { IMsg, IMsgInfo, ROLE } from "./interface";

export const loadChatHistoryIDs = async () => {
    return new Promise<Array<IMsgInfo>>((resolve, reject) => {
      const request = window.indexedDB.open("ChatHistoryDB", 1);
  
      request.onerror = (event) => {
        reject(new Error("Failed to open IndexedDB: " + event.target.error));
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
  
        // Access the chat history object store
        const transaction = db.transaction("chatHistory", "readonly");
        const store = transaction.objectStore("chatHistory");
        const chatHistoryIDs:Array<IMsgInfo> = [];
  
        // Iterate over all entries in the object store
        store.openCursor().onsuccess = (cursorEvent) => {
          const cursor = cursorEvent.target.result;
  
          if (cursor) {
            const { uuid, history,timestamp } = cursor.value;
  
            //  first user message in the history
            const firstUserMessage = history.find((msg) => msg.role === ROLE.USER);
            const title = firstUserMessage ? firstUserMessage.message : "No user message found";
  
           
            chatHistoryIDs.push({ id: uuid, title,timestamp });
  
            cursor.continue();
          } else {
            resolve(chatHistoryIDs.sort((a,b)=> (new Date(b.timestamp)).getTime() - (new Date(a.timestamp)).getTime())); // Resolve with the array of chat history IDs and titles
          }
        };
      };
    });
  };
  
export const loadChatHistoryByID = async (chatID) => {
    return new Promise<Array<IMsg>>((resolve, reject) => {
      const request = window.indexedDB.open("ChatHistoryDB", 1);
  
      request.onerror = (event) => {
        reject(new Error("Failed to open IndexedDB: " + event.target.error));
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
  
        // Access the chat history object store
        const transaction = db.transaction("chatHistory", "readonly");
        const store = transaction.objectStore("chatHistory");
  
        // Retrieve the chat history entry for the specified chat ID
        const getRequest = store.get(chatID);
  
        getRequest.onsuccess = (getRequestEvent) => {
          const chatHistoryEntry = getRequestEvent.target.result;
  
          if (chatHistoryEntry) {
            resolve(chatHistoryEntry.history); // Resolve with the complete chat history
          } else {
            reject(new Error("Chat history not found for ID: " + chatID));
          }
        };
  
        getRequest.onerror = (getRequestEvent) => {
          reject(new Error("Error loading chat history for ID: " + chatID));
        };
      };
    });
  };
  