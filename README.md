This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:


Add Open API key in .env file

```bash
npm run dev

```

Open [http://localhost:3000/chat](http://localhost:3000/chat) with your browser to see the result.

![Demo Video](https://youtu.be/mH0e47zoPUw)

### Chat Application High-Level Design

#### Overview

It allows users to send prompts to Open AI, view chat history, and manage favorite prompts.

The application is built using React for the front end and integrates with IndexedDB for local data storage. The key features and components of the chat application include:

#### Key Features
1. **AI Chat Bot**: Users can chat with AI bot using OPEN AI APIs
2. **Chat History**: Display of previous messages within a chat session.
3. **Favorite Messages**: Ability to mark and save favorite prompts.
4. **Data Persistence**: Utilization of IndexedDB to store chat histories and favorite prompts locally.

#### Components
1. **Chat Page Component**
   - Manages the layout of the chat interface.
   - Renders the `ChatInput` component for user message input.
   - Displays the `MessageList` component to show chat messages.
   - Utilizes the `MessageLoader` component for indicating loading states.

2. **ChatInput Component**
   - Provides an input field for users to type and send messages.
   - Sends user prompts to the chat backend via the `useChat` hook.
   - Supports sending prompts on pressing the "Enter" key.

3. **MessageList Component**
   - Receives and displays a list of chat messages.
   - Automatically scrolls to the latest message when new messages are added.

4. **MessageLoader Component**
   - Displays loading indicators during message retrieval and sending.

5. **SavedInputsList Component**
   - Displays a list of saved favorite user inputs.
   - Allows users to copy saved inputs to the clipboard.

#### External Services and Hooks
1. **useChat Hook**
   - Manages sending and loading of chat messages through API calls.
   - Handles message persistence using IndexedDB for local storage.

2. **useIndexedDBWorker Hook**
   - Integrates with IndexedDB for efficient storage of chat histories.
   - Utilizes a web worker for background processing of IndexedDB operations.

#### Dependencies
- **React**: Front-end library for building user interfaces.
- **IndexedDB**: Browser-based NoSQL database for local data storage.
- **Web Worker**: Provides a background thread for handling heavy data operations.
- **Tailwind CSS**: Utility-first CSS framework for styling components.

#### Implementation Details
- **State Management**: Uses React's state and custom hooks for managing application state.
- **Asynchronous Operations**: Leverages async/await for handling asynchronous operations like API calls and IndexedDB interactions.
- **Component Composition**: Encapsulates logic into reusable components for modularity and maintainability.
- **Error Handling**: Implements error handling for API requests and local storage operations.

#### Next Steps
1. Enhance UI/UX with additional styling and animations, accessibility, responsive design, error handling (display), theme.
2. Implement user authentication and user-specific chat sessions.
3. Optimize IndexedDB usage for improved performance.
4. Add unit tests and integration tests to ensure application reliability.
5. Add optimize like virtual list for large data set

This high-level design document outlines the architecture, features, and components of the chat application, providing a roadmap for implementation and future enhancements.


