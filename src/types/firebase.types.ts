import { Timestamp } from 'firebase/firestore';

// User Types
export interface User {
    id: string;
    email: string;
    createdAt: Timestamp;
    lastLogin: Timestamp;
    isEmailVerified: boolean;
    phoneNumber?: string;
    photoURL?: string;
}

export interface Profile {
    id: string;
    userId: string;
    email: string;
    fullName: string;
    displayName: string;
    bio?: string;
    avatar?: string;
    role: 'student' | 'mentor' | 'admin';
    careerInterests: string[];
    skills: string[];
    location?: string;
    dateOfBirth?: string;
    education?: Education[];
    socialLinks?: SocialLinks;
    stats: UserStats;
    preferences: UserPreferences;
    onboardingCompleted: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export type UserProgress = Progress;

export interface Education {
    degree: string;
    institution: string;
    year: number;
    field?: string;
}

export interface SocialLinks {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
}

export interface UserStats {
    coursesEnrolled: number;
    coursesCompleted: number;
    totalLearningHours: number;
    currentStreak: number;
    longestStreak: number;
    points: number;
    level: number;
}

export interface UserPreferences {
    notifications: boolean;
    emailUpdates: boolean;
    theme: 'light' | 'dark' | 'auto';
    language: string;
    learningStyle?: string;
    learningPace?: string;
}

// Career Types
export interface Career {
    id: string;
    title: string;
    description: string;
    category: string;
    subcategory: string;
    level: string;
    growthRate: number;
    demandLevel: string;
    iconUrl?: string;
    imageUrl?: string;
    salaryRange: SalaryRange;
    jobGrowth: number;
    educationRequired: string[];
    skillsRequired: string[];
    responsibilities: string[];
    workEnvironment: string;
    careerPath: string[];
    relatedCareers: string[];
    isActive: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface SalaryRange {
    min: number;
    max: number;
    currency: string;
}

// Course Types
export interface Course {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    thumbnailUrl: string;
    coverImageUrl?: string;
    previewVideoUrl?: string;
    instructorId: string;
    instructorName: string;
    instructorAvatar?: string;
    category: string;
    subcategory: string;
    level: string;
    language: string;
    duration: number;
    lessonsCount: number;
    modulesCount: number;
    price: number;
    currency: string;
    discountPrice?: number;
    isPremium: boolean;
    isFeatured: boolean;
    tags: string[];
    learningOutcomes: string[];
    requirements: string[];
    targetAudience: string[];
    rating: number;
    reviewsCount: number;
    studentCount: number;
    completionRate: number;
    certificateIncluded: boolean;
    lastUpdated: Timestamp;
    isPublished: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Lesson {
    id: string;
    courseId: string;
    moduleId: string;
    title: string;
    description: string;
    type: 'video' | 'text' | 'quiz' | 'assignment' | 'interactive';
    content: LessonContent;
    duration: number;
    order: number;
    isFree: boolean;
    isCompleted?: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface LessonContent {
    videoUrl?: string;
    textContent?: string;
    attachments?: Attachment[];
    quizId?: string;
    assignmentId?: string;
}

export interface Attachment {
    name: string;
    url: string;
    type: string;
    size: number;
}

export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    courseName: string;
    progress: number;
    completedLessons: number;
    completedLessonIds?: string[];
    totalLessons: number;
    lastAccessedLessonId?: string;
    timeSpent: number;
    status: 'active' | 'completed' | 'paused';
    enrolledAt: Timestamp;
    completedAt?: Timestamp;
    certificateIssued: boolean;
    certificateUrl?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Progress {
    id: string;
    userId: string;
    courseId: string;
    lessonId: string;
    completed: boolean;
    timeSpent: number;
    lastPosition?: number;
    quizScore?: number;
    attempts: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Chat Types
export interface Chat {
    id: string;
    participantIds: string[];
    participants: ChatParticipant[];
    type: 'direct' | 'group';
    name?: string;
    avatar?: string;
    lastMessage?: Message;
    unreadCount: Record<string, number>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface ChatParticipant {
    userId: string;
    name: string;
    avatar?: string;
    role?: 'admin' | 'member';
}

export interface Message {
    id: string;
    chatId: string;
    senderId: string;
    senderName: string;
    senderAvatar?: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'file' | 'voice';
    mediaUrl?: string;
    replyTo?: string;
    isRead: boolean;
    readBy: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Notification Types
export interface Notification {
    id: string;
    userId: string;
    type: 'welcome' | 'achievement' | 'course' | 'message' | 'reminder' | 'system';
    title: string;
    body: string;
    data?: Record<string, any>;
    isRead: boolean;
    actionUrl?: string;
    createdAt: Timestamp;
}

// Gamification Types
export interface Achievement {
    id: string;
    title: string;
    description: string;
    iconUrl: string;
    category: string;
    points: number;
    requirement: string;
    isActive: boolean;
    createdAt: Timestamp;
}

export interface UserAchievement {
    id: string;
    userId: string;
    achievementId: string;
    achievementType: string;
    courseId?: string;
    earnedAt: Timestamp;
}

export interface Streak {
    id: string;
    userId: string;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string;
    updatedAt: Timestamp;
}

export interface Goal {
    id: string;
    userId: string;
    title: string;
    description: string;
    type: 'daily' | 'weekly' | 'monthly' | 'custom';
    target: number;
    current: number;
    unit: string;
    deadline?: Timestamp;
    isCompleted: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Payment Types
export interface Payment {
    id: string;
    userId: string;
    courseId?: string;
    subscriptionId?: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    paymentMethod: string;
    transactionId?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Community Types
export interface Post {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    mediaUrl?: string;
    tags: string[];
    likes: string[];
    commentCount: number;
    sharesCount: number;
    isPublished: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    likesCount: number;
    likedBy: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Review {
    id: string;
    courseId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    isVerified: boolean;
    helpfulCount: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Live Session Types
export interface LiveSession {
    id: string;
    title: string;
    description: string;
    instructorId: string;
    instructorName: string;
    courseId?: string;
    scheduledAt: Timestamp;
    duration: number;
    maxParticipants: number;
    currentParticipants: number;
    participantIds: string[];
    status: 'scheduled' | 'live' | 'ended' | 'cancelled';
    streamUrl?: string;
    recordingUrl?: string;
    chatEnabled: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Quiz Types
export interface Quiz {
    id: string;
    lessonId: string;
    courseId: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
    passingScore: number;
    timeLimit?: number;
    attemptsAllowed: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface QuizQuestion {
    id: string;
    question: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string | string[];
    explanation?: string;
    points: number;
}

export interface QuizSubmission {
    id: string;
    quizId: string;
    userId: string;
    answers: Record<string, string>;
    score: number;
    passed: boolean;
    timeSpent: number;
    attemptNumber: number;
    submittedAt: Timestamp;
}

// Assignment Types
export interface Assignment {
    id: string;
    lessonId: string;
    courseId: string;
    title: string;
    description: string;
    instructions: string;
    dueDate?: Timestamp;
    maxScore: number;
    submissionType: 'file' | 'text' | 'link';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface AssignmentSubmission {
    id: string;
    assignmentId: string;
    userId: string;
    content: string;
    fileUrls?: string[];
    score?: number;
    feedback?: string;
    status: 'submitted' | 'graded' | 'returned';
    submittedAt: Timestamp;
    gradedAt?: Timestamp;
}

// Study Group Types
export interface StudyGroup {
    id: string;
    name: string;
    description: string;
    courseId?: string;
    creatorId: string;
    memberIds: string[];
    maxMembers: number;
    isPrivate: boolean;
    tags: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// Class Types
export interface Class {
    id: string;
    title: string;
    description: string;
    instructorId: string;
    instructorName: string;
    courseId?: string;
    scheduledAt: Timestamp;
    duration: number;
    maxStudents: number;
    enrolledStudents: number;
    price: number;
    currency: string;
    status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    meetingUrl?: string;
    recordingUrl?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
