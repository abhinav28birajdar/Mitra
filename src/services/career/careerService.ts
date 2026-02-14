import {
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    addDoc,
    serverTimestamp
} from 'firebase/firestore';
import { careersCollection } from '../../lib/firebase';
import { Career } from '@app-types/firebase.types';

export const careerService = {
    // Get all careers with optional filtering
    getAllCareers: async (category?: string) => {
        try {
            let q = query(careersCollection, where('isActive', '==', true), orderBy('title'));

            if (category) {
                q = query(q, where('category', '==', category));
            }

            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        } catch (error) {
            console.error('Error fetching careers:', error);
            throw error;
        }
    },

    // Get single career by ID
    getCareerById: async (careerId: string) => {
        try {
            const careerDoc = await getDoc(doc(careersCollection, careerId));
            if (careerDoc.exists()) {
                return { id: careerDoc.id, ...careerDoc.data() } as any;
            }
            return null;
        } catch (error) {
            console.error('Error fetching career:', error);
            throw error;
        }
    },

    // Search careers
    searchCareers: async (searchTerm: string) => {
        try {
            // Note: Firestore doesn't support native full-text search. 
            // This is a simple prefix match for demo purposes.
            // In production, we'd use Algolia or ElasticSearch.
            const snapshot = await getDocs(careersCollection);
            const careers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

            return careers.filter(career =>
                career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                career.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } catch (error) {
            console.error('Error searching careers:', error);
            throw error;
        }
    },

    // AI Matching logic (mock for now, will integrate with OpenAI later)
    getRecommendedCareers: async (userInterests: string[], userSkills: string[]) => {
        try {
            const snapshot = await getDocs(careersCollection);
            const careers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

            // Basic recommendation algorithm based on interest/skill overlap
            return careers
                .map(career => {
                    let score = 0;

                    // Match interests
                    userInterests.forEach(interest => {
                        if (career.category.toLowerCase() === interest.toLowerCase()) score += 3;
                        if (career.subcategory.toLowerCase() === interest.toLowerCase()) score += 2;
                    });

                    // Match skills
                    userSkills.forEach(skill => {
                        if ((career.skillsRequired || []).some((s: string) => s.toLowerCase() === skill.toLowerCase())) score += 2;
                    });

                    return { ...career, matchScore: score };
                })
                .filter(career => career.matchScore > 0)
                .sort((a, b) => b.matchScore - a.matchScore)
                .slice(0, 5);
        } catch (error) {
            console.error('Error getting recommended careers:', error);
            throw error;
        }
    }
};
