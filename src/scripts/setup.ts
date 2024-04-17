import OpenAI  from "openai";

let _openaiInstance:OpenAI;

export function getOpenAIInstance() {
  if (!_openaiInstance) {
    try {
      _openaiInstance = new OpenAI({
        apiKey:process.env.OPENAI_API_KEY
      });
      console.info('OpenAI API setup done');
    } catch (error) {
      console.error(`Error while setting up OpenAI: ${error}`);
    }
  }

  return _openaiInstance;
}

