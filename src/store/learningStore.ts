import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Course, Enrollment, Progress } from '@app-types/firebase.types';

interface LearningState {
    enrolledCourses: Enrollment[];
    courseProgress: Record<string, Progress[]>;
    currentCourse: Course | null;
    currentLesson: string | null;

    // Actions
    setEnrolledCourses: (courses: Enrollment[]) => void;
    setCourseProgress: (courseId: string, progress: Progress[]) => void;
    setCurrentCourse: (course: Course | null) => void;
    setCurrentLesson: (lessonId: string | null) => void;
    updateProgress: (courseId: string, lessonId: string, progress: Partial<Progress>) => void;
}

export const useLearningStore = create<LearningState>()(
    immer((set) => ({
        enrolledCourses: [],
        courseProgress: {},
        currentCourse: null,
        currentLesson: null,

        setEnrolledCourses: (courses) =>
            set((state) => {
                state.enrolledCourses = courses;
            }),

        setCourseProgress: (courseId, progress) =>
            set((state) => {
                state.courseProgress[courseId] = progress;
            }),

        setCurrentCourse: (course) =>
            set((state) => {
                state.currentCourse = course;
            }),

        setCurrentLesson: (lessonId) =>
            set((state) => {
                state.currentLesson = lessonId;
            }),

        updateProgress: (courseId, lessonId, progressData) =>
            set((state) => {
                const courseProgressArray = state.courseProgress[courseId] || [];
                const existingIndex = courseProgressArray.findIndex(p => p.lessonId === lessonId);

                if (existingIndex >= 0) {
                    courseProgressArray[existingIndex] = {
                        ...courseProgressArray[existingIndex],
                        ...progressData,
                    };
                } else {
                    courseProgressArray.push(progressData as Progress);
                }

                state.courseProgress[courseId] = courseProgressArray;
            }),
    }))
);
