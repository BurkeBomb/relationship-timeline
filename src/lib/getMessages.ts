import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export interface ChatMessage {
  id: string;
  timestamp: string;
  sender: string;
  message: string;
  emotion: string;
}

export async function getMessages(): Promise<ChatMessage[]> {
  try {
    const messagesRef = collection(db, 'messages');
    const querySnapshot = await getDocs(messagesRef);

    const messages: ChatMessage[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatMessage[];

    return messages;
  } catch (err) {
    console.warn('Firestore failed, falling back to mockMessages.json:', err);

    // fallback to public/mockMessages.json
    const res = await fetch('/mockMessages.json');
    const data: ChatMessage[] = await res.json();
    return data;
  }
}