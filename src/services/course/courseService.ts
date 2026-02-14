import {
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    increment,
    onSnapshot
} from 'firebase/firestore';
import {
    coursesCollection,
    enrollmentsCollection,
    lessonsCollection,
    progressCollection,
    db
} from '../../lib/firebase';
import { Course, Enrollment, Lesson, UserProgress } from '@app-types/firebase.types';

export const courseService = {
    // Get all courses with filtering
    getAllCourses: async (filters: { category?: string; level?: string; instructorId?: string } = {}) => {
        try {
            let q = query(coursesCollection, where('status', '==', 'published'));

            if (filters.category) {
                q = query(q, where('category', '==', filters.category));
            }
            if (filters.level) {
                q = query(q, where('level', '==', filters.level));
            }
            if (filters.instructorId) {
                q = query(q, where('instructorId', '==', filters.instructorId));
            }

            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    },

    // Get single course
    getCourseById: async (courseId: string) => {
        try {
            const courseDoc = await getDoc(doc(coursesCollection, courseId));
            if (courseDoc.exists()) {
                return { id: courseDoc.id, ...courseDoc.data() };
            }
            return null;
        } catch (error) {
            console.error('Error fetching course:', error);
            throw error;
        }
    },

    // Get lessons for a course
    getLessonsByCourseId: async (courseId: string) => {
        try {
            const q = query(
                lessonsCollection,
                where('courseId', '==', courseId),
                orderBy('order', 'asc')
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        } catch (error) {
            console.error('Error fetching lessons:', error);
            throw error;
        }
    },

    // Enrollment
    enrollInCourse: async (userId: string, courseId: string) => {
        try {
            // Check if already enrolled
            const q = query(
                enrollmentsCollection,
                where('userId', '==', userId),
                where('courseId', '==', courseId)
            );
            const existing = await getDocs(q);

            if (!existing.empty) return existing.docs[0].id;

            const enrollmentData: Partial<Enrollment> = {
                userId,
                courseId,
                enrolledAt: serverTimestamp() as any,
                progress: 0,
                status: 'active',
                completedLessons: 0,
                completedLessonIds: [],
                lastAccessedAt: serverTimestamp() as any,
            } as any;

            const docRef = await addDoc(enrollmentsCollection, enrollmentData as Enrollment);

            // Update course student count
            await updateDoc(doc(coursesCollection, courseId), {
                studentCount: increment(1)
            });

            return docRef.id;
        } catch (error) {
            console.error('Error enrolling in course:', error);
            throw error;
        }
    },

    // Get user enrollments
    getUserEnrollments: async (userId: string) => {
        try {
            const q = query(enrollmentsCollection, where('userId', '==', userId));
            const snapshot = await getDocs(q);

            // Fetch course details for each enrollment
            const enrollmentsWithDetails = await Promise.all(
                snapshot.docs.map(async (enrollDoc) => {
                    const enrollment = { id: enrollDoc.id, ...enrollDoc.data() } as any;
                    const course = await courseService.getCourseById(enrollment.courseId);
                    return { ...enrollment, course };
                })
            );

            return enrollmentsWithDetails;
        } catch (error) {
            console.error('Error fetching user enrollments:', error);
            throw error;
        }
    },

    // Update progress
    updateLessonProgress: async (userId: string, courseId: string, lessonId: string, duration: number) => {
        try {
            const progressId = `${userId}_${lessonId}`;
            const progressRef = doc(progressCollection, progressId);

            const progressData: Partial<UserProgress> = {
                userId,
                courseId,
                lessonId,
                lastPosition: duration,
                completed: true,
                updatedAt: serverTimestamp() as any,
            } as any;

            await setDoc(progressRef, progressData, { merge: true });

            // Update enrollment progress
            const q = query(
                enrollmentsCollection,
                where('userId', '==', userId),
                where('courseId', '==', courseId)
            );
            const enrollmentSnap = await getDocs(q);

            if (!enrollmentSnap.empty) {
                const enrollDoc = enrollmentSnap.docs[0];
                const data = enrollDoc.data() as any;
                const completedLessons = data.completedLessonIds || [];

                if (!completedLessons.includes(lessonId)) {
                    const newCompleted = [...completedLessons, lessonId];
                    const courseLessons = await courseService.getLessonsByCourseId(courseId);
                    const totalLessons = courseLessons.length;
                    const progressPercentage = (newCompleted.length / totalLessons) * 100;

                    await updateDoc(enrollDoc.ref, {
                        completedLessons: newCompleted.length,
                        completedLessonIds: newCompleted,
                        progress: progressPercentage,
                        lastAccessedAt: serverTimestamp(),
                        status: progressPercentage === 100 ? 'completed' : 'active'
                    });
                }
            }
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    },

    // Subscribe to enrollments
    subscribeToEnrollments: (userId: string, callback: (enrollments: any[]) => void) => {
        const q = query(enrollmentsCollection, where('userId', '==', userId));
        return onSnapshot(q, async (snapshot) => {
            const enrollmentsWithDetails = await Promise.all(
                snapshot.docs.map(async (enrollDoc) => {
                    const enrollment = { id: enrollDoc.id, ...enrollDoc.data() } as any;
                    const course = await courseService.getCourseById(enrollment.courseId);
                    return { ...enrollment, course };
                })
            );
            callback(enrollmentsWithDetails);
        });
    }
};
