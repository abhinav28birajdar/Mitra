import { db, Collections } from '../../lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

export interface CommunityClass {
  id: string;
  created_by: string | null;
  title: string;
  description: string | null;
  starts_at: any;
  community_visible: boolean;
  created_at: any;
}

export const fetchCommunityClasses = async () => {
  try {
    const q = query(
      collection(db, Collections.CLASSES),
      where('community_visible', '==', true),
      orderBy('created_at', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommunityClass));
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
};

export const createClass = async (
  createdBy: string, title: string, description?: string, startsAt?: string, communityVisible = true
) => {
  const data = {
    created_by: createdBy,
    title,
    description: description || null,
    starts_at: startsAt || null,
    community_visible: communityVisible,
    created_at: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, Collections.CLASSES), data);
  const docSnap = await getDoc(ref);
  return { id: docSnap.id, ...docSnap.data() } as CommunityClass;
};

export const joinClass = async (classId: string, userId: string, role: 'student' | 'teacher' = 'student') => {
  const memberRef = doc(db, Collections.CLASS_MEMBERS, `${classId}_${userId}`);
  await setDoc(memberRef, {
    class_id: classId,
    user_id: userId,
    role,
    joined_at: serverTimestamp(),
  });
};

export const subscribeToCommunityClasses = (onInsert: (newClass: CommunityClass) => void) => {
  const q = query(
    collection(db, Collections.CLASSES),
    where('community_visible', '==', true),
    orderBy('created_at', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        onInsert({ id: change.doc.id, ...change.doc.data() } as CommunityClass);
      }
    });
  });
};
