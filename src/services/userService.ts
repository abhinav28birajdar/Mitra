import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: any;
}

export const syncUserProfile = async (uid: string, data?: Partial<UserProfile>) => {
  const userDocRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    const newUser = {
      id: uid,
      name: data?.name || 'Anonymous',
      email: data?.email || '',
      createdAt: serverTimestamp(),
    };
    await setDoc(userDocRef, newUser);
    return newUser as UserProfile;
  } else {
    return userSnap.data() as UserProfile;
  }
};
