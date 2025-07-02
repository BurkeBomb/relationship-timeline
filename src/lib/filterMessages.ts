import { ChatMessage } from './getMessages';

export interface FilterOptions {
  emotion?: string;
  sender?: string;
  keyword?: string;
}

export function filterMessages(
  messages: ChatMessage[],
  { emotion, sender, keyword }: FilterOptions
): ChatMessage[] {
  return messages.filter((msg) => {
    const matchesEmotion = emotion ? msg.emotion === emotion : true;
    const matchesSender = sender ? msg.sender === sender : true;
    const matchesKeyword = keyword
      ? msg.message.toLowerCase().includes(keyword.toLowerCase())
      : true;

    return matchesEmotion && matchesSender && matchesKeyword;
  });
}