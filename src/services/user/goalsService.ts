import { db, Collections } from '../../lib/firebase';
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  limit
} from 'firebase/firestore';

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  goal_type: 'career' | 'skill' | 'learning' | 'personal' | 'custom';
  target_date?: string;
  status: 'active' | 'completed' | 'paused' | 'abandoned';
  progress: number;
  milestones?: GoalMilestone[];
  priority: 'low' | 'medium' | 'high';
  created_at: any;
  updated_at: any;
  completed_at?: any;
}

export interface GoalMilestone {
  id: string;
  title: string;
  is_completed: boolean;
  completed_at?: any;
}

export const fetchUserGoals = async (userId: string, status?: string): Promise<Goal[]> => {
  let q = query(
    collection(db, Collections.GOALS),
    where('user_id', '==', userId)
  );

  if (status) {
    q = query(q, where('status', '==', status));
  }

  q = query(q, orderBy('created_at', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Goal));
};

export const fetchGoalById = async (goalId: string): Promise<Goal | null> => {
  const goalDoc = await getDoc(doc(db, Collections.GOALS, goalId));
  if (!goalDoc.exists()) return null;
  return { id: goalDoc.id, ...goalDoc.data() } as Goal;
};

export const createGoal = async (goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>): Promise<Goal> => {
  const data = {
    ...goal,
    progress: goal.progress || 0,
    status: goal.status || 'active',
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, Collections.GOALS), data);
  const goalDoc = await getDoc(ref);
  return { id: goalDoc.id, ...goalDoc.data() } as Goal;
};

export const updateGoal = async (goalId: string, updates: Partial<Goal>): Promise<Goal | null> => {
  const goalRef = doc(db, Collections.GOALS, goalId);
  await updateDoc(goalRef, {
    ...updates,
    updated_at: serverTimestamp(),
  });
  const goalDoc = await getDoc(goalRef);
  if (!goalDoc.exists()) return null;
  return { id: goalDoc.id, ...goalDoc.data() } as Goal;
};

export const deleteGoal = async (goalId: string): Promise<boolean> => {
  await deleteDoc(doc(db, Collections.GOALS, goalId));
  return true;
};

export const updateGoalProgress = async (goalId: string, progress: number): Promise<Goal | null> => {
  const updates: any = { progress, updated_at: serverTimestamp() };
  if (progress >= 100) {
    updates.status = 'completed';
    updates.completed_at = serverTimestamp();
  }
  const goalRef = doc(db, Collections.GOALS, goalId);
  await updateDoc(goalRef, updates);
  const goalDoc = await getDoc(goalRef);
  if (!goalDoc.exists()) return null;
  return { id: goalDoc.id, ...goalDoc.data() } as Goal;
};

export const getGoalStats = async (userId: string) => {
  const q = query(collection(db, Collections.GOALS), where('user_id', '==', userId));
  const snapshot = await getDocs(q);
  const goals = snapshot.docs.map(doc => doc.data());
  return {
    total: goals.length,
    active: goals.filter(g => g.status === 'active').length,
    completed: goals.filter(g => g.status === 'completed').length,
    paused: goals.filter(g => g.status === 'paused').length,
    averageProgress: goals.length > 0
      ? Math.round(goals.reduce((sum, g) => sum + (g.progress || 0), 0) / goals.length) : 0,
  };
};
