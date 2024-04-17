"use client";

self.addEventListener('message', async (event) => {
  const { type, chatId, history } = event.data;

  if (type === 'saveToIndexedDB' && chatId && Array.isArray(history)) {
    try {
      const request = indexedDB.open('ChatHistoryDB', 1);

      request.onerror = (event) => {
        console.error('Failed to open IndexedDB:', event.target.error);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('chatHistory')) {
          const store = db.createObjectStore('chatHistory', { keyPath: 'uuid' });
        }
      };

      request.onsuccess = async (event) => {
        const db = event.target.result;
        const transaction = db.transaction('chatHistory', 'readwrite');
        const store = transaction.objectStore('chatHistory');

        const timestamp = new Date().toISOString();

        // Clear existing history for the chatId
        await store.delete(chatId);


        await store.add({ uuid: chatId, history, timestamp });

        console.log('Chat history saved to IndexedDB with chatId:', chatId);
      };
    } catch (error) {
      console.error('Error saving chat history to IndexedDB:', error);
    }
  }
});

