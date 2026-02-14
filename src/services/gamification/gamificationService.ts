import { db, Collections } from '../../lib/firebase';
import {
  collection,
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
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';

// =============================================
// INTERFACES
// =============================================

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  streakStartDate: string;
  lastActiveDate: string;
  streakFreezesAvailable: number;
  streakFreezesUsed: number;
  totalStreakDays: number;
}

export interface XPTransaction {
  id: string;
  userId: string;
  xpAmount: number;
  sourceType: string;
  sourceId?: string;
  description?: string;
  createdAt: any;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description?: string;
  iconUrl?: string;
  badgeColor?: string;
  category: string;
  xpReward: number;
  isHidden: boolean;
  criteria: Record<string, any>;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  earnedAt: any;
  isSeen: boolean;
  achievement?: Achievement;
}

// =============================================
// STREAK SYSTEM
// =============================================

export const fetchUserStreak = async (userId: string): Promise<Streak | null> => {
  const streakDoc = await getDoc(doc(db, Collections.STREAKS, userId));
  if (!streakDoc.exists()) return null;
  return streakDoc.data() as Streak;
};

export const initializeStreak = async (userId: string): Promise<Streak> => {
  const today = new Date().toISOString().split('T')[0];
  const streakOfData: Streak = {
    userId: userId,
    currentStreak: 1,
    longestStreak: 1,
    streakStartDate: today,
    lastActiveDate: today,
    streakFreezesAvailable: 2,
    streakFreezesUsed: 0,
    totalStreakDays: 1,
  };
  await setDoc(doc(db, Collections.STREAKS, userId), streakOfData);
  return streakOfData;
};

// =============================================
// XP SYSTEM
// =============================================

export const awardXP = async (
  userId: string, amount: number, sourceType: string, sourceId?: string, description?: string
): Promise<{ newTotal: number; levelUp: boolean; newLevel?: number }> => {
  await addDoc(collection(db, Collections.XP_TRANSACTIONS), {
    userId: userId,
    xpAmount: amount,
    sourceType: sourceType,
    sourceId: sourceId || null,
    description: description || null,
    createdAt: serverTimestamp(),
  });

  const profileRef = doc(db, Collections.PROFILES, userId);
  const profileDoc = await getDoc(profileRef);
  const profileData = profileDoc.data() as any;
  const stats = profileData?.stats || {};

  const newTotal = (stats.points || 0) + amount;
  const newLevel = Math.floor(newTotal / 1000) + 1;
  const levelUp = newLevel > (stats.level || 1);

  await updateDoc(profileRef, {
    'stats.points': newTotal,
    'stats.level': newLevel,
    updatedAt: serverTimestamp(),
  });

  if (levelUp) {
    await addDoc(collection(db, Collections.NOTIFICATIONS), {
      userId: userId,
      type: 'level_up',
      category: 'achievement',
      title: `Level Up! 🎉`,
      body: `Congratulations! You've reached Level ${newLevel}!`,
      priority: 'high',
      isRead: false,
      createdAt: serverTimestamp(),
    });
  }

  return { newTotal, levelUp, newLevel: levelUp ? newLevel : undefined };
};

export const getXPHistory = async (userId: string, limitCount: number = 50): Promise<XPTransaction[]> => {
  const q = query(
    collection(db, Collections.XP_TRANSACTIONS),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
};

// =============================================
// ACHIEVEMENTS
// =============================================

export const awardAchievement = async (userId: string, achievementId: string): Promise<boolean> => {
  const q = query(
    collection(db, Collections.USER_ACHIEVEMENTS),
    where('userId', '==', userId),
    where('achievementId', '==', achievementId)
  );
  const existingSnapshot = await getDocs(q);
  if (!existingSnapshot.empty) return false;

  const achDoc = await getDoc(doc(db, Collections.ACHIEVEMENTS, achievementId));
  if (!achDoc.exists()) return false;
  const achievement = achDoc.data() as Achievement;

  await addDoc(collection(db, Collections.USER_ACHIEVEMENTS), {
    userId: userId,
    achievementId: achievementId,
    earnedAt: serverTimestamp(),
    isSeen: false,
  });

  if (achievement.xpReward > 0) {
    await awardXP(userId, achievement.xpReward, 'achievement', achievementId, `Achievement: ${achievement.title}`);
  }

  return true;
};

export const fetchAllAchievements = async (): Promise<Achievement[]> => {
  const q = query(collection(db, Collections.ACHIEVEMENTS));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Achievement));
};

export const fetchUserAchievements = async (userId: string): Promise<UserAchievement[]> => {
  const q = query(
    collection(db, Collections.USER_ACHIEVEMENTS),
    where('userId', '==', userId),
    orderBy('earnedAt', 'desc')
  );
  const snapshot = await getDocs(q);

  // We need to join with Achievement details
  // Ideally this should be done with a map or by storing basic achievement info in user_achievement
  // checking if we can fetch all achievements first as cache
  const allAchievements = await fetchAllAchievements();
  const achMap = new Map(allAchievements.map(a => [a.id, a]));

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      achievement: achMap.get(data.achievementId)
    } as UserAchievement;
  });
};
