import { getOpenAIInstance } from "../../scripts/setup";
import type { NextApiRequest, NextApiResponse } from "next";

const openai = getOpenAIInstance();

type ResponseData = {
  message: string;
};

const SystemDefaultMsg = {
  role: "system",
  content: "You are a helpful assistant.",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { message , chatHistory  = []} = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message in request body" });
  }

  try {
    console.log('chatHistory',chatHistory);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [SystemDefaultMsg, 
        ...chatHistory,
        { role: "user", content: message }],
      stream: true,
    });

    console.log(response);

    // Set headers for server-sent events
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        console.log(content);
        res.write(content);
      } else {
        console.log(chunk.choices[0].finish_reason);
      }
    }

    // res.write("Certainly! Here's a concise example of a small JavaScript code snippet that demonstrates using Axios to make a POST request to a chatbot API and handling the response:\n\n```javascript\nconst axios = require('axios');\n\n// Define the message to send to the chatbot\nconst userMessage = 'Hello, how are you?';\n\n// Make a POST request to the chatbot API\naxios.post('https://api.chatbot.com/messages', { message: userMessage })\n .then(response => {\n console.log('Bot response:', response.data);\n })\n .catch(error => {\n console.error('Error:', error);\n });\n```\n\nIn this example:\n\n- We use `axios` to make a POST request to `https://api.chatbot.com/messages` with a JSON payload containing the `message` sent by the user (`userMessage`).\n- Upon successful response (`then` block), we log the bot's response (`response.data`) to the console.\n- If an error occurs during the request (`catch` block), we log the error (`error`) to the console.\n\nThis code snippet demonstrates the basic usage of Axios for sending a message to a chatbot API and handling the response. You can adapt and integrate this code into your application as needed. Note that you'll need to replace `'https://api.chatbot.com/messages'` with the actual endpoint of your chatbot API. Additionally, ensure that you have Axios installed (`npm install axios`) and imported (`const axios = require('axios');`) in your project.")

    res.end();
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}
