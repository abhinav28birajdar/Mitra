import { db, Collections } from '../../lib/firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp
} from 'firebase/firestore';

export interface AIRecommendation {
    id: string;
    user_id: string;
    recommendation_type: string;
    title?: string | null;
    description?: string | null;
    confidence_score: number;
    reasoning?: string | null;
    recommended_items: any[];
    is_viewed: boolean;
    is_actioned: boolean;
    created_at: any;
}

export const aiService = {
    // Chat with AI Advisor
    sendMessage: async (userId: string, message: string) => {
        try {
            const messagesRef = collection(db, 'user_ai_chats');

            // Save user message
            await addDoc(messagesRef, {
                userId,
                text: message,
                sender: 'user',
                createdAt: serverTimestamp(),
            });

            // Generate AI response (Mock for now)
            let aiResponse = "I'm your Mitra AI Advisor. I'm analyzing your profile to provide the best career advice.";

            if (message.toLowerCase().includes('career')) {
                aiResponse = "Based on your interest in Technology and your JavaScript skills, I recommend exploring Frontend Development or Data Science.";
            } else if (message.toLowerCase().includes('course')) {
                aiResponse = "You should check out the 'Advanced React Native' course. It matches your current skill level perfectly.";
            }

            const aiMessage = {
                userId,
                text: aiResponse,
                sender: 'ai',
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(messagesRef, aiMessage);
            return { id: docRef.id, ...aiMessage };
        } catch (error) {
            console.error('Error in AI Chat:', error);
            throw error;
        }
    },

    // Get chat history
    getChatHistory: async (userId: string) => {
        try {
            const q = query(
                collection(db, 'user_ai_chats'),
                where('userId', '==', userId),
                orderBy('createdAt', 'asc')
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error fetching AI chat history:', error);
            throw error;
        }
    },

    // Get latest recommendation
    fetchLatestRecommendation: async (userId: string) => {
        try {
            const q = query(
                collection(db, Collections.AI_RECOMMENDATIONS),
                where('user_id', '==', userId),
                orderBy('created_at', 'desc'),
                limit(1)
            );
            const snapshot = await getDocs(q);
            if (snapshot.empty) return null;
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() } as AIRecommendation;
        } catch (error) {
            console.error('Error fetching recommendation:', error);
            return null;
        }
    }
};
