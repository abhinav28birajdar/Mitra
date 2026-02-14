import { db, Collections } from '../../lib/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  documentId,
  collection
} from 'firebase/firestore';

export interface Chat {
  id: string;
  title?: string | null;
  chat_type: string;
  is_ai: boolean;
  last_message_text?: string | null;
  last_message_at?: any | null;
  member_count: number;
  message_count: number;
  created_by?: string;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string | null;
  content: string;
  created_at: any;
}

export const fetchChatsForUser = async (userId: string) => {
  const memberQ = query(
    collection(db, Collections.CHAT_MEMBERS),
    where('user_id', '==', userId)
  );
  const memberSnapshot = await getDocs(memberQ);
  const chatIds = memberSnapshot.docs.map(doc => doc.data().chat_id);
  if (chatIds.length === 0) return [];

  const chats: Chat[] = [];
  // Firestore 'in' limit is 10
  for (let i = 0; i < chatIds.length; i += 10) {
    const batchList = chatIds.slice(i, i + 10);
    const chatQ = query(
      collection(db, Collections.CHATS),
      where(documentId(), 'in', batchList)
    );
    const chatSnapshot = await getDocs(chatQ);
    chatSnapshot.docs.forEach(doc => {
      chats.push({ id: doc.id, ...doc.data() } as Chat);
    });
  }

  chats.sort((a, b) => {
    const dateA = a.last_message_at?.toMillis ? a.last_message_at.toMillis() : 0;
    const dateB = b.last_message_at?.toMillis ? b.last_message_at.toMillis() : 0;
    return dateB - dateA;
  });

  return chats;
};

export const sendMessage = async (chatId: string, senderId: string, content: string) => {
  const msgRef = await addDoc(collection(db, Collections.MESSAGES), {
    chat_id: chatId,
    sender_id: senderId,
    content,
    created_at: serverTimestamp(),
  });

  await updateDoc(doc(db, Collections.CHATS, chatId), {
    last_message_text: content,
    last_message_at: serverTimestamp(),
  });

  const msgDoc = await getDoc(msgRef);
  return { id: msgDoc.id, ...msgDoc.data() } as Message;
};

export const subscribeToMessages = (chatId: string, onMessageAdded: (message: Message) => void) => {
  const q = query(
    collection(db, Collections.MESSAGES),
    where('chat_id', '==', chatId),
    orderBy('created_at', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        onMessageAdded({ id: change.doc.id, ...change.doc.data() } as Message);
      }
    });
  });
};
