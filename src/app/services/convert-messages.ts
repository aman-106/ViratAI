import { ROLE, IMsg } from './interface'; 

export const convertMessages = (messages: IMsg[]): { role: string; content: string }[] => {
  return messages.map((msg) => {
    const { role, rawMsg='' } = msg;


    const formattedRole = role === ROLE.USER ? 'user' : 'assistant';

    // Create the message object with 'role' and 'content' properties
    return {
      role: formattedRole,
      content: rawMsg,
    };
  });
};
