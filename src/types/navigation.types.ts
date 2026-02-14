import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { Course, Career, Lesson, Chat, Post, LiveSession } from './firebase.types';

// Auth Stack
export type AuthStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

// Onboarding Stack
export type OnboardingStackParamList = {
    PersonalInfo: undefined;
    CareerInterests: undefined;
    SkillsAssessment: undefined;
    LearningPreferences: undefined;
    Complete: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
    Home: undefined;
    Explore: undefined;
    Learning: undefined;
    Community: undefined;
    Profile: undefined;
};

// Global Main Stack (shared across tabs for details)
export type MainStackParamList = {
    MainTabs: undefined;
    CourseDetail: { courseId: string; course?: Course };
    CourseList: { category?: string; level?: string };
    CareerDetail: { careerId: string; career?: Career };
    CareerList: { category?: string };
    LessonViewer: { lessonId: string; courseId: string };
    AIAdvisor: undefined;
    QuizAssessment: { quizId: string; lessonId: string; courseId: string };
    QuizResults: { score: number; totalQuestions: number; courseId: string };
    AssignmentScreen: { assignmentId: string; lessonId: string };
    InstructorProfile: { instructorId: string };
    PostDetail: { postId: string; post?: Post };
    CreatePost: undefined;
    ChatScreen: { chatId: string; chat?: Chat };
    EditProfile: undefined;
    Settings: undefined;
    Goals: undefined;
    Achievements: undefined;
    Notifications: undefined;
    ChangePassword: undefined;
};

// Home Stack
export type HomeStackParamList = {
    HomeScreen: undefined;
    CareerDetail: { careerId: string; career?: Career };
    CourseDetail: { courseId: string; course?: Course };
    LessonViewer: { lessonId: string; courseId: string };
    AIAdvisor: undefined;
    Search: undefined;
};

// Explore Stack
export type ExploreStackParamList = {
    ExploreScreen: undefined;
    CourseList: { category?: string; level?: string };
    CourseDetail: { courseId: string; course?: Course };
    InstructorProfile: { instructorId: string };
};

// Learning Stack
export type LearningStackParamList = {
    MyLearning: undefined;
    CourseDetail: { courseId: string; course?: Course };
    LessonViewer: { lessonId: string; courseId: string };
    QuizAssessment: { quizId: string; lessonId: string; courseId: string };
    QuizResults: { score: number; totalQuestions: number; courseId: string };
    AssignmentScreen: { assignmentId: string; lessonId: string };
    Progress: undefined;
    Certificates: undefined;
};

// Community Stack
export type CommunityStackParamList = {
    Feed: undefined;
    PostDetail: { postId: string; post?: Post };
    CreatePost: undefined;
    StudyGroups: undefined;
    GroupDetail: { groupId: string };
    CreateGroup: undefined;
    Messages: undefined;
    ChatScreen: { chatId: string; chat?: Chat };
};

// Profile Stack
export type ProfileStackParamList = {
    ProfileScreen: undefined;
    EditProfile: undefined;
    Settings: undefined;
    Achievements: undefined;
    Goals: undefined;
    Notifications: undefined;
    Help: undefined;
    About: undefined;
};

// Mentor Stack (for mentors/instructors)
export type MentorStackParamList = {
    Dashboard: undefined;
    CreateCourse: undefined;
    EditCourse: { courseId: string };
    CourseAnalytics: { courseId: string };
    Students: undefined;
    LiveClasses: undefined;
    CreateLiveClass: undefined;
    Earnings: undefined;
};

// Root Stack (combines all navigators)
export type RootStackParamList = {
    Auth: undefined;
    Onboarding: undefined;
    Main: undefined;
    CourseDetail: { courseId: string; course?: Course };
    LessonViewer: { lessonId: string; courseId: string };
    LiveClass: { sessionId: string; session?: LiveSession };
    Payment: { courseId: string; amount: number };
    Subscription: undefined;
};

// Navigation Props
export type AuthNavigationProp = StackNavigationProp<AuthStackParamList>;
export type OnboardingNavigationProp = StackNavigationProp<OnboardingStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
export type HomeNavigationProp = StackNavigationProp<HomeStackParamList>;
export type ExploreNavigationProp = StackNavigationProp<ExploreStackParamList>;
export type LearningNavigationProp = StackNavigationProp<LearningStackParamList>;
export type CommunityNavigationProp = StackNavigationProp<CommunityStackParamList>;
export type ProfileNavigationProp = StackNavigationProp<ProfileStackParamList>;
export type MentorNavigationProp = StackNavigationProp<MentorStackParamList>;
export type RootNavigationProp = StackNavigationProp<RootStackParamList>;

// Route Props
export type AuthRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
export type OnboardingRouteProp<T extends keyof OnboardingStackParamList> = RouteProp<OnboardingStackParamList, T>;
export type HomeRouteProp<T extends keyof HomeStackParamList> = RouteProp<HomeStackParamList, T>;
export type ExploreRouteProp<T extends keyof ExploreStackParamList> = RouteProp<ExploreStackParamList, T>;
export type LearningRouteProp<T extends keyof LearningStackParamList> = RouteProp<LearningStackParamList, T>;
export type CommunityRouteProp<T extends keyof CommunityStackParamList> = RouteProp<CommunityStackParamList, T>;
export type ProfileRouteProp<T extends keyof ProfileStackParamList> = RouteProp<ProfileStackParamList, T>;
export type MentorRouteProp<T extends keyof MentorStackParamList> = RouteProp<MentorStackParamList, T>;
export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
